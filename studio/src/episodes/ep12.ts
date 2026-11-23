import {Episode} from '../template/types';
import words from './ep12.words.json';

// EP12 — The Martian: the glove thruster. Script: episodes/physics_nerd_scripts_ep11_to_ep15.md (approved closer).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/12-martian-glove/cut_clips.py. Footage check: glove close-up, flies arm-first, visible gas jet
// from the glove, tumbles over Mars before Lewis grabs him (the "to be fair" beat holds).

const C = (name: string) => `ep12/clips/${name}.mp4`;

export const ep12: Episode = {
  id: 'ep12',
  title: ['Physics Nerd reacts to', 'The Martian'],
  voiceover: 'ep12/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('02-thrust'), start: 9.0, label: 'Watney flying arm-first'}},
    {
      kind: 'pause', from: 0, to: 6.58,
      clip: {file: C('01-poke'), start: 1.5, label: 'Freeze: the glove', zoom: 0.08},
      overlays: [{type: 'meme', emoji: '🔪', at: 'stab', dur: 1.4}],
    },
    {
      kind: 'vo', from: 6.58, to: 18.28,
      clip: {file: C('02-thrust'), start: 0, label: 'Lewis waiting, Watney jets toward her'},
      overlays: [
        {type: 'pop', text: 'SUIT: ~4.3 PSI', x: 50, y: 28, at: 'four', dur: 2.2, color: '#FFD60A', size: 130},
        {type: 'stamp', text: 'THRUST: REAL', good: true, at: 'thruster', dur: 1.4},
      ],
    },
    {
      kind: 'pause', from: 18.28, to: 25.81,
      clip: {file: C('02-thrust'), start: 10.5, label: 'Freeze: arm out, off-centre', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'OFF-CENTRE THRUST', x: 50, y: 26, at: 'hand', dur: 2.0, color: '#FF3B30', size: 110},
        {type: 'spin', cx: 50, cy: 50, r: 30, at: 'torque', dur: 1.8, label: 'TORQUE'},
      ],
    },
    {
      kind: 'vo', from: 25.81, to: 34.18,
      clip: {file: C('03-tumble'), start: 0, label: 'Tumbling over Mars'},
      overlays: [{type: 'meme', emoji: '🎈', at: 'balloon', dur: 1.6}],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('04-catch'), start: 0, label: 'Lewis grabs him'}},
    {
      kind: 'vo', from: 34.18, to: 39.75,
      clip: {file: C('04-catch'), start: 0.5, label: 'Catch and tether'},
      overlays: [{type: 'stamp', text: 'SPIN: SHOWN ✓', good: true, at: 'spinning', dur: 1.4}],
    },
    {
      kind: 'pause', from: 39.75, to: 44.9,
      clip: {file: C('05-end'), start: 0.5, label: 'Freeze: Watney in his helmet', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'THRUST: REAL · STEERING: CHAOS', x: 50, y: 24, at: 'venting', dur: 2.6, color: '#FFD60A', size: 80},
        {type: 'sfx', name: 'boom', at: 'possible'},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('05-end'), start: 2.5, label: 'Watney and Lewis'}},
  ],
};
