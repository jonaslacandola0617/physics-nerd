import {Episode} from '../template/types';
import words from './ep02.words.json';

// EP02 v3 — Spider-Man 2 train (Gemini script, fact-checked). Script: episodes/02-spiderman2-train/script.md
// Voice: breath-trimmed + roomified take (tools/tighten_vo.py, tools/roomify.py). from/to = seconds in that take.
// Clips: episodes/02-spiderman2-train/cut_clips.py (movie times in comments there).

const C = (name: string) => `ep02/clips/${name}.mp4`;

export const ep02: Episode = {
  id: 'ep02',
  title: ['Physics Nerd reacts to', 'Spider-Man 2'],
  voiceover: 'ep02/vo.mp3',
  words,
  beats: [
    // 1. movie open: Peter bracing on the front of the train
    {kind: 'play', dur: 2.5, clip: {file: C('01-feet-brake'), start: 2.0, label: 'Feet planted on the rails'}},
    // 2. hook on a freeze
    {
      kind: 'pause', from: 0, to: 5.2,
      clip: {file: C('01-feet-brake'), start: 5.5, label: 'Freeze: feet dragging on the rails', zoom: 0.08},
      overlays: [{type: 'meme', file: 'ep02/assets/sneaker.jpg', emoji: '', at: 'shoes', dur: 1.4}],
    },
    // 3. explanation over moving footage
    {kind: 'vo', from: 5.2, to: 8.68, clip: {file: C('03-webs-fire'), start: 0, label: 'Webs to both buildings'}},
    {
      kind: 'vo', from: 8.68, to: 12.06,
      clip: {file: C('01-feet-brake'), start: 0, label: 'Train front, packed carriage'},
      overlays: [{type: 'pop', text: '~200 TONS', x: 50, y: 28, at: '200', dur: 2.0, color: '#FFD60A', size: 150}],
    },
    {
      kind: 'vo', from: 12.06, to: 14.62,
      clip: {file: C('04-train-wide'), start: 0, label: 'Train barrelling down the track'},
      overlays: [{type: 'pop', text: '70 MPH', x: 50, y: 28, at: '70', dur: 1.6, color: '#FFD60A', size: 160}],
    },
    {
      kind: 'vo', from: 14.62, to: 18.08,
      clip: {file: C('05-strain-arm'), start: 0, label: 'Suit tearing at the arm'},
      overlays: [{type: 'pop', text: '30 s', x: 50, y: 28, at: '30', dur: 1.4, color: '#FFFFFF', size: 140}],
    },
    {
      kind: 'vo', from: 18.08, to: 20.75,
      clip: {file: C('06-scream'), start: 0, label: 'Crucifix pose, screaming'},
      overlays: [{type: 'pop', text: '≈ 20 TONS', x: 50, y: 26, at: '20', dur: 2.0, color: '#FF3B30', size: 150}],
    },
    {
      kind: 'vo', from: 20.75, to: 24.5,
      clip: {file: C('03-webs-fire'), start: 5.6, label: 'Wide: arms out, webs both sides'},
      overlays: [
        {type: 'arrow', x1: 44, y1: 50, x2: 8, y2: 30, at: '10', dur: 2.0, label: '10 T', color: '#FF3B30'},
        {type: 'arrow', x1: 56, y1: 50, x2: 92, y2: 30, at: '10', dur: 2.0, label: '10 T', color: '#FF3B30'},
      ],
    },
    // 4. punchline on a freeze
    {
      kind: 'pause', from: 24.5, to: 32.67,
      clip: {file: C('07-strain-face'), start: 2.0, label: 'Freeze: teeth gritted', zoom: 0.07},
      overlays: [
        {type: 'meme', file: 'ep02/assets/deadlift.jpg', emoji: '', at: 'world', dur: 1.4},
        {type: 'versus', left: '½ T', leftSub: 'deadlift world record', right: '10 T', rightSub: 'per arm', at: 'half', dur: 2.6},
        {type: 'pop', text: '×20', x: 50, y: 30, at: '20', dur: 3.0, color: '#FFD60A', size: 190},
      ],
    },
    // 5. movie burst: the first web anchor rips the window out of the wall
    {kind: 'play', dur: 3.0, clip: {file: C('02-wall-rips'), start: 1.5, label: 'Window frame rips out of the wall'}},
    // 6. "to be fair" over moving footage
    {
      kind: 'vo', from: 32.67, to: 39.01,
      clip: {file: C('03-webs-fire'), start: 1.0, label: 'Web lines streaming to the buildings'},
      overlays: [{type: 'stamp', text: 'WEBS', good: true, at: 'handle', dur: 1.8}],
    },
    // 7. closer on a freeze
    {
      kind: 'pause', from: 39.01, to: 45.28,
      clip: {file: C('06-scream'), start: 1.0, label: 'Freeze: screaming, arms pinned', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'SHOULDERS', good: false, at: 'shoulders', dur: 1.4},
        {type: 'stamp', text: 'WALLS', good: false, at: 'brick', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'exploded'},
      ],
    },
    {
      kind: 'vo', from: 45.28, to: 48.87,
      clip: {file: C('08-pass-out'), start: 1.0, label: 'Eyes roll back, collapses'},
      overlays: [{type: 'stamp', text: 'REALISTIC', good: true, at: 'realistic', dur: 1.6}],
    },
    // 8. end on the movie
    {kind: 'play', dur: 2.5, clip: {file: C('09-carried'), start: 3.0, label: 'Carried through the carriage'}},
  ],
};
