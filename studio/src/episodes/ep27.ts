import {Episode} from '../template/types';
import words from './ep27.words.json';

// EP27 — Avengers: Age of Ultron (2015): lifting Sokovia. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/27-ultron-sokovia/cut_clips.py. Footage checked: the city tears out of the ground; seen from below, the
// slab tapers to one glowing core (the "lift from the middle" image); Thor + Iron Man blow the core and it breaks up.
// Note: Tony's HUD also shows smaller anti-grav engines spread underneath.

const C = (name: string) => `ep27/clips/${name}.mp4`;

export const ep27: Episode = {
  id: 'ep27',
  title: ['Physics Nerd reacts to', 'Age of Ultron'],
  voiceover: 'ep27/vo.wav',
  words,
  captionFixes: {earth: 'Earth', A: 'AI', '.I.': ''},
  beats: [
    {kind: 'play', dur: 2.8, clip: {file: C('01-lift'), start: 1.0, label: 'Sokovia tears out of the ground'}},
    {
      kind: 'pause', from: 0, to: 7.97,
      clip: {file: C('04-under'), start: 1.0, label: 'Freeze: the slab balanced on one core', zoom: 0.06},
      overlays: [
        {type: 'meme', emoji: '🍕', at: 'pizza', dur: 1.2},
        {type: 'meme', emoji: '🧀', at: 'cheese', dur: 1.0},
      ],
    },
    {
      kind: 'vo', from: 7.97, to: 15.6,
      clip: {file: C('03-wide'), start: 0, label: 'The city floating above the clouds'},
      overlays: [{type: 'pop', text: '~2 KM WIDE · 100s OF MILLIONS OF TONS', x: 50, y: 22, at: 'hundreds', dur: 3.0, color: '#FFD60A', size: 75}],
    },
    {
      kind: 'vo', from: 15.6, to: 27.4,
      clip: {file: C('04-under'), start: 0, label: 'Under the slab'},
      overlays: [
        {type: 'pop', text: 'COMPRESSION: STRONG ✓', x: 50, y: 22, at: 'compression', dur: 2.2, color: '#34C759', size: 95},
        {type: 'pop', text: 'TENSION: WEAK ✗', x: 50, y: 78, at: 'tension', dur: 2.2, color: '#FF3B30', size: 105},
      ],
    },
    {
      kind: 'pause', from: 27.4, to: 41.16,
      clip: {file: C('04-under'), start: 6.0, label: 'Freeze: rock hanging off the bottom', zoom: 0.06},
      overlays: [
        {type: 'meme', emoji: '🥞☝️', at: 'pancake', dur: 1.5},
        {type: 'pop', text: 'OUTER EDGES SHEAR OFF', x: 50, y: 22, at: 'shear', dur: 2.4, color: '#FF3B30', size: 95},
      ],
    },
    {kind: 'play', dur: 4.0, clip: {file: C('05-blast'), start: 3.5, label: 'The core blows, the rock breaks up'}},
    {
      kind: 'pause', from: 41.16, to: 48.7,
      clip: {file: C('06-ultron'), start: 3.0, label: 'Freeze: Ultron', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'ENGINEERING DEGREE: REVOKED', good: false, at: 'skipped', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'class'},
      ],
    },
  ],
};
