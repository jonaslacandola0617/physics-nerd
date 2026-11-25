import {Episode} from '../template/types';
import words from './ep25.words.json';

// EP25 — Fast & Furious 6 (2013): the endless runway. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/25-fast6-runway/cut_clips.py (720p, night, gamma lifted; burned-in radio captions avoided).
// Footage: cars racing under the plane, harpoon guns fired into it, the plane explodes, a car drives out of the fire.

const C = (name: string) => `ep25/clips/${name}.mp4`;

export const ep25: Episode = {
  id: 'ep25',
  title: ['Physics Nerd reacts to', 'Fast & Furious 6'],
  voiceover: 'ep25/vo.wav',
  words,
  bedDb: -3.9, // AI Studio take at -20.4 LUFS vs the usual -16.5: movie audio + SFX down to keep the balance
  captionFixes: {'screentime,': 'screen time,', '6': 'Six'},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('01-runway'), start: 1.5, label: 'Cars racing under the plane'}},
    {
      kind: 'pause', from: 0.0, to: 6.08,
      clip: {file: C('01-runway'), start: 3.0, label: 'Freeze: cars under the plane', zoom: 0.06},
      overlays: [{type: 'meme', file: 'ep25/assets/wet-concrete.jpg', emoji: '', at: 'Nobel', dur: 1.4}],
    },
    {
      kind: 'vo', from: 6.08, to: 18.93,
      clip: {file: C('03-endless'), start: 0, label: 'Still on the runway'},
      overlays: [
        {type: 'pop', text: '~13 MIN OF SCREEN TIME', x: 50, y: 24, at: '13', dur: 2.4, color: '#FFD60A', size: 95},
        {type: 'pop', text: '120+ MPH × 13 MIN ≈ 26 MILES', x: 50, y: 78, at: 'math', dur: 3.0, color: '#FF3B30', size: 85},
      ],
    },
    {
      kind: 'pause', from: 18.93, to: 28.0,
      clip: {file: C('04-lights'), start: 0.6, label: 'Freeze: runway lights to the horizon', zoom: 0.05},
      overlays: [
        {type: 'versus', left: '3.4 MI', leftSub: 'longest real runway', right: '~26 MI', rightSub: 'Fast 6 runway', at: 'longest', dur: 4.0},
        {type: 'meme', file: 'ep25/assets/marathon.jpg', emoji: '', at: 'length', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 28.0, to: 40.61,
      clip: {file: C('05-harpoon'), start: 0, label: 'Harpoon guns fired into the plane'},
      overlays: [
        {type: 'pop', text: '~400-TON CARGO PLANE', x: 50, y: 24, at: '400', dur: 2.4, color: '#FF3B30', size: 95},
        {type: 'meme', file: 'ep25/assets/golden-retrievers.jpg', emoji: '', at: 'golden', dur: 1.5},
      ],
    },
    {kind: 'play', dur: 4.2, clip: {file: C('06-boom'), start: 0, label: 'The plane goes up'}},
    {
      kind: 'pause', from: 40.61, to: 49.56,
      clip: {file: C('07-out'), start: 5.0, label: 'Freeze: driving out of the fire', zoom: 0.06},
      overlays: [
        {type: 'meme', file: 'ep25/assets/wedding-cans.jpg', emoji: '', at: 'wedding', dur: 1.3},
        {type: 'stamp', text: 'AERODYNAMICS: OPTIONAL', good: false, at: 'aerodynamics', dur: 1.5},
        {type: 'sfx', name: 'boom', at: 'asphalt'},
      ],
    },
  ],
};
