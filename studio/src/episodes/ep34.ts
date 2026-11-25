import {Episode} from '../template/types';
import words from './ep34.words.json';

// EP34 — X-Men: Days of Future Past (2014): Quicksilver in the Pentagon kitchen. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/34-xmen-quicksilver/cut_clips.py. Footage checked: he tastes the flying food (the "soup" line holds),
// runs along the walls, moves guards' arms and flicks a cap, bullets hang in the air; time resumes and guards go flying.

const C = (name: string) => `ep34/clips/${name}.mp4`;

export const ep34: Episode = {
  id: 'ep34',
  title: ['Physics Nerd reacts to', 'X-Men: Days of Future Past'],
  voiceover: 'ep34/vo.wav',
  words,
  captionFixes: {time: '"Time', bottle: 'Bottle"'},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('04-guards'), start: 1.0, label: 'Rearranging the guards'}},
    {
      kind: 'pause', from: 0, to: 6.6,
      clip: {file: C('02-poke'), start: 5.0, label: 'Freeze: moving a guard\'s arm', zoom: 0.05},
      overlays: [{type: 'stamp', text: 'ENTIRE ROOM: WIPED OUT', good: false, at: 'wiped', dur: 1.5}],
    },
    {
      kind: 'vo', from: 6.6, to: 18.7,
      clip: {file: C('03-walls'), start: 0, label: 'Running along the walls'},
      overlays: [
        {type: 'pop', text: 'BULLET: ~700 MPH', x: 50, y: 22, at: '700', dur: 2.2, color: '#FFD60A', size: 105},
        {type: 'pop', text: 'BULLETS FROZEN = MACH 10+', x: 50, y: 78, at: 'thousands', dur: 2.6, color: '#FF3B30', size: 90},
      ],
    },
    {
      kind: 'vo', from: 18.7, to: 32.9,
      clip: {file: C('04-guards'), start: 0, label: 'Moving arms and heads'},
      overlays: [
        {type: 'pop', text: 'F = m × a', x: 50, y: 22, at: 'Force', dur: 2.4, color: '#FFD60A', size: 130},
        {type: 'meme', emoji: '🚆💥', at: 'train', dur: 1.3},
      ],
    },
    {
      kind: 'pause', from: 32.9, to: 42.7,
      clip: {file: C('01-stroll'), start: 7.0, label: 'Freeze: tasting the soup', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'MACH 10 INDOORS = SONIC BOOM', x: 50, y: 22, at: 'sonic', dur: 2.6, color: '#FF3B30', size: 85},
        {type: 'meme', emoji: '🍜', at: 'soup', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 4.0, clip: {file: C('05-snap'), start: 1.0, label: 'Time resumes'}},
    {
      kind: 'pause', from: 42.7, to: 50.3,
      clip: {file: C('04-guards'), start: 9.5, label: 'Freeze: Quicksilver, headphones on', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'FREE PHYSICS SHIELD', good: true, at: 'shield', dur: 1.5},
        {type: 'sfx', name: 'boom', at: 'fast'},
      ],
    },
  ],
};
