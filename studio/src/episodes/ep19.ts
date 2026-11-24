import {Episode} from '../template/types';
import words from './ep19.words.json';

// EP19 — Pacific Rim (2013): Gipsy Danger swings a cargo ship. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/19-pacificrim-ship/cut_clips.py (Hong Kong fight: the ship swings over the street into the Kaiju).

const C = (name: string) => `ep19/clips/${name}.mp4`;

export const ep19: Episode = {
  id: 'ep19',
  title: ['Physics Nerd reacts to', 'Pacific Rim'],
  voiceover: 'ep19/vo.mp3',
  words,
  captionFixes: {holes: 'hulls', hole: 'hull', vibranium: 'Vibranium', 'vibranium,': 'Vibranium,'},
  beats: [
    {kind: 'play', dur: 2.4, clip: {file: C('01-swing'), start: 0, label: 'Ship meets Kaiju'}},
    {
      kind: 'pause', from: 0, to: 6.6,
      clip: {file: C('02-held'), start: 0.7, label: 'Freeze: Gipsy holding the ship like a bat', zoom: 0.06},
      overlays: [{type: 'meme', emoji: '⚾', at: 'baseball', dur: 1.3}],
    },
    {
      kind: 'vo', from: 6.6, to: 19.8,
      clip: {file: C('03-ship'), start: 0, label: 'The swing'},
      overlays: [
        {type: 'meme', emoji: '🎬', at: 'coolest', dur: 1.2},
        {type: 'pop', text: 'HOLLOW STEEL SHELL · THOUSANDS OF TONS', x: 50, y: 22, at: 'hollow', dur: 3.0, color: '#FFD60A', size: 75},
      ],
    },
    {
      kind: 'pause', from: 19.8, to: 26.85,
      clip: {file: C('02-held'), start: 0.7, label: 'Freeze: held by one end', zoom: 0.04},
      overlays: [
        {type: 'radius', cx: 26, cy: 50, r: 9, at: 'end', dur: 4.0, label: 'SNAP POINT'},
        {type: 'pop', text: '300 FT · HELD BY ONE END', x: 50, y: 82, at: '300', dur: 2.6, color: '#FF3B30', size: 90},
      ],
    },
    {
      kind: 'pause', from: 26.85, to: 34.9,
      clip: {file: C('04-hull'), start: 0.6, label: 'Freeze: the hull overhead', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'BENDING FORCE → SNAP', x: 50, y: 24, at: 'bending', dur: 2.4, color: '#FF3B30', size: 100},
        {type: 'meme', emoji: '🐻🥖', at: 'breadstick', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('01-swing'), start: 0.3, label: 'Clean across the jaw'}},
    {
      kind: 'pause', from: 34.9, to: 43.8,
      clip: {file: C('01-swing'), start: 1.6, label: 'Freeze: the ship, somehow in one piece', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'SHIPYARD WARRANTY: VOID', good: false, at: 'Vibranium', dur: 1.8},
        {type: 'pop', text: 'REAL FREIGHTERS SNAP IN HEAVY SEAS', x: 50, y: 80, at: 'real', dur: 2.6, color: '#FFD60A', size: 75},
        {type: 'sfx', name: 'boom', at: 'chin'},
      ],
    },
  ],
};
