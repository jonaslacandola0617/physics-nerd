import {Episode} from '../template/types';
import words from './ep01.words.json';

// EP01 v3 — Interstellar docking (Gemini script, fact-checked). Script: episodes/01-interstellar-docking/script.md
// Voice: breath-trimmed + roomified take (tools/tighten_vo.py, tools/roomify.py). from/to = seconds in that take.
// play = movie with its own audio · vo = narration over moving (muted) footage · pause = click + freeze + narration.

const C = (name: string) => `ep01/clips/${name}.mp4`;

export const ep01: Episode = {
  id: 'ep01',
  title: ['Physics Nerd reacts to', 'Interstellar'],
  voiceover: 'ep01/vo.mp3',
  words,
  captionFixes: {Case: 'CASE', "Bran's": "Brand's", Bran: 'Brand', 'just�': 'just...', Gs: "G's", 'Gs.': "G's.", Organ: 'organ', Pure: 'pure', Plot: 'plot', 'Armor.': 'armor.'},
  beats: [
    // 1. movie open
    {kind: 'play', dur: 1.0, clip: {file: C('01-spin-topdown'), start: 0, label: 'Endurance spinning'}},
    {kind: 'play', dur: 3.9, clip: {file: C('02-not-possible'), start: 0, label: '"It\'s not possible." / "No. It\'s necessary."'}},
    // 2. hook on a freeze
    {
      kind: 'pause', from: 0, to: 7.42,
      clip: {file: C('01-spin-topdown'), start: 3.45, label: 'Freeze: station spinning', zoom: 0.06},
      overlays: [{type: 'spin', cx: 50, cy: 45, r: 26, at: 'spinning', dur: 2.4}],
    },
    // 3. explanation over moving footage
    {
      kind: 'vo', from: 7.42, to: 10.42,
      clip: {file: C('04-from-ranger'), start: 0, label: 'Ranger closing in'},
      overlays: [{type: 'pop', text: '68 RPM', x: 50, y: 28, at: '68', dur: 1.8, color: '#FFD60A', size: 170}],
    },
    {
      kind: 'vo', from: 10.42, to: 14.62,
      clip: {file: C('08-spin-far'), start: 0, label: 'Endurance spinning, side view'},
      overlays: [{type: 'radius', cx: 50, cy: 50, r: 32, at: 'wide', dur: 1.6, label: '~32 m'}],
    },
    // 4. the 150 G point
    {
      kind: 'vo', from: 14.62, to: 19.47,
      clip: {file: C('01-spin-topdown'), start: 0, label: 'Wide top-down: the whole ring spinning'},
      overlays: [
        {type: 'arrow', x1: 50, y1: 48, x2: 90, y2: 14, at: 'outer', dur: 3.4},
        {type: 'arrow', x1: 50, y1: 48, x2: 10, y2: 14, at: 'outer', dur: 3.4},
        {type: 'arrow', x1: 50, y1: 48, x2: 90, y2: 84, at: 'outer', dur: 3.4},
        {type: 'arrow', x1: 50, y1: 48, x2: 10, y2: 84, at: 'outer', dur: 3.4},
        {type: 'pop', text: '~150 G', x: 50, y: 45, at: '150', dur: 2.2, color: '#FF3B30', size: 220},
      ],
    },
    {
      kind: 'vo', from: 19.47, to: 23.92,
      clip: {file: C('05-modules-zoom'), start: 0, label: 'Modules spinning, hub centred'},
      overlays: [{type: 'meme', file: 'ep01/assets/fighter-jet-9g.jpg', emoji: '', at: 'fighter', dur: 2.2}],
    },
    {
      kind: 'vo', from: 23.92, to: 27.79,
      clip: {file: C('03-modules-close'), start: 0, label: 'Spinning modules'},
      overlays: [{type: 'versus', left: '9 G', leftSub: 'fighter jet design', leftImg: 'ep01/assets/fighter-jet-9g.jpg', right: '150 G', rightSub: 'Endurance ring', at: 'nowhere', dur: 2.2}],
    },
    // 5. punchline on a freeze
    {
      kind: 'pause', from: 27.79, to: 34.04,
      clip: {file: C('13-ring-close'), start: 3.0, label: 'Freeze: damaged outer module', zoom: 0.08},
      overlays: [
        {type: 'meme', file: 'ep01/assets/station-shrapnel.jpg', emoji: '', at: 'shrapnel', dur: 2.2},
        {type: 'sfx', name: 'boom', at: 'shrapnel'},
      ],
    },
    // 6. movie burst
    {kind: 'play', dur: 2.0, clip: {file: C('10-blackout'), start: 0, label: 'Brand blacking out'}},
    // 7. "to be fair" over moving footage
    {
      kind: 'vo', from: 34.04, to: 37.57,
      clip: {file: C('06-cooper-brand'), start: 0, label: 'Cooper straining'},
      overlays: [{type: 'stamp', text: 'ACCURATE', good: true, at: 'nailed', dur: 1.8}],
    },
    {
      kind: 'vo', from: 37.57, to: 43.03,
      clip: {file: C('09-thrusters-axis'), start: 0, label: 'Ranger on the hub, spin axis'},
      overlays: [
        {type: 'arrow', x1: 8, y1: 50, x2: 92, y2: 50, at: 'center', dur: 2.4, label: 'spin axis', color: '#FFD60A'},
        {type: 'pop', text: '≈ 4–5 G', x: 50, y: 28, at: 'few', dur: 2.0, color: '#34C759', size: 170},
      ],
    },
    {kind: 'vo', from: 43.03, to: 44.56, clip: {file: C('06-cooper-brand'), start: 3.0, label: 'Brand straining'}},
    // 8. closer on a freeze
    {
      kind: 'pause', from: 44.56, to: 51.48,
      clip: {file: C('11-clamps-lock'), start: 3.4, label: 'Freeze: Ranger clamped in', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'COOPER', good: true, at: 'cooper', dur: 1.6},
        {type: 'stamp', text: 'SHIP', good: false, at: 'ship', dur: 1.4},
        {type: 'meme', file: 'ep01/assets/space-pipe-organ.jpg', emoji: '', at: 'organ', dur: 1.2},
        {type: 'pop', text: 'PLOT ARMOR', x: 50, y: 30, at: 'plot', dur: 1.6, color: '#FFD60A', size: 150},
        {type: 'sfx', name: 'boom', at: 'armor'},
      ],
    },
    // 9. end on the movie
    {kind: 'play', dur: 2.0, clip: {file: C('12-survivable'), start: 2.05, label: 'The shredded ring'}},
  ],
};
