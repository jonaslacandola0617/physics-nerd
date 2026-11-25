import {Episode} from '../template/types';
import words from './ep24.words.json';

// EP24 — Star Wars: The Empire Strikes Back (1980): the asteroid field. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/24-empire-asteroids/cut_clips.py. Footage checked: C-3PO says "approximately 3,720 to 1",
// Han: "Never tell me the odds."

const C = (name: string) => `ep24/clips/${name}.mp4`;

export const ep24: Episode = {
  id: 'ep24',
  title: ['Physics Nerd reacts to', 'The Empire Strikes Back'],
  voiceover: 'ep24/vo.wav',
  words,
  captionFixes: {spacecrafts: 'spacecraft'},
  beats: [
    {kind: 'play', dur: 4.2, clip: {file: C('01-field'), start: 0, label: 'Into the asteroid field'}},
    {
      kind: 'pause', from: 0.0, to: 9.09,
      clip: {file: C('01-field'), start: 2.6, label: 'Freeze: the Falcon dodging a rock', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'C-3PO: 3,720 TO 1', x: 50, y: 24, at: '3', dur: 2.6, color: '#FFD60A', size: 110},
        {type: 'stamp', text: 'NOT EVEN CLOSE', good: false, at: 'close', dur: 1.2},
      ],
    },
    {
      kind: 'vo', from: 9.09, to: 23.46,
      clip: {file: C('03-ties'), start: 0, label: 'TIE fighters vs asteroids'},
      overlays: [
        {type: 'meme', file: 'ep24/assets/bumper-cars.jpg', emoji: '', at: 'bumper', dur: 1.3},
        {type: 'pop', text: 'REAL SPACING: ~600,000 MILES', x: 50, y: 24, at: 'major', dur: 3.0, color: '#34C759', size: 90},
      ],
    },
    {
      kind: 'pause', from: 23.46, to: 32.3,
      clip: {file: C('03-ties'), start: 2.0, label: 'Freeze: the "crowded" field', zoom: 0.05},
      overlays: [
        {type: 'versus', left: '239,000 MI', leftSub: 'Earth → Moon', right: '~600,000 MI', rightSub: 'between asteroids', at: 'twice', dur: 3.6},
        {type: 'meme', file: 'ep24/assets/telescope.jpg', emoji: '', at: 'without', dur: 1.2},
      ],
    },
    {
      kind: 'vo', from: 32.3, to: 43.36,
      clip: {file: C('04-surface'), start: 0, label: 'Skimming the asteroid surface'},
      overlays: [
        {type: 'pop', text: '12+ PROBES · 0 DODGES NEEDED', x: 50, y: 24, at: 'NASA', dur: 2.8, color: '#34C759', size: 85},
        {type: 'meme', file: 'ep24/assets/blindfold.jpg', emoji: '', at: 'blindfolded', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 4.4, clip: {file: C('05-odds'), start: 0, label: '"Never tell me the odds."'}},
    {
      kind: 'pause', from: 43.36, to: 54.97,
      clip: {file: C('05-odds'), start: 1.5, label: 'Freeze: C-3PO', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'PACKED THAT TIGHT → SPACE DUST', x: 50, y: 24, at: 'smash', dur: 2.6, color: '#FFD60A', size: 80},
        {type: 'stamp', text: "DROID'S MATH: TERRIBLE", good: false, at: 'droid', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'terrible'},
      ],
    },
  ],
};
