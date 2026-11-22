import {Episode} from '../template/types';
import words from './ep01.words.json';

// EP01 — Interstellar: the 68 RPM docking. Script: episodes/01-interstellar-docking/script.md
// `from`/`to` are seconds in the voiceover take (public/ep01/vo.mp3).
// Clips are cut from the film by episodes/01-interstellar-docking/cut_clips.py (timestamps there).

export const ep01: Episode = {
  id: 'ep01',
  title: ['Physics Nerd reacts to', 'Interstellar'],
  voiceover: 'ep01/vo.mp3',
  words,
  captionFixes: {'Gs.': "G's", 'Gs,': "G's", '68.': '68', '9.': '9'},
  beats: [
    {
      kind: 'vo', from: 0, to: 5.42,
      clip: {file: 'ep01/clips/01-spin-topdown.mp4', label: 'Endurance spinning, wide shot', zoom: 0.08},
      overlays: [{type: 'spin', cx: 50, cy: 47, r: 20, at: 1.2, dur: 4, label: '68 RPM'}],
    },
    {
      kind: 'movie', dur: 4.5,
      clip: {file: 'ep01/clips/02-not-possible.mp4', label: 'Cockpit: "It\'s not possible" / "No. It\'s necessary."'},
    },
    {
      kind: 'vo', from: 5.42, to: 10.43,
      clip: {file: 'ep01/clips/03-modules-close.mp4', label: 'Endurance spinning, closer', zoom: 0.06},
      overlays: [{type: 'pop', text: '1.13 SPINS / SEC', x: 50, y: 22, at: 1.9, dur: 3, color: '#FFD60A', size: 100}],
    },
    {
      kind: 'vo', from: 10.43, to: 17.6,
      clip: {file: 'ep01/clips/04-from-ranger.mp4', label: 'Endurance seen from the Ranger'},
      overlays: [
        {type: 'radius', cx: 57, cy: 57, r: 18, at: 0.8, dur: 2.8, label: '30 m'},
        {type: 'pop', text: '770 KM/H', x: 50, y: 20, at: 5.0, dur: 2.2, color: '#FF3B30', size: 140},
      ],
    },
    {
      kind: 'vo', from: 17.6, to: 23.44,
      clip: {file: 'ep01/clips/05-modules-zoom.mp4', label: 'Endurance, slow zoom', zoom: 0.12},
      overlays: [
        {type: 'arrow', x1: 50, y1: 48, x2: 85, y2: 20, at: 0.3, dur: 5},
        {type: 'arrow', x1: 50, y1: 48, x2: 15, y2: 20, at: 0.4, dur: 5},
        {type: 'arrow', x1: 50, y1: 48, x2: 85, y2: 72, at: 0.5, dur: 5},
        {type: 'arrow', x1: 50, y1: 48, x2: 15, y2: 72, at: 0.6, dur: 5},
        {type: 'pop', text: '155 G', x: 50, y: 48, at: 3.9, dur: 2, color: '#FF3B30', size: 220},
      ],
    },
    {
      kind: 'vo', from: 23.44, to: 28.49,
      clip: {file: 'ep01/clips/06-cooper-brand.mp4', label: 'Cooper in the cockpit, straining'},
      overlays: [
        {type: 'meme', file: undefined, emoji: '😳', at: 0, dur: 1.1},
        {type: 'versus', left: '9 G', leftSub: 'fighter pilot blacks out', right: '155 G', rightSub: 'Endurance rim', at: 1.4, dur: 3.6},
      ],
    },
    {
      kind: 'vo', from: 28.49, to: 35.54,
      clip: {file: 'ep01/clips/07-modules-boom.mp4', label: 'Endurance ring modules, damaged', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '1 TON → 155 TONS', x: 50, y: 30, at: 1.0, dur: 3.6, color: '#FFD60A', size: 96},
        {type: 'pop', text: '💥', x: 74, y: 24, at: 5.0, dur: 2, size: 160},
      ],
    },
    {
      kind: 'vo', from: 35.54, to: 42.69,
      clip: {file: 'ep01/clips/08-spin-far.mp4', label: 'Endurance spinning'},
      overlays: [
        {type: 'versus', left: '2–5', leftSub: 'real design (RPM)', right: '68', rightSub: 'Endurance (RPM)', at: 0.6, dur: 6.4},
      ],
    },
    {
      kind: 'vo', from: 42.69, to: 49.22,
      clip: {file: 'ep01/clips/09-thrusters-axis.mp4', label: 'Ranger thrusters firing, matching spin'},
      overlays: [
        {type: 'arrow', x1: 50, y1: 92, x2: 50, y2: 36, at: 1.8, dur: 4.5, label: 'spin axis', color: '#FFD60A'},
        {type: 'pop', text: '1 M → 5 G', x: 50, y: 18, at: 4.6, dur: 1.9, color: '#FF3B30', size: 130},
      ],
    },
    {
      kind: 'vo', from: 49.22, to: 53.73,
      clip: {file: 'ep01/clips/10-blackout.mp4', label: 'Cooper & Brand nearly blacking out'},
      overlays: [{type: 'stamp', text: 'ACCURATE', good: true, at: 1.4, dur: 3}],
    },
    {
      kind: 'movie', dur: 3.5,
      clip: {file: 'ep01/clips/11-clamps-lock.mp4', label: 'Docking clamps lock (movie audio)'},
    },
    {
      kind: 'vo', from: 53.73, to: 60.27,
      clip: {file: 'ep01/clips/12-survivable.mp4', label: 'Endurance stabilised', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'SURVIVABLE', good: true, at: 1.7, dur: 1.9},
        {type: 'stamp', text: '100 PIECES', good: false, at: 3.9, dur: 2.6},
      ],
    },
    {
      kind: 'vo', from: 60.27, to: 63.52,
      clip: {file: 'ep01/clips/13-ring-close.mp4', label: 'Endurance ring close-up'},
      overlays: [{type: 'meme', file: undefined, emoji: '🫡', at: 1.9, dur: 1.35}],
    },
  ],
};
