import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {BODY_FONT, COLORS, TITLE_FONT} from './fonts';
import {At, Overlay} from './types';

const DEFAULT_DUR = 2.5;

/** Width of the clip box the overlays are drawn in. */
const BOX_W = 1080;

/** Width of `text` set in the title font at `fontSize`, in px (letterSpacing in px). */
const titleWidth = (text: string, fontSize: number, letterSpacing = 0) =>
  measureText({text, fontFamily: TITLE_FONT, fontSize, letterSpacing: `${letterSpacing}px`, validateFontIsLoaded: true}).width;

/**
 * Largest font size (up to `max`) at which a one-line pop at horizontal position x% stays inside the box,
 * with room for the 10px outline and the spring overshoot of the pop-in.
 */
const fitPopSize = (text: string, x: number, max: number) => {
  const avail = (BOX_W * 2 * Math.min(x, 100 - x)) / 100 - 2 * 10;
  const width = titleWidth(text, max);
  return Math.floor(Math.min(max, (max * avail * 0.86) / width));
};

/** Shared in/out animation: spring in, fade out over the last 0.25s. */
const useEnvelope = (atIn: At, dur: number) => {
  const at = typeof atIn === "number" ? atIn : 0;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - at * fps;
  const visible = local >= 0 && local < dur * fps;
  const inn = spring({frame: local, fps, config: {damping: 11, stiffness: 180}});
  const out = interpolate(local, [dur * fps - 8, dur * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const progress = interpolate(local, [0, 0.6 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return {visible, inn, out, progress, local, fps};
};

const outlined: React.CSSProperties = {
  WebkitTextStroke: '10px #000',
  paintOrder: 'stroke fill',
  textShadow: '0 8px 24px rgba(0,0,0,0.65)',
};

const Pop: React.FC<Extract<Overlay, {type: 'pop'}>> = ({text, x, y, at, dur = DEFAULT_DUR, color, size}) => {
  const {visible, inn, out} = useEnvelope(at, dur);
  if (!visible) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%,-50%) scale(${inn}) rotate(${(1 - inn) * -8}deg)`,
        opacity: out,
        fontFamily: TITLE_FONT,
        fontSize: fitPopSize(text, x, size ?? 120),
        color: color ?? COLORS.white,
        whiteSpace: 'nowrap',
        ...outlined,
      }}
    >
      {text}
    </div>
  );
};

const Arrow: React.FC<Extract<Overlay, {type: 'arrow'}>> = ({x1, y1, x2, y2, at, dur = DEFAULT_DUR, label, color}) => {
  const {visible, progress, out} = useEnvelope(at, dur);
  if (!visible) return null;
  const c = color ?? COLORS.danger;
  const ex = x1 + (x2 - x1) * progress;
  const ey = y1 + (y2 - y1) * progress;
  const ang = Math.atan2((y2 - y1) * 1.06, x2 - x1); // box is ~1080x1060, close to square
  const head = 4;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width: '100%', height: '100%'}}>
        <line x1={x1} y1={y1} x2={ex} y2={ey} stroke="#000" strokeWidth={2.2} strokeLinecap="round" />
        <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={c} strokeWidth={1.3} strokeLinecap="round" />
        {progress > 0.95 && (
          <polygon
            points={`${x2},${y2} ${x2 - head * Math.cos(ang - 0.5)},${y2 - head * Math.sin(ang - 0.5)} ${
              x2 - head * Math.cos(ang + 0.5)
            },${y2 - head * Math.sin(ang + 0.5)}`}
            fill={c}
            stroke="#000"
            strokeWidth={0.4}
          />
        )}
      </svg>
      {label && progress > 0.6 && (
        <div
          style={{
            position: 'absolute',
            // label sits near the arrow head but is clamped so it never runs off the frame
            left: `${Math.min(Math.max(x1 + (x2 - x1) * 0.75, 18), 82)}%`,
            top: `${Math.min(Math.max(y1 + (y2 - y1) * 0.75, 8), 88)}%`,
            transform: 'translate(-50%, 35%)',
            fontFamily: BODY_FONT,
            fontWeight: 900,
            fontSize: 52,
            color: COLORS.white,
            whiteSpace: 'nowrap',
            ...outlined,
          }}
        >
          {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Radius: React.FC<Extract<Overlay, {type: 'radius'}>> = ({cx, cy, r, at, dur = DEFAULT_DUR, label}) => {
  const {visible, progress, out} = useEnvelope(at, dur);
  if (!visible) return null;
  return (
    <AbsoluteFill style={{opacity: out}}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{width: '100%', height: '100%'}}>
        <circle cx={cx} cy={cy} r={1.2} fill={COLORS.accent} />
        <line x1={cx} y1={cy} x2={cx + r * progress} y2={cy} stroke="#000" strokeWidth={1.6} />
        <line x1={cx} y1={cy} x2={cx + r * progress} y2={cy} stroke={COLORS.accent} strokeWidth={0.8} strokeDasharray="2 1.2" />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: `${cx + r / 2}%`,
          top: `${cy}%`,
          transform: `translate(-50%,-130%) scale(${progress})`,
          fontFamily: BODY_FONT,
          fontWeight: 900,
          fontSize: 56,
          color: COLORS.accent,
          ...outlined,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};

const Spin: React.FC<Extract<Overlay, {type: 'spin'}>> = ({cx, cy, r, at, dur = DEFAULT_DUR, label}) => {
  const {visible, local, fps, out, inn} = useEnvelope(at, dur);
  if (!visible) return null;
  const rot = (local / fps) * 360 * 1.13; // actually spins at 68 RPM
  return (
    <AbsoluteFill style={{opacity: out}}>
      <div
        style={{
          position: 'absolute',
          left: `${cx}%`,
          top: `${cy}%`,
          width: `${r * 2}%`,
          aspectRatio: '1',
          transform: `translate(-50%,-50%) rotate(${rot}deg) scale(${inn})`,
        }}
      >
        <svg viewBox="0 0 100 100" style={{width: '100%', height: '100%'}}>
          <path d="M50 4 A46 46 0 1 1 8 32" fill="none" stroke="#000" strokeWidth={7} strokeLinecap="round" />
          <path d="M50 4 A46 46 0 1 1 8 32" fill="none" stroke={COLORS.accent} strokeWidth={4} strokeLinecap="round" />
          <polygon points="8,32 2,20 18,24" fill={COLORS.accent} stroke="#000" strokeWidth={1.5} />
        </svg>
      </div>
      {label && (
        <div
          style={{
            position: 'absolute',
            left: `${cx}%`,
            top: `${cy + r + 4}%`,
            transform: `translate(-50%,0) scale(${inn})`,
            fontFamily: BODY_FONT,
            fontWeight: 900,
            fontSize: 60,
            color: COLORS.white,
            whiteSpace: 'nowrap',
            ...outlined,
          }}
        >
          {label}
        </div>
      )}
    </AbsoluteFill>
  );
};

const Stamp: React.FC<Extract<Overlay, {type: 'stamp'}>> = ({text, good, at, dur = DEFAULT_DUR}) => {
  const {visible, inn, out} = useEnvelope(at, dur);
  if (!visible) return null;
  const c = good ? COLORS.good : COLORS.danger;
  // One line, sized so the settled, 10-degree-rotated stamp (border + padding included) fits the box width.
  const label = `${good ? '✓ ' : '✗ '}${text}`;
  const perPx = titleWidth(label, 120, 4) / 120;
  const fontSize = Math.floor(Math.min(120, (BOX_W * 0.9 - 0.985 * 116 - 0.174 * 60) / (0.985 * perPx + 0.174 * 1.25)));
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div
        style={{
          transform: `rotate(-10deg) scale(${2.2 - 1.2 * inn})`,
          opacity: Math.min(1, inn * 1.4),
          border: `14px solid ${c}`,
          borderRadius: 24,
          padding: '16px 44px',
          fontFamily: TITLE_FONT,
          fontSize,
          color: c,
          background: 'rgba(0,0,0,0.45)',
          letterSpacing: 4,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};

const Versus: React.FC<Extract<Overlay, {type: 'versus'}>> = ({left, leftSub, right, rightSub, leftImg, rightImg, at, dur = DEFAULT_DUR}) => {
  const {visible, local, fps, out} = useEnvelope(at, dur);
  if (!visible) return null;
  const l = spring({frame: local, fps, config: {damping: 12}});
  const r = spring({frame: local - 10, fps, config: {damping: 9, stiffness: 160}});
  const thumb = (img?: string) =>
    img ? (
      <Img
        src={staticFile(img)}
        style={{width: 220, height: 220, objectFit: 'cover', borderRadius: 20, border: '5px solid #fff', boxShadow: '0 10px 30px rgba(0,0,0,0.6)', marginBottom: 16}}
      />
    ) : null;
  const side = (big: string, sub: string, color: string, s: number, scale: number, img?: string): React.ReactNode => (
    <div style={{flex: 1, textAlign: 'center', transform: `scale(${s * scale})`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {thumb(img)}
      <div style={{fontFamily: TITLE_FONT, fontSize: 190, color, lineHeight: 1, ...outlined}}>{big}</div>
      <div style={{fontFamily: BODY_FONT, fontWeight: 800, fontSize: 40, color: COLORS.white, marginTop: 12, ...outlined, WebkitTextStroke: '6px #000'}}>
        {sub}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{background: `rgba(5,8,13,${0.78 * out})`, opacity: out, flexDirection: 'row', alignItems: 'center', padding: 40}}>
      {side(left, leftSub, COLORS.white, l, 0.85, leftImg)}
      <div style={{fontFamily: TITLE_FONT, fontSize: 90, color: COLORS.accent, ...outlined}}>VS</div>
      {side(right, rightSub, COLORS.danger, r, 1.1, rightImg)}
    </AbsoluteFill>
  );
};

const Meme: React.FC<Extract<Overlay, {type: 'meme'}>> = ({file, emoji, at, dur = 1.2}) => {
  const {visible, inn, out} = useEnvelope(at, dur);
  if (!visible) return null;
  const isVideo = file && /\.(mp4|mov|webm)$/i.test(file);
  return (
    <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', opacity: out}}>
      <div
        style={{
          width: '72%',
          aspectRatio: '1',
          transform: `scale(${inn})`,
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          border: '6px solid #fff',
          background: '#111',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {!file && <div style={{fontSize: 320}}>{emoji}</div>}
        {file && isVideo && <OffthreadVideo src={staticFile(file)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
        {file && !isVideo && <Img src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
      </div>
    </AbsoluteFill>
  );
};

export const OverlayView: React.FC<{o: Overlay}> = ({o}) => {
  switch (o.type) {
    case 'pop':
      return <Pop {...o} />;
    case 'arrow':
      return <Arrow {...o} />;
    case 'radius':
      return <Radius {...o} />;
    case 'spin':
      return <Spin {...o} />;
    case 'stamp':
      return <Stamp {...o} />;
    case 'versus':
      return <Versus {...o} />;
    case 'meme':
      return <Meme {...o} />;
    case 'sfx':
      return null; // audio only, handled in Short.tsx
  }
};
