import {Episode} from '../template/types';
import words from './ep11.words.json';

// EP11 — The Avengers: Iron Man and the nuke. Script: episodes/physics_nerd_scripts_ep11_to_ep15.md (approved fixes).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/11-avengers-nuke/cut_clips.py. Footage check: grips the missile body, pushes from the tail with
// the fins static; falls from the portal; Hulk catches him and slides down the building; roar wakes him up.

const C = (name: string) => `ep11/clips/${name}.mp4`;

export const ep11: Episode = {
  id: 'ep11',
  title: ['Physics Nerd reacts to', 'The Avengers'],
  voiceover: 'ep11/vo.mp3',
  words,
  captionFixes: {Gs: "G's", 'Gs.': "G's."},
  beats: [
    {kind: 'play', dur: 2.5, clip: {file: C('01-grab'), start: 0, label: 'Iron Man grabs the missile'}},
    {
      kind: 'pause', from: 0, to: 5.67,
      clip: {file: C('01-grab'), start: 1.5, label: 'Freeze: hugging the missile', zoom: 0.07},
      overlays: [{type: 'meme', file: 'ep11/assets/shopping-cart.jpg', emoji: '', at: 'shopping', dur: 1.4}],
    },
    {
      kind: 'vo', from: 5.67, to: 17.48,
      clip: {file: C('02-missile'), start: 0, label: 'Launch, intercept, the grab'},
      overlays: [
        {type: 'pop', text: '~3,000 LB · 500+ MPH', x: 50, y: 28, at: '3', dur: 2.6, color: '#FF3B30', size: 100},
        {type: 'meme', file: 'ep11/assets/hood-ornament.jpg', emoji: '', at: 'becoming', dur: 1.4},
      ],
    },
    {
      kind: 'pause', from: 17.48, to: 28.0,
      clip: {file: C('03-up'), start: 1.7, label: 'Freeze: pushing it up from the tail', zoom: 0.08},
      overlays: [
        {type: 'stamp', text: 'FINS: NOT MOVING', good: false, at: 'fins', dur: 1.6},
        {type: 'pop', text: 'RUNS ON CONFIDENCE', x: 50, y: 28, at: 'runs', dur: 1.8, color: '#FFD60A', size: 110},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {file: C('06-nuke'), start: 0.4, label: 'Nuke detonates in space'}},
    {
      kind: 'vo', from: 28.0, to: 36.15,
      clip: {file: C('04-fall'), start: 0, label: 'Falls, Hulk catches him'},
      overlays: [{type: 'pop', text: '100+ MPH', x: 50, y: 28, at: 'hundred', dur: 1.8, color: '#FF3B30', size: 160}],
    },
    {
      kind: 'pause', from: 36.15, to: 39.65,
      clip: {file: C('04-fall'), start: 6.1, label: 'Freeze: the catch', zoom: 0.08},
      overlays: [{type: 'stamp', text: "BRUTAL G's", good: false, at: 'brutal', dur: 1.4}],
    },
    {
      kind: 'vo', from: 39.65, to: 44.08,
      clip: {file: C('05-wake'), start: 0, label: 'Hulk roars, Tony wakes'},
    },
    {
      kind: 'pause', from: 44.08, to: 46.2,
      clip: {file: C('05-wake'), start: 6.4, label: 'Freeze: Tony awake', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'WAKE-UP METHOD: YELLING', x: 50, y: 26, at: 'doctors', dur: 1.8, color: '#FFD60A', size: 95},
        {type: 'sfx', name: 'boom', at: 'trick'},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('05-wake'), start: 0, label: 'Hulk roars'}},
  ],
};
