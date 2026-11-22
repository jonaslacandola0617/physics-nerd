import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Captions} from './Captions';
import {ClipView} from './Clip';
import {COLORS, LAYOUT, TITLE_FONT} from './fonts';
import {OverlayView} from './Overlays';
import {Beat, Episode, Word} from './types';

export const FPS = 30;

export const beatSeconds = (b: Beat) => (b.kind === 'vo' ? b.to - b.from : b.dur);
export const episodeFrames = (ep: Episode) => ep.beats.reduce((n, b) => n + Math.round(beatSeconds(b) * FPS), 0);

/** Whisper splits things like "2" "-5" and "G" "-suit"; glue them back and apply display fixes. */
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

const BeatView: React.FC<{beat: Beat; ep: Episode; words: Word[]; frames: number}> = ({beat, ep, words, frames}) => {
  const isMovie = beat.kind === 'movie';
  const local = beat.kind === 'vo' ? words.filter((w) => w.s >= beat.from - 0.05 && w.s < beat.to).map((w) => ({...w, s: w.s - beat.from, e: w.e - beat.from})) : [];
  return (
    <AbsoluteFill>
      {/* blurred full-frame background */}
      <ClipView clip={beat.clip} muted blurred durationInFrames={frames} />
      {/* sharp clip box */}
      <div style={{position: 'absolute', top: LAYOUT.boxTop, left: 0, width: 1080, height: LAYOUT.boxHeight, overflow: 'hidden'}}>
        <ClipView clip={beat.clip} muted={!isMovie} durationInFrames={frames} />
        {beat.overlays?.map((o, i) => <OverlayView key={i} o={o} />)}
        <Captions words={local} bottom={70} />
      </div>
      {beat.kind === 'vo' && (
        <Audio src={staticFile(ep.voiceover)} startFrom={Math.round(beat.from * FPS)} endAt={Math.round(beat.to * FPS)} />
      )}
    </AbsoluteFill>
  );
};

export const Short: React.FC<{ep: Episode}> = ({ep}) => {
  useVideoConfig();
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
            <BeatView beat={b} ep={ep} words={words} frames={frames} />
          </Sequence>
        );
      })}
      <TitleBar lines={ep.title} />
    </AbsoluteFill>
  );
};
