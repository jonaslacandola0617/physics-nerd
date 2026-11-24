import {Episode} from '../template/types';
import words from './ep23.words.json';

// EP23 — Spider-Man: Homecoming (2017): holding the split ferry together. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/23-homecoming-ferry/cut_clips.py. Footage checked: Peter holds web lines between the halves, the webs
// start snapping, Iron Man flies in, Tony scolds Peter on the rooftop afterwards.

const C = (name: string) => `ep23/clips/${name}.mp4`;

export const ep23: Episode = {
  id: 'ep23',
  title: ['Physics Nerd reacts to', 'Spider-Man: Homecoming'],
  voiceover: 'ep23/vo.mp3',
  words,
  captionFixes: {pole: 'pull', ferry: 'Ferry'},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('01-hold'), start: 0, label: 'Spidey between the two halves'}},
    {
      kind: 'pause', from: 0, to: 7.2,
      clip: {file: C('01-hold'), start: 3.0, label: 'Freeze: Peter straining', zoom: 0.05},
      overlays: [
        {type: 'meme', emoji: '🚇', at: 'subway', dur: 1.2},
        {type: 'meme', emoji: '🎒💪', at: 'backpack', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 7.2, to: 19.5,
      clip: {file: C('02-wide'), start: 0, label: 'The ferry splits open'},
      overlays: [
        {type: 'pop', text: 'STATEN ISLAND FERRY: THOUSANDS OF TONS', x: 50, y: 22, at: 'thousands', dur: 2.8, color: '#FFD60A', size: 75},
        {type: 'pop', text: 'HELD BY: WEBS', x: 50, y: 78, at: 'nothing', dur: 1.8, color: '#FF3B30', size: 100},
      ],
    },
    {
      kind: 'vo', from: 19.5, to: 27.68,
      clip: {file: C('03-webs'), start: 0, label: 'What the webs are stuck to'},
      overlays: [{type: 'pop', text: 'PAINTED SHEET METAL · BENCHES · RAILINGS', x: 50, y: 22, at: 'Thin', dur: 3.0, color: '#FFD60A', size: 70}],
    },
    {
      kind: 'pause', from: 27.68, to: 35.95,
      clip: {file: C('03-webs'), start: 2.6, label: 'Freeze: webs on the deck', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'HUNDREDS OF TONS OF PULL', x: 50, y: 24, at: 'hundreds', dur: 2.4, color: '#FF3B30', size: 95},
        {type: 'meme', emoji: '🩹💥', at: 'Velcro', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 4.0, clip: {file: C('04-ironman'), start: 0, label: 'Webs snap, Iron Man flies in'}},
    {
      kind: 'pause', from: 35.95, to: 47.4,
      clip: {file: C('05-tony'), start: 1.2, label: 'Freeze: Tony scolds Peter', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'PARTIAL CREDIT', good: true, at: 'partial', dur: 1.5},
        {type: 'pop', text: 'REAL SUPERPOWER: FERRY PAINT PRIMER', x: 50, y: 22, at: 'primer', dur: 2.4, color: '#FF3B30', size: 75},
        {type: 'sfx', name: 'boom', at: 'paint'},
      ],
    },
  ],
};
