import {Episode} from '../template/types';
import words from './ep19.words.json';

// EP19 — Pacific Rim (2013): Gipsy Danger swings a cargo ship. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/19-pacificrim-ship/cut_clips.py (Hong Kong fight: the ship swings over the street into the Kaiju).

const C = (name: string) => `ep19/clips/${name}.mp4`;

export const ep19: Episode = {
  id: 'ep19',
  title: ['Physics Nerd reacts to', 'Pacific Rim'],
  voiceover: 'ep19/vo.wav',
  words,
  bedDb: -3.4, // AI Studio take at -19.9 LUFS vs the usual -16.5: movie audio + SFX down to keep the balance
  captionFixes: {holes: 'hulls', hole: 'hull', vibranium: 'Vibranium', 'vibranium,': 'Vibranium,'},
  beats: [
    {kind: 'play', dur: 2.4, clip: {file: C('01-swing'), start: 0, label: 'Ship meets Kaiju'}},
    {
      kind: 'pause', from: 0.0, to: 7.51,
      clip: {file: C('02-held'), start: 0.7, label: 'Freeze: Gipsy holding the ship like a bat', zoom: 0.06},
      overlays: [{type: 'meme', file: 'ep19/assets/baseball-bat.jpg', emoji: '', at: 'baseball', dur: 1.3}],
    },
    {
      kind: 'vo', from: 7.51, to: 21.86,
      clip: {file: C('03-ship'), start: 0, label: 'The swing'},
      overlays: [
        {type: 'meme', file: 'ep19/assets/clapperboard.jpg', emoji: '', at: 'coolest', dur: 1.2},
        {type: 'pop', text: 'HOLLOW STEEL SHELL · THOUSANDS OF TONS', x: 50, y: 22, at: 'hollow', dur: 3.0, color: '#FFD60A', size: 75},
      ],
    },
    {
      kind: 'pause', from: 21.86, to: 29.57,
      clip: {file: C('02-held'), start: 0.7, label: 'Freeze: held by one end', zoom: 0.04},
      overlays: [
        {type: 'radius', cx: 26, cy: 50, r: 9, at: 'end', dur: 4.0, label: 'SNAP POINT'},
        {type: 'pop', text: '300 FT · HELD BY ONE END', x: 50, y: 82, at: '300', dur: 2.6, color: '#FF3B30', size: 90},
      ],
    },
    {
      kind: 'pause', from: 29.57, to: 38.56,
      clip: {file: C('04-hull'), start: 0.6, label: 'Freeze: the hull overhead', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'BENDING FORCE → SNAP', x: 50, y: 24, at: 'bending', dur: 2.4, color: '#FF3B30', size: 100},
        {type: 'meme', file: 'ep19/assets/breadstick.jpg', emoji: '', at: 'bear', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('01-swing'), start: 0.3, label: 'Clean across the jaw'}},
    {
      kind: 'pause', from: 38.56, to: 47.91,
      clip: {file: C('01-swing'), start: 1.6, label: 'Freeze: the ship, somehow in one piece', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'SHIPYARD WARRANTY: VOID', good: false, at: 'Vibranium', dur: 1.8},
        {type: 'pop', text: 'REAL FREIGHTERS SNAP IN HEAVY SEAS', x: 50, y: 80, at: 'real', dur: 2.6, color: '#FFD60A', size: 75},
        {type: 'sfx', name: 'boom', at: 'chin'},
      ],
    },
  ],
};
