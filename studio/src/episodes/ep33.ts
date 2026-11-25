import {Episode} from '../template/types';
import words from './ep33.words.json';

// EP33 — Titanic (1997): could Jack have fit on the door? Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/33-titanic-door/cut_clips.py. Footage: Rose on the wall panel, Jack in the water holding on, their
// hands, Rose sliding off into the water. (The moment Jack tries to climb on and it tips is just before this trim.)

const C = (name: string) => `ep33/clips/${name}.mp4`;

export const ep33: Episode = {
  id: 'ep33',
  title: ['Physics Nerd reacts to', 'Titanic'],
  voiceover: 'ep33/vo.wav',
  words,
  captionFixes: {Door: 'door', Mythbusters: 'MythBusters'},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('02-room'), start: 5.0, label: 'Rose on the panel, Jack in the water holding on'}},
    {
      kind: 'pause', from: 0, to: 7.03,
      clip: {file: C('02-room'), start: 7.6, label: 'Freeze: Jack holding the panel', zoom: 0.08},
      overlays: [{type: 'pop', text: '30 YEARS OF ARGUING', x: 50, y: 22, at: '30', dur: 2.2, color: '#FFD60A', size: 100}],
    },
    {
      kind: 'vo', from: 7.03, to: 14.9,
      clip: {file: C('02-room'), start: 7.6, label: 'Jack beside the panel'},
      overlays: [
        {type: 'pop', text: 'PROBLEM ≠ SPACE', x: 50, y: 22, at: 'surface', dur: 2.0, color: '#FF3B30', size: 105},
        {type: 'pop', text: 'PROBLEM = BUOYANCY', x: 50, y: 78, at: 'buoyancy', dur: 2.2, color: '#34C759', size: 105},
      ],
    },
    {
      kind: 'vo', from: 14.9, to: 30.80,
      clip: {file: C('02-room'), start: 0, label: 'The panel in the water'},
      overlays: [
        {type: 'meme', emoji: '🛟❌', at: 'inflatable', dur: 1.3},
        {type: 'pop', text: 'LIFT = WATER PUSHED ASIDE − PANEL', x: 50, y: 22, at: 'floating', dur: 3.2, color: '#FFD60A', size: 75},
        {type: 'pop', text: '28°F WATER', x: 50, y: 78, at: '28', dur: 2.0, color: '#0A84FF', size: 110},
      ],
    },
    {
      kind: 'pause', from: 30.80, to: 41.5,
      clip: {file: C('03-waterline'), start: 3.0, label: 'Freeze: Rose barely above the water', zoom: 0.05},
      overlays: [
        {type: 'pop', text: '+ JACK = PANEL UNDERWATER', x: 50, y: 22, at: 'extra', dur: 2.6, color: '#FF3B30', size: 90},
        {type: 'meme', emoji: '🥶🥶', at: 'freeze', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {file: C('04-hands'), start: 0, label: 'Jack and Rose'}},
    {
      kind: 'pause', from: 41.5, to: 53.4,
      clip: {file: C('01-panel'), start: 1.0, label: 'Freeze: one person on the panel', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'ONLY FIX: LIFE JACKET UNDERNEATH', x: 50, y: 22, at: 'jacket', dur: 2.8, color: '#34C759', size: 80},
        {type: 'stamp', text: 'ARCHIMEDES: GUILTY', good: false, at: 'Archimedes', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'romance'},
      ],
    },
  ],
};
