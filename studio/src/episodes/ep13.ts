import {Episode} from '../template/types';
import words from './ep13.words.json';

// EP13 — Mission: Impossible – Rogue Nation: hanging off the A400M. Script: episodes/physics_nerd_scripts_ep11_to_ep15.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/13-mi-plane-hang/cut_clips.py. Footage check: business suit, gripping the door frame, through
// takeoff and climb-out; close-up of his face and hair in the wind.

const C = (name: string) => `ep13/clips/${name}.mp4`;

export const ep13: Episode = {
  id: 'ep13',
  title: ['Physics Nerd reacts to', 'Mission: Impossible'],
  voiceover: 'ep13/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.8, clip: {file: C('01-takeoff'), start: 0, label: 'Hanging on the door at takeoff'}},
    {
      kind: 'pause', from: 0, to: 7.53,
      clip: {file: C('05-airborne'), start: 6.0, label: 'Freeze: hanging above the fields', zoom: 0.07},
      overlays: [{type: 'meme', emoji: '😰', at: 'insurance', dur: 1.4}],
    },
    {
      kind: 'vo', from: 7.53, to: 15.57,
      clip: {file: C('02-hang'), start: 0, label: 'On the door down the runway'},
      overlays: [
        {type: 'stamp', text: 'REAL LIFE: HARNESS', good: true, at: 'harness', dur: 1.4},
        {type: 'pop', text: 'SPECIAL CONTACT LENSES', x: 50, y: 26, at: 'contact', dur: 2.0, color: '#34C759', size: 95},
      ],
    },
    {
      kind: 'vo', from: 15.57, to: 26.15,
      clip: {file: C('03-run'), start: 0, label: 'Sprint, wing, takeoff'},
      overlays: [
        {type: 'stamp', text: 'MOVIE: NO HARNESS', good: false, at: 'zero', dur: 1.4},
        {type: 'pop', text: 'TAKEOFF ≈ 150 MPH', x: 50, y: 26, at: '150', dur: 2.2, color: '#FF3B30', size: 120},
      ],
    },
    {
      kind: 'pause', from: 26.15, to: 34.17,
      clip: {file: C('05-airborne'), start: 8.4, label: 'Freeze: face in the wind', zoom: 0.07},
      overlays: [{type: 'pop', text: 'CATEGORY 4 HURRICANE', x: 50, y: 26, at: 'category', dur: 2.4, color: '#FF3B30', size: 105}],
    },
    {kind: 'play', dur: 2.6, clip: {file: C('05-airborne'), start: 0, label: 'A400M climbing'}},
    {
      kind: 'vo', from: 34.17, to: 39.84,
      clip: {file: C('05-airborne'), start: 2.0, label: 'Hanging high above'},
      overlays: [{type: 'meme', emoji: '🎯', at: 'paintball', dur: 1.4}],
    },
    {
      kind: 'pause', from: 39.84, to: 43.5,
      clip: {file: C('05-airborne'), start: 8.4, label: 'Freeze: the hair', zoom: 0.09},
      overlays: [
        {type: 'pop', text: 'HAIR GEL: AEROSPACE GRADE', x: 50, y: 24, at: 'styled', dur: 2.2, color: '#FFD60A', size: 90},
        {type: 'sfx', name: 'boom', at: 'raise'},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('06-inside'), start: 0.5, label: 'Tumbles inside'}},
  ],
};
