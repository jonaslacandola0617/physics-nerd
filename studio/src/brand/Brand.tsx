import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BODY_FONT, COLORS, TITLE_FONT} from '../template/fonts';

// Channel art. Render with:
//   npx remotion still avatar ../brand/avatar.png
//   npx remotion still banner ../brand/banner.png

const INK = COLORS.ink;
const Y = COLORS.accent;

/** Nerd glasses inside two crossed orbits — the channel mark. Drawn on a 400x400 grid. */
export const Mark: React.FC<{size: number; glow?: boolean}> = ({size, glow = true}) => (
  <svg width={size} height={size} viewBox="0 0 400 400" style={{overflow: 'visible'}}>
    <defs>
      <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="10" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g filter={glow ? 'url(#glow)' : undefined}>
      {/* orbits */}
      <ellipse cx="200" cy="200" rx="185" ry="70" fill="none" stroke={Y} strokeWidth="12" opacity="0.9" transform="rotate(-28 200 200)" />
      <ellipse cx="200" cy="200" rx="185" ry="70" fill="none" stroke={COLORS.white} strokeWidth="12" opacity="0.9" transform="rotate(28 200 200)" />
      {/* electron */}
      <circle cx="364" cy="113" r="20" fill={COLORS.danger} />
      {/* glasses */}
      <rect x="62" y="160" width="118" height="92" rx="26" fill={INK} stroke={Y} strokeWidth="22" />
      <rect x="220" y="160" width="118" height="92" rx="26" fill={INK} stroke={Y} strokeWidth="22" />
      <path d="M180 196 Q200 178 220 196" fill="none" stroke={Y} strokeWidth="18" strokeLinecap="round" />
      {/* lens shine */}
      <path d="M86 186 L112 186" stroke={COLORS.white} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
      <path d="M244 186 L270 186" stroke={COLORS.white} strokeWidth="10" strokeLinecap="round" opacity="0.85" />
    </g>
  </svg>
);

const bg: React.CSSProperties = {
  background: `radial-gradient(circle at 50% 45%, #1C2130 0%, ${INK} 70%)`,
};

/** Faint graph-paper grid. */
const Grid: React.FC<{step: number}> = ({step}) => (
  <AbsoluteFill
    style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)`,
      backgroundSize: `${step}px ${step}px`,
    }}
  />
);

export const Avatar: React.FC = () => (
  <AbsoluteFill style={{...bg, alignItems: 'center', justifyContent: 'center'}}>
    <Grid step={50} />
    <Mark size={600} />
  </AbsoluteFill>
);

// YouTube banner: 2560x1440, everything important inside the centred 1546x423 safe area.
const EQUATIONS: [string, number, number, number][] = [
  // text, x%, y%, rotation
  ['F = ma', 8, 18, -8],
  ['a = v² / r', 84, 14, 6],
  ['E = ½mv²', 12, 80, 5],
  ['p = mv', 88, 82, -6],
  ['g ≈ 9.81 m/s²', 30, 10, 3],
  ['τ = r × F', 70, 90, -3],
  ['σ = F / A', 8, 50, -4],
  ['ω = 2π / T', 91, 50, 4],
];

export const Banner: React.FC = () => (
  <AbsoluteFill style={bg}>
    <Grid step={80} />
    {EQUATIONS.map(([t, x, y, r]) => (
      <div
        key={t}
        style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`, transform: `translate(-50%, -50%) rotate(${r}deg)`,
          fontFamily: BODY_FONT, fontWeight: 800, fontSize: 64, color: 'rgba(255,255,255,0.13)', whiteSpace: 'nowrap',
        }}
      >
        {t}
      </div>
    ))}
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 56, width: 1546, height: 423, justifyContent: 'center'}}>
        <Mark size={330} />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{fontFamily: TITLE_FONT, fontSize: 200, lineHeight: 1, color: COLORS.white, letterSpacing: 2}}>
            PHYSICS <span style={{color: Y}}>NERD</span>
          </div>
          <div style={{fontFamily: BODY_FONT, fontWeight: 800, fontSize: 52, color: COLORS.white, opacity: 0.9, marginTop: 18, letterSpacing: 1}}>
            Iconic movie scenes <span style={{color: Y}}>vs.</span> actual physics
          </div>
        </div>
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);
