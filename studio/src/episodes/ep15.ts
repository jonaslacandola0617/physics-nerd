import {Episode} from '../template/types';
import words from './ep15.words.json';

// EP15 — Godzilla (2014): walking through San Francisco. Script: episodes/physics_nerd_scripts_ep11_to_ep15.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/15-godzilla-sanfrancisco/cut_clips.py. Footage: Golden Gate arrival (plates in the bay, head over
// the bridge, tanks firing) and Godzilla towering between downtown San Francisco towers.

const C = (name: string) => `ep15/clips/${name}.mp4`;

export const ep15: Episode = {
  id: 'ep15',
  title: ['Physics Nerd reacts to', 'Godzilla'],
  voiceover: 'ep15/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.8, clip: {file: C('05-roar'), start: 0, label: 'Godzilla at the Golden Gate'}},
    {
      kind: 'pause', from: 0, to: 5.18,
      clip: {file: C('01-tower'), start: 2.5, label: 'Freeze: between the skyscrapers', zoom: 0.07},
      overlays: [{type: 'meme', file: 'ep15/assets/road-repair.jpg', emoji: '', at: 'repair', dur: 1.4}],
    },
    {
      kind: 'vo', from: 5.18, to: 14.65,
      clip: {file: C('02-bridge'), start: 0, label: 'Plates in the bay, at the bridge'},
      overlays: [
        {type: 'pop', text: '355 FT · 90,000 TONS', x: 50, y: 26, at: '350', dur: 2.4, color: '#FF3B30', size: 110},
        {type: 'meme', file: 'ep15/assets/aircraft-carrier.jpg', emoji: '', at: 'carrier', dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 14.65, to: 25.0,
      clip: {file: C('03-walk'), start: 0, label: 'Tanks, the bridge, the bus'},
      overlays: [{type: 'pop', text: 'WEIGHT ∝ L³ · BONES ∝ L²', x: 50, y: 26, at: 'square', dur: 2.6, color: '#FFD60A', size: 95}],
    },
    {
      kind: 'vo', from: 25.0, to: 29.72,
      clip: {file: C('04-street'), start: 0, label: 'Street, people fleeing'},
    },
    {
      kind: 'pause', from: 29.72, to: 37.1,
      clip: {file: C('04-street'), start: 4.5, label: 'Freeze: the street', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'THIN ASPHALT + TUNNELS', x: 50, y: 26, at: 'thin', dur: 2.2, color: '#FFD60A', size: 100},
        {type: 'meme', file: 'ep15/assets/coffee-shop.jpg', emoji: '', at: 'basement', dur: 1.6},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {file: C('03-walk'), start: 0, label: 'Tanks open fire'}},
    {
      kind: 'vo', from: 37.1, to: 44.02,
      clip: {file: C('06-head'), start: 0, label: 'Head way above the skyline'},
      overlays: [{type: 'pop', text: '15 STORIES UP · 10× A GIRAFFE', x: 50, y: 24, at: '15', dur: 2.6, color: '#FF3B30', size: 85}],
    },
    {
      kind: 'pause', from: 44.02, to: 49.5,
      clip: {file: C('01-tower'), start: 2.5, label: 'Freeze: Godzilla downtown', zoom: 0.08},
      overlays: [
        {type: 'stamp', text: 'WINNER: GRAVITY', good: true, at: 'gravity', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'work'},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('02-bridge'), start: 8.6, label: 'At the bridge'}},
  ],
};
