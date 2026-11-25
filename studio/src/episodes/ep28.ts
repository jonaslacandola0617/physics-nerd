import {Episode} from '../template/types';
import words from './ep28.words.json';

// EP28 — Gravity (2013): Kowalski lets go of the tether. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/28-gravity-tether/cut_clips.py. Footage checked: Stone's leg is caught in the Soyuz parachute cords,
// she holds Kowalski's tether ("You have to let me go"), he unclips and drifts away.

const C = (name: string) => `ep28/clips/${name}.mp4`;

export const ep28: Episode = {
  id: 'ep28',
  title: ['Physics Nerd reacts to', 'Gravity'],
  voiceover: 'ep28/vo.wav',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.8, clip: {file: C('01-letgo'), start: 0, label: 'Clooney lets go'}},
    {
      kind: 'pause', from: 0, to: 7.61,
      clip: {file: C('03-tangled'), start: 9.0, label: 'Freeze: Clooney at the end of the tether', zoom: 0.08},
      overlays: [{type: 'stamp', text: 'DIED FOR ZERO REASON', good: false, at: 'zero', dur: 1.4}],
    },
    {
      kind: 'vo', from: 7.61, to: 20.27,
      clip: {file: C('03-tangled'), start: 0, label: 'Caught in the parachute cords'},
      overlays: [
        {type: 'pop', text: 'RELATIVE SPEED = 0 MPH', x: 50, y: 22, at: 'complete', dur: 2.6, color: '#34C759', size: 95},
        {type: 'meme', file: 'ep28/assets/cliff-climber.jpg', emoji: '', at: 'hanging', dur: 1.2},
      ],
    },
    {
      kind: 'pause', from: 20.27, to: 27.6,
      clip: {file: C('03-tangled'), start: 13.5, label: 'Freeze: holding the tether', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'ORBIT = FREE FALL', x: 50, y: 22, at: 'orbit', dur: 2.2, color: '#FFD60A', size: 100},
        {type: 'pop', text: 'NO FORCE PULLING HIM AWAY', x: 50, y: 78, at: 'invisible', dur: 2.6, color: '#FF3B30', size: 85},
      ],
    },
    {
      kind: 'pause', from: 27.6, to: 37.8,
      clip: {file: C('03-tangled'), start: 8.5, label: 'Freeze: two astronauts, one rope', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'ONE GENTLE TUG', x: 50, y: 22, at: 'gentle', dur: 2.4, color: '#34C759', size: 105},
        {type: 'meme', file: 'ep28/assets/soda-can.jpg', emoji: '', at: 'soda', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('01-letgo'), start: 3.0, label: 'Drifting off into the void'}},
    {
      kind: 'pause', from: 37.8, to: 44.6,
      clip: {file: C('05-float'), start: 3.0, label: 'Freeze: floating away', zoom: 0.08},
      overlays: [
        {type: 'stamp', text: "NEWTON'S FIRST LAW: IGNORED", good: false, at: 'Newton', dur: 1.8},
        {type: 'sfx', name: 'boom', at: 'vibes'},
      ],
    },
  ],
};
