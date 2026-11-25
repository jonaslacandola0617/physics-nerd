import React from 'react';
import {AbsoluteFill, Freeze, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {BODY_FONT} from './fonts';
import {ClipRef} from './types';

/**
 * Plays a movie clip (or a labelled placeholder until the footage exists).
 * `frozen`: show only the frame at clip.start (a PAUSE beat); the slow zoom still moves.
 */
export const ClipView: React.FC<{clip: ClipRef; muted: boolean; durationInFrames: number; blurred?: boolean; frozen?: boolean; volume?: number}> = ({
  clip,
  muted,
  volume,
  durationInFrames,
  blurred,
  frozen,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = 1 + interpolate(frame, [0, durationInFrames], [0, clip.zoom ?? 0.04], {extrapolateRight: 'clamp'});
  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: `scale(${blurred ? 1.25 : zoom})`,
    filter: blurred ? 'blur(40px) brightness(0.55) saturate(1.2)' : undefined,
  };

  if (!clip.file) {
    return (
      <AbsoluteFill
        style={{
          background: blurred
            ? 'linear-gradient(180deg,#0b1a2b,#05080d)'
            : 'radial-gradient(circle at 50% 40%,#1d3557 0%,#0b1320 70%)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!blurred && (
          <div
            style={{
              fontFamily: BODY_FONT,
              fontWeight: 800,
              color: 'rgba(255,255,255,0.35)',
              fontSize: 40,
              textAlign: 'center',
              padding: 80,
              border: '4px dashed rgba(255,255,255,0.2)',
              borderRadius: 24,
              transform: `scale(${zoom})`,
            }}
          >
            {frozen ? 'FREEZE FRAME NEEDED' : 'CLIP NEEDED'}
            <br />
            <span style={{fontSize: 32}}>{clip.label}</span>
          </div>
        )}
      </AbsoluteFill>
    );
  }

  const video = (
    <OffthreadVideo
      src={staticFile(clip.file)}
      startFrom={Math.round((clip.start ?? 0) * fps)}
      muted={muted || blurred || frozen}
      volume={volume ?? 1}
      style={style}
    />
  );
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      {frozen ? <Freeze frame={0}>{video}</Freeze> : video}
    </AbsoluteFill>
  );
};
