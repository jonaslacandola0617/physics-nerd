import {Episode} from '../template/types';
import words from './ep03.words.json';

// EP03 v2 — Civil War helicopter, reaction format. Script: episodes/03-civilwar-helicopter/script.md
// Clips not cut yet: each clip shows a placeholder until `file`/`start` are filled in.

export const ep03: Episode = {
  id: 'ep03',
  title: ['Physics Nerd reacts to', 'Civil War'],
  voiceover: 'ep03/vo.mp3',
  words,
  captionFixes: {rotors: "rotor's", caps: "Cap's", smart: 'Smart'},
  beats: [
    {kind: 'play', dur: 4.0, clip: {label: '~1:07:40 Bucky lifts off, Cap leaps and grabs it'}},
    {
      kind: 'pause', from: 0, to: 5.3,
      clip: {label: 'Freeze: Cap mid-grab', zoom: 0.08},
      overlays: [{type: 'meme', emoji: '🐕', at: 'leash', dur: 1.0}],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:07:45 the bicep-flex shot, rotor roaring'}},
    {
      kind: 'pause', from: 5.65, to: 15.55,
      clip: {label: 'Freeze: wide, Cap between ledge and helicopter', zoom: 0.05},
      overlays: [
        {type: 'arrow', x1: 50, y1: 70, x2: 50, y2: 18, at: 'rotors', dur: 2.6, label: 'LIFT = WEIGHT', color: '#34C759'},
        {type: 'pop', text: '~700 KG', x: 50, y: 30, at: '700', dur: 2.0, color: '#FFD60A', size: 170},
        {type: 'meme', emoji: '🚗', at: 'smart', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:07:52 helicopter strains, the arm bends'}},
    {
      kind: 'pause', from: 15.6, to: 25.25,
      clip: {label: 'Freeze: close on the bent arm', zoom: 0.12},
      overlays: [
        {type: 'pop', text: '8 : 1', x: 50, y: 25, at: 'leverage', dur: 1.8, color: '#FFD60A', size: 180},
        {type: 'pop', text: '~6 TONS', x: 50, y: 40, at: 'six', dur: 2.4, color: '#FF3B30', size: 210},
        {type: 'sfx', name: 'boom', at: 'retired'},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:08:00 Cap hauls it down onto the roof edge'}},
    {
      kind: 'pause', from: 25.95, to: 33.95,
      clip: {label: 'Freeze: helicopter tipping on the edge', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'HELICOPTER', good: true, at: 'easy', dur: 1.6},
        {type: 'stamp', text: 'ARM', good: false, at: 'impossible', dur: 1.6},
      ],
    },
    {kind: 'play', dur: 4.5, clip: {label: '~1:08:08 helicopter goes over the edge'}},
    {
      kind: 'pause', from: 34.1, to: 41.2,
      clip: {label: 'Freeze: mid-fall, before the splash', zoom: 0.06},
      overlays: [
        {type: 'meme', emoji: '🗜️', at: 'hydraulic', dur: 1.2},
        {type: 'pop', text: 'SUBSCRIBE', x: 50, y: 25, at: 'subscribe', dur: 3.0, color: '#FFD60A', size: 120},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {label: '~1:08:12 the splash'}},
  ],
};
