import {Episode} from '../template/types';
import words from './ep22.words.json';

// EP22 — The Matrix (1999): the rooftop bullet dodge. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/22-matrix-dodge/cut_clips.py. Footage checked: the agent's pistol is a Desert Eagle-type, Neo leans back
// in bullet time, then drops flat onto the roof.

const C = (name: string) => `ep22/clips/${name}.mp4`;

export const ep22: Episode = {
  id: 'ep22',
  title: ['Physics Nerd reacts to', 'The Matrix'],
  voiceover: 'ep22/vo.wav',
  words,
  bedDb: -4.5, // AI Studio take at -21.0 LUFS vs the usual -16.5: movie audio + SFX down to keep the balance
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('01-dodge'), start: 3.0, label: 'Bullet time'}},
    {
      kind: 'pause', from: 0.0, to: 6.12,
      clip: {file: C('01-dodge'), start: 6.5, label: 'Freeze: Neo nearly horizontal', zoom: 0.05},
      overlays: [{type: 'stamp', text: 'CENTER OF GRAVITY: DELETED', good: false, at: 'deleting', dur: 1.8}],
    },
    {
      kind: 'vo', from: 6.12, to: 20.6,
      clip: {file: C('03-shot'), start: 0, label: 'The agent fires'},
      overlays: [
        {type: 'pop', text: '.50 AE: ~1,400 FT/S', x: 50, y: 24, at: 'Desert', dur: 2.6, color: '#FFD60A', size: 100},
        {type: 'pop', text: '25 FT → ~18 MS', x: 50, y: 78, at: '25', dur: 2.6, color: '#FF3B30', size: 110},
      ],
    },
    {
      kind: 'vo', from: 20.6, to: 29.83,
      clip: {file: C('04-bullets'), start: 0, label: 'Bullets ripple past'},
      overlays: [{type: 'versus', left: '~200 MS', leftSub: 'normal reaction time', right: '~18 MS', rightSub: 'bullet flight', at: 'normal', dur: 4.5}],
    },
    {
      kind: 'pause', from: 29.83, to: 38.67,
      clip: {file: C('01-dodge'), start: 6.5, label: 'Freeze: heels vs torso', zoom: 0.03},
      overlays: [
        {type: 'arrow', x1: 30, y1: 34, x2: 30, y2: 86, at: 'center', dur: 4.0, label: 'CENTER OF MASS', color: '#FF3B30'},
        {type: 'pop', text: 'NOTHING HOLDING YOU UP', x: 50, y: 16, at: 'heels', dur: 2.0, color: '#FFD60A', size: 90},
      ],
    },
    {
      kind: 'vo', from: 38.67, to: 45.03,
      clip: {file: C('05-fall'), start: 0, label: 'Neo drops onto the roof'},
      overlays: [{type: 'meme', file: 'ep22/assets/limbo.jpg', emoji: '', at: 'failed', dur: 1.2}],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('05-fall'), start: 3.0, label: 'Flat on the roof'}},
    {
      kind: 'pause', from: 45.03, to: 52.84,
      clip: {file: C('06-look'), start: 1.2, label: 'Freeze: Neo, surprised', zoom: 0.05},
      overlays: [
        {type: 'meme', file: 'ep22/assets/plank.jpg', emoji: '', at: 'core', dur: 1.2},
        {type: 'stamp', text: 'REAL SUPERPOWER: CORE', good: true, at: 'floor', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'superpower'},
      ],
    },
  ],
};
