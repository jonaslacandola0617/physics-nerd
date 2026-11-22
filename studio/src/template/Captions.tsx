import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {BODY_FONT, COLORS} from './fonts';
import {Word} from './types';

type Chunk = {words: Word[]; s: number; e: number};

/** Groups words into 1–3 word chunks, breaking on punctuation and pauses. */
export const chunkWords = (words: Word[]): Chunk[] => {
  const chunks: Chunk[] = [];
  let cur: Word[] = [];
  const flush = () => {
    if (cur.length) chunks.push({words: cur, s: cur[0].s, e: cur[cur.length - 1].e});
    cur = [];
  };
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    const punct = /[.,?!…]$/.test(w.w);
    const pause = next ? next.s - w.e > 0.3 : true;
    if (cur.length >= 3 || punct || pause) flush();
  });
  flush();
  // each chunk stays up until the next one starts
  chunks.forEach((c, i) => {
    c.e = chunks[i + 1] ? chunks[i + 1].s : c.e + 0.3;
  });
  return chunks;
};

export const Captions: React.FC<{words: Word[]; bottom: number}> = ({words, bottom}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const chunks = React.useMemo(() => chunkWords(words), [words]);
  const chunk = chunks.find((c) => t >= c.s && t < c.e);
  if (!chunk) return null;

  const pop = spring({frame: Math.round((t - chunk.s) * fps), fps, config: {damping: 12, stiffness: 220}});

  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: bottom}}>
      <div
        style={{
          fontFamily: BODY_FONT,
          fontWeight: 900,
          fontSize: 76,
          lineHeight: 1.05,
          textAlign: 'center',
          textTransform: 'uppercase',
          maxWidth: 940,
          transform: `scale(${0.7 + 0.3 * pop})`,
          WebkitTextStroke: '10px #000',
          paintOrder: 'stroke fill',
          textShadow: '0 6px 18px rgba(0,0,0,0.6)',
        }}
      >
        {chunk.words.map((w, i) => {
          const active = t >= w.s && t < (chunk.words[i + 1]?.s ?? chunk.e);
          return (
            <span key={i} style={{color: active ? COLORS.accent : COLORS.white}}>
              {w.w.replace(/[,.]$/, '')}
              {i < chunk.words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
