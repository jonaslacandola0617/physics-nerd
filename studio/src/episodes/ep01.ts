import {Episode} from '../template/types';
import words from './ep01.words.json';

// EP01 v2 — Interstellar docking, reaction format. Script: episodes/01-interstellar-docking/script.md
// PLAY = movie with its own audio. PAUSE = click, freeze on clip.start, voiceover slice [from, to] (seconds in vo.mp3).
// Overlay `at` can be a word from that pause's voiceover. Clips come from episodes/01-interstellar-docking/cut_clips.py.

const C = (name: string) => `ep01/clips/${name}.mp4`;

export const ep01: Episode = {
  id: 'ep01',
  title: ['Physics Nerd reacts to', 'Interstellar'],
  voiceover: 'ep01/vo.mp3',
  words,
  captionFixes: {'Gs.': "G's", 'in!': 'in.'},
  beats: [
    {kind: 'play', dur: 3.5, clip: {file: C('01-spin-topdown'), start: 0, label: 'Endurance spinning, top-down', zoom: 0.05}},
    {
      kind: 'pause', from: 0, to: 4.75,
      clip: {file: C('01-spin-topdown'), start: 3.45, label: 'Freeze: ring mid-spin', zoom: 0.06},
      overlays: [{type: 'meme', emoji: '🌀', at: 'tumble', dur: 1.0}],
    },
    {kind: 'play', dur: 3.9, clip: {file: C('02-not-possible'), start: 0, label: '"It\'s not possible." / "No. It\'s necessary."'}},
    {
      kind: 'pause', from: 5.58, to: 14.5,
      clip: {file: C('02-not-possible'), start: 3.6, label: "Freeze: Cooper's face", zoom: 0.08},
      overlays: [
        {type: 'arrow', x1: 50, y1: 45, x2: 88, y2: 18, at: '150', dur: 3},
        {type: 'arrow', x1: 50, y1: 45, x2: 12, y2: 18, at: '150', dur: 3},
        {type: 'pop', text: '~150 G', x: 50, y: 40, at: '150', dur: 3.2, color: '#FF3B30', size: 220},
        {type: 'sfx', name: 'boom', at: 'complaint'},
      ],
    },
    {kind: 'play', dur: 4.8, clip: {file: C('07-modules-boom'), start: 0, label: 'Modules sweeping past the Ranger'}},
    {
      kind: 'pause', from: 15.3, to: 22.37,
      clip: {file: C('07-modules-boom'), start: 4.7, label: 'Freeze: Ranger on the axis', zoom: 0.06},
      overlays: [
        {type: 'arrow', x1: 8, y1: 50, x2: 92, y2: 50, at: 'middle', dur: 2.6, label: 'spin axis', color: '#FFD60A'},
        {type: 'pop', text: '~5 G', x: 50, y: 30, at: '5', dur: 2.6, color: '#FFD60A', size: 200},
        {type: 'meme', emoji: '🎢', at: 'roller', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 5.2, clip: {file: C('06-cooper-brand'), start: 0, label: 'Cooper and Brand straining'}},
    {
      kind: 'pause', from: 23.4, to: 31.1,
      clip: {file: C('06-cooper-brand'), start: 5.0, label: "Freeze: Brand's strained face", zoom: 0.08},
      overlays: [
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'nolan', dur: 1.6},
        {type: 'pop', text: '🎊', x: 50, y: 40, at: 'confetti', dur: 1.2, size: 260},
      ],
    },
    {kind: 'play', dur: 3.6, clip: {file: C('11-clamps-lock'), start: 0, label: 'Clamp closes: "...locked!"'}},
    {
      kind: 'pause', from: 31.74, to: 41.94,
      clip: {file: C('11-clamps-lock'), start: 3.4, label: 'Freeze: Ranger clamped in the port', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'COOPER', good: true, at: 'survivable', dur: 1.3},
        {type: 'stamp', text: 'SHIP', good: false, at: 'held', dur: 2.6},
        {type: 'pop', text: 'SUBSCRIBE', x: 50, y: 25, at: 'subscribe', dur: 2.8, color: '#FFD60A', size: 120},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('12-survivable'), start: 2.05, label: 'The shredded ring'}},
  ],
};
