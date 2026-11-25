import {Episode} from '../template/types';
import words from './ep26.words.json';

// EP26 — Speed (1994): the bus jumps the freeway gap. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/26-speed-bus/cut_clips.py. Footage checked: flat freeway up to the gap, speedometer ~67 mph,
// the bus visibly leaves the ledge nose-UP, lands and keeps rolling.

const C = (name: string) => `ep26/clips/${name}.mp4`;

export const ep26: Episode = {
  id: 'ep26',
  title: ['Physics Nerd reacts to', 'Speed'],
  voiceover: 'ep26/vo.wav',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 3.1, clip: {file: C('01-jump'), start: 2.5, label: 'Off the ledge'}},
    {
      kind: 'pause', from: 0, to: 4.85,
      clip: {file: C('02-air'), start: 1.0, label: 'Freeze: nose-up over a flat-road gap', zoom: 0.06},
      overlays: [{type: 'pop', text: 'INVISIBLE RAMP?', x: 50, y: 24, at: 'invisible', dur: 2.0, color: '#FFD60A', size: 110}],
    },
    {
      kind: 'vo', from: 4.85, to: 15.2,
      clip: {file: C('05-gap'), start: 1.5, label: 'The flat freeway and the gap'},
      overlays: [
        {type: 'pop', text: 'FLAT ROAD · 50 FT GAP · ~70 MPH', x: 50, y: 22, at: 'completely', dur: 2.8, color: '#FFD60A', size: 80},
        {type: 'meme', emoji: '✈️', at: 'fighter', dur: 1.2},
      ],
    },
    {
      kind: 'vo', from: 15.2, to: 25.11,
      clip: {file: C('03-road'), start: 0, label: 'Flat out at 67 mph'},
      overlays: [
        {type: 'pop', text: 'FRONT WHEELS LEAVE FIRST', x: 50, y: 24, at: 'front', dur: 2.4, color: '#FFD60A', size: 95},
        {type: 'pop', text: '15-TON BUS → NOSE DOWN', x: 50, y: 78, at: 'pitches', dur: 2.0, color: '#FF3B30', size: 95},
      ],
    },
    {
      kind: 'pause', from: 25.11, to: 32.8,
      clip: {file: C('04-edge'), start: 0.5, label: 'Freeze: front wheels over the edge', zoom: 0.05},
      overlays: [
        {type: 'pop', text: '0.5 SEC AIR TIME', x: 50, y: 22, at: 'half', dur: 2.2, color: '#FFD60A', size: 105},
        {type: 'arrow', x1: 40, y1: 35, x2: 40, y2: 70, at: 'drop', dur: 2.6, label: '~4 FT DROP', color: '#FF3B30'},
      ],
    },
    {
      kind: 'pause', from: 32.8, to: 39.4,
      clip: {file: C('02-air'), start: 2.2, label: 'Freeze: nose at the far ledge', zoom: 0.06},
      overlays: [{type: 'meme', emoji: '🧱💥', at: 'slamming', dur: 1.4}],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('06-land'), start: 1.0, label: 'Lands and keeps rolling'}},
    {
      kind: 'pause', from: 39.4, to: 48.4,
      clip: {file: C('06-land'), start: 2.5, label: 'Freeze: safe on the far side', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'REAL STUNT = HIDDEN RAMP', x: 50, y: 22, at: 'hidden', dur: 2.4, color: '#34C759', size: 90},
        {type: 'stamp', text: 'GAP ADDED IN POST', good: true, at: 'post', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'time'},
      ],
    },
  ],
};
