import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Captions} from './Captions';
import {ClipView} from './Clip';
import {BODY_FONT, COLORS, LAYOUT, TITLE_FONT} from './fonts';
import {OverlayView} from './Overlays';
import {At, Beat, Episode, Overlay, SfxName, Word} from './types';

export const FPS = 30;

/** PAUSE beats: the click lands first, then the voice starts; a short tail before the movie resumes. */
export const PAUSE_LEAD = 0.25;
export const PAUSE_TAIL = 0.2;

const isVoBeat = (b: Beat): b is Extract<Beat, {kind: 'vo' | 'pause'}> => b.kind === 'vo' || b.kind === 'pause';
const lead = (b: Beat) => (b.kind === 'pause' ? PAUSE_LEAD : 0);

export const beatSeconds = (b: Beat) => {
  if (b.kind === 'pause') return b.to - b.from + PAUSE_LEAD + PAUSE_TAIL;
  if (b.kind === 'vo') return b.to - b.from;
  return b.dur;
};
export const episodeFrames = (ep: Episode) => ep.beats.reduce((n, b) => n + Math.round(beatSeconds(b) * FPS), 0);

/** Whisper splits things like "2" "-5" and "80" "%"; glue them back and apply display fixes. */
const cleanWords = (words: Word[], fixes: Record<string, string> = {}): Word[] => {
  const out: Word[] = [];
  for (const w of words) {
    if (/^[-%]|^\.\d/.test(w.w) && out.length) {
      const prev = out[out.length - 1];
      out[out.length - 1] = {...prev, w: prev.w + w.w, e: w.e};
    } else out.push({...w});
  }
  return out.map((w) => ({...w, w: fixes[w.w] ?? w.w}));
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');

/** Words of this beat, re-timed so 0 = beat start. */
const beatWords = (b: Beat, words: Word[]): Word[] => {
  if (!isVoBeat(b)) return [];
  const l = lead(b);
  return words.filter((w) => w.s >= b.from - 0.05 && w.s < b.to).map((w) => ({...w, s: w.s - b.from + l, e: w.e - b.from + l}));
};

/** `at` can be seconds or a word in the beat's voiceover ("complaint" -> when that word starts). */
const resolveAt = (at: At, local: Word[]): number => {
  if (typeof at === 'number') return at;
  const hit = local.find((w) => norm(w.w).startsWith(norm(at)));
  return hit ? hit.s : 0;
};

const AUTO_SFX: Partial<Record<Overlay['type'], SfxName>> = {
  pop: 'pop',
  versus: 'pop',
  stamp: 'pop',
  meme: 'pop',
  arrow: 'whoosh',
  radius: 'whoosh',
  spin: 'whoosh',
};
const SFX_VOLUME: Record<SfxName, number> = {click: 0.9, resume: 0.8, pop: 0.45, whoosh: 0.4, boom: 0.8, ding: 0.4};

const TitleBar: React.FC<{lines: [string, string]}> = ({lines}) => (
  <div
    style={{
      position: 'absolute',
      top: LAYOUT.titleTop,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: TITLE_FONT,
      fontSize: 84,
      lineHeight: 1.08,
      color: COLORS.white,
      textTransform: 'uppercase',
      letterSpacing: 1,
      WebkitTextStroke: '9px #000',
      paintOrder: 'stroke fill',
      textShadow: '0 6px 20px rgba(0,0,0,0.7)',
    }}
  >
    <div>{lines[0]}</div>
    <div style={{color: COLORS.accent}}>{lines[1]}</div>
  </div>
);

/** Little player glyph (❚❚ / ▶) that flashes when the video is paused or resumed, like a real viewer. */
const PlayerGlyph: React.FC<{paused: boolean}> = ({paused}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 3, 14, 20], [0, 0.9, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(frame, [0, 4], [0.7, 1], {extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: o}}>
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontFamily: BODY_FONT,
          fontWeight: 900,
          fontSize: 70,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${s})`,
        }}
      >
        {paused ? '❚❚' : '▶'}
      </div>
    </AbsoluteFill>
  );
};

const BeatView: React.FC<{beat: Beat; prev?: Beat; ep: Episode; words: Word[]; frames: number}> = ({beat, prev, ep, words, frames}) => {
  const local = beatWords(beat, words);
  const overlays = (beat.overlays ?? []).map((o) => ({...o, at: resolveAt(o.at, local)}) as Overlay & {at: number});
  const playsMovieAudio = beat.kind === 'movie' || beat.kind === 'play';
  const frozen = beat.kind === 'pause';
  const resumed = beat.kind === 'play' && prev?.kind === 'pause';

  const sfx: {name: SfxName; at: number; volume?: number}[] = [];
  if (frozen) sfx.push({name: 'click', at: 0});
  if (resumed) sfx.push({name: 'resume', at: 0});
  for (const o of overlays) {
    if (o.type === 'sfx') sfx.push({name: o.name, at: o.at, volume: o.volume});
    else if (AUTO_SFX[o.type]) sfx.push({name: AUTO_SFX[o.type]!, at: o.at});
  }

  return (
    <AbsoluteFill>
      {/* blurred full-frame background */}
      <ClipView clip={beat.clip} muted blurred frozen={frozen} durationInFrames={frames} />
      {/* sharp clip box */}
      <div style={{position: 'absolute', top: LAYOUT.boxTop, left: 0, width: 1080, height: LAYOUT.boxHeight, overflow: 'hidden'}}>
        <ClipView clip={beat.clip} muted={!playsMovieAudio} frozen={frozen} durationInFrames={frames} />
        {(frozen || resumed) && <PlayerGlyph paused={frozen} />}
        {overlays.map((o, i) => (
          <OverlayView key={i} o={o} />
        ))}
        <Captions words={local} bottom={70} />
      </div>
      {isVoBeat(beat) && (
        <Sequence from={Math.round(lead(beat) * FPS)} layout="none">
          <Audio src={staticFile(ep.voiceover)} startFrom={Math.round(beat.from * FPS)} endAt={Math.round(beat.to * FPS)} />
        </Sequence>
      )}
      {sfx.map((s, i) => (
        <Sequence key={`sfx${i}`} from={Math.max(0, Math.round(s.at * FPS))} layout="none">
          <Audio src={staticFile(`sfx/${s.name}.wav`)} volume={s.volume ?? SFX_VOLUME[s.name]} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const Short: React.FC<{ep: Episode}> = ({ep}) => {
  const words = React.useMemo(() => cleanWords(ep.words, ep.captionFixes), [ep]);
  let cursor = 0;
  return (
    <AbsoluteFill style={{background: COLORS.ink}}>
      {ep.beats.map((b, i) => {
        const frames = Math.round(beatSeconds(b) * FPS);
        const from = cursor;
        cursor += frames;
        return (
          <Sequence key={i} from={from} durationInFrames={frames} name={`${i + 1}. ${b.kind} — ${b.clip.label}`}>
            <BeatView beat={b} prev={ep.beats[i - 1]} ep={ep} words={words} frames={frames} />
          </Sequence>
        );
      })}
      <TitleBar lines={ep.title} />
    </AbsoluteFill>
  );
};
