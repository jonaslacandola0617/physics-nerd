import {Episode} from '../template/types';
import words from './ep31.words.json';

// EP31 — Armageddon (1998): nuking the Texas-sized asteroid. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/31-armageddon-nuke/cut_clips.py. Footage: the drilling rig and crew on the asteroid, Harry's
// countdown, the nuke splitting the surface, the two halves rushing past, Mission Control cheering.

const C = (name: string) => `ep31/clips/${name}.mp4`;

export const ep31: Episode = {
  id: 'ep31',
  title: ['Physics Nerd reacts to', 'Armageddon'],
  voiceover: 'ep31/vo.wav',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('01-split'), start: 6.5, label: 'The halves rush past'}},
    {
      kind: 'pause', from: 0, to: 6.6,
      clip: {file: C('01-split'), start: 9.0, label: 'Freeze: the asteroid split in two', zoom: 0.05},
      overlays: [{type: 'pop', text: 'NASA MANAGER TRAINING FILM', x: 50, y: 22, at: 'managers', dur: 2.6, color: '#FFD60A', size: 85}],
    },
    {
      kind: 'vo', from: 6.6, to: 19.9,
      clip: {file: C('03-drill'), start: 0, label: 'Drilling on the asteroid'},
      overlays: [
        {type: 'pop', text: 'ASTEROID: ~800 MILES WIDE', x: 50, y: 22, at: 'Texas', dur: 2.6, color: '#FFD60A', size: 90},
        {type: 'pop', text: 'DRILL DEPTH: 800 FT', x: 50, y: 78, at: 'drill', dur: 2.6, color: '#FF3B30', size: 100},
      ],
    },
    {
      kind: 'vo', from: 19.9, to: 31.6,
      clip: {file: C('04-nuke'), start: 0, label: 'The countdown, the detonation'},
      overlays: [{type: 'pop', text: 'NEEDED: ~1 BILLION × THE BIGGEST NUKE EVER', x: 50, y: 22, at: 'billion', dur: 3.2, color: '#FF3B30', size: 70}],
    },
    {
      kind: 'pause', from: 31.6, to: 40.2,
      clip: {file: C('05-rock'), start: 1.0, label: 'Freeze: the asteroid surface', zoom: 0.05},
      overlays: [{type: 'meme', file: 'ep31/assets/firecracker-bowling-ball.jpg', emoji: '', at: 'firecracker', dur: 1.6}],
    },
    {kind: 'play', dur: 3.5, clip: {file: C('06-cheer'), start: 0, label: 'Earth celebrates'}},
    {
      kind: 'pause', from: 40.2, to: 47.9,
      clip: {file: C('01-split'), start: 6.6, label: 'Freeze: the glowing asteroid', zoom: 0.05},
      overlays: [
        {type: 'meme', file: 'ep31/assets/radioactive-texas.jpg', emoji: '', at: 'radioactive', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'heads'},
      ],
    },
  ],
};
