import {Episode} from '../template/types';
import words from './ep08.words.json';

// EP08 — The Dark Knight: flipping the 18-wheeler. Script: episodes/physics_nerd_scripts_ep06_to_ep10.md (approved closer).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/08-darkknight-truck/cut_clips.py. Footage check: cables hook the truck's bumper, Batpod weaves
// them around the lampposts, and two poles are visibly ripped out ~1.5 s before the truck flips.

const C = (name: string) => `ep08/clips/${name}.mp4`;

export const ep08: Episode = {
  id: 'ep08',
  title: ['Physics Nerd reacts to', 'The Dark Knight'],
  voiceover: 'ep08/vo.mp3',
  words,
  captionFixes: {"cable's": 'cables?', Pure: 'pure'},
  beats: [
    // 1. movie open: the flip
    {kind: 'play', dur: 2.0, clip: {file: C('03-flip'), start: 0, label: 'The truck flips'}},
    // 2. hook on a freeze
    {
      kind: 'pause', from: 0, to: 6.3,
      clip: {file: C('03-flip'), start: 0.5, label: 'Freeze: truck vertical', zoom: 0.07},
    },
    // 3. the truck, the cables
    {
      kind: 'vo', from: 6.3, to: 18.77,
      clip: {file: C('01-chase'), start: 0, label: 'Joker, Batpod, cables, weave'},
      overlays: [{type: 'pop', text: '15+ TONS', x: 50, y: 28, at: '15', dur: 2.0, color: '#FF3B30', size: 180}],
    },
    // 4. the anchor on a freeze
    {
      kind: 'pause', from: 18.77, to: 26.8,
      clip: {file: C('01-chase'), start: 10.45, label: 'Freeze: Batpod at the lamppost', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'BOLTS: RATED FOR WIND', x: 50, y: 26, at: 'anchor', dur: 2.6, color: '#FFD60A', size: 100},
        {type: 'pop', text: 'vs 15 TONS', x: 50, y: 40, at: '15', dur: 1.8, color: '#FF3B30', size: 140},
      ],
    },
    // 5. the poles rip out (they do, on screen)
    {
      kind: 'vo', from: 26.8, to: 31.95,
      clip: {file: C('02-poles'), start: 0, label: 'Lampposts ripped out, truck flips'},
      overlays: [{type: 'stamp', text: 'POLES: GONE', good: false, at: 'rip', dur: 1.4}],
    },
    // 6. movie burst
    {kind: 'play', dur: 2.6, clip: {file: C('04-joker'), start: 0.2, label: 'Joker crawls out of the cab'}},
    // 7. to be fair: real stunt
    {
      kind: 'vo', from: 31.95, to: 41.93,
      clip: {file: C('03-flip'), start: 0, label: 'Flip, smoke, truck on its roof'},
      overlays: [
        {type: 'stamp', text: 'REAL STUNT', good: true, at: 'real', dur: 1.6},
        {type: 'pop', text: 'NITROGEN PISTON', x: 50, y: 28, at: 'nitrogen', dur: 2.0, color: '#34C759', size: 120},
      ],
    },
    // 8. closer on a freeze
    {
      kind: 'pause', from: 41.93, to: 49.6,
      clip: {file: C('04-joker'), start: 6.1, label: 'Freeze: Joker walking off', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'FLIP: REAL', good: true, at: 'flip', dur: 1.2},
        {type: 'stamp', text: 'CABLES: FICTION', good: false, at: 'pure', dur: 1.2},
        {type: 'pop', text: 'LAMPPOSTS > BANK VAULTS', x: 50, y: 28, at: 'gotham', dur: 2.6, color: '#FFD60A', size: 95},
        {type: 'sfx', name: 'boom', at: 'banks'},
      ],
    },
    // 9. end on the movie
    {kind: 'play', dur: 2.2, clip: {file: C('05-batpod'), start: 0.3, label: 'Batpod wall-bounce U-turn'}},
  ],
};
