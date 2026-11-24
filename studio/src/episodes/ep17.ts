import {Episode} from '../template/types';
import words from './ep17.words.json';

// EP17 — Iron Man 2 (2010): the Mark V suitcase suit in Monaco. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/17-ironman2-suitcase/cut_clips.py. Footage checked: Tony yells "In the case, please!", Pepper throws the
// case out of the Rolls (no kiss in this cut), Tony steps on it and the Mark V wraps around him.

const C = (name: string) => `ep17/clips/${name}.mp4`;

export const ep17: Episode = {
  id: 'ep17',
  title: ['Physics Nerd reacts to', 'Iron Man 2'],
  voiceover: 'ep17/vo.mp3',
  words,
  captionFixes: {"Soldier's": 'Soldier', V: 'Five'},
  beats: [
    {kind: 'play', dur: 2.75, clip: {file: C('01-toss'), start: 0, label: '"In the case, please!" Pepper throws it'}},
    {
      kind: 'pause', from: 0, to: 6.85,
      clip: {file: C('05-pepper'), start: 0.3, label: 'Freeze: Pepper with the case', zoom: 0.07},
      overlays: [
        {type: 'pop', text: '~200 LB SUIT', x: 50, y: 24, at: '200', dur: 2.2, color: '#FF3B30', size: 110},
        {type: 'meme', emoji: '🧳✈️', at: 'carry', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 6.85, to: 18.75,
      clip: {file: C('02-case'), start: 0, label: 'The case unfolds'},
      overlays: [
        {type: 'meme', emoji: '🏆', at: 'Oscar', dur: 1.2},
        {type: 'pop', text: 'FULL METAL SUIT: ~150–250 LB', x: 50, y: 24, at: 'full', dur: 3.0, color: '#FFD60A', size: 85},
      ],
    },
    {
      kind: 'pause', from: 18.75, to: 24.25,
      clip: {file: C('02-case'), start: 0.4, label: 'Freeze: the thin case on the track', zoom: 0.06},
      overlays: [{type: 'meme', emoji: '🦴💥', at: 'dislocating', dur: 1.3}],
    },
    {
      kind: 'vo', from: 24.25, to: 37.1,
      clip: {file: C('03-plates'), start: 0, label: 'Plates snap over arms and chest'},
      overlays: [
        {type: 'pop', text: 'PAPER-THIN PLATES', x: 50, y: 24, at: 'paper', dur: 2.2, color: '#FF3B30', size: 100},
        {type: 'pop', text: 'NO ROOM: MOTORS · WIRING · PADDING', x: 50, y: 78, at: 'zero', dur: 2.6, color: '#FFD60A', size: 75},
        {type: 'meme', emoji: '🥫', at: 'soda', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('04-done'), start: 1.9, label: 'Suited up'}},
    {
      kind: 'pause', from: 37.1, to: 42.83,
      clip: {file: C('01-toss'), start: 0.6, label: 'Freeze: Pepper in the Rolls', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'PEPPER POTTS = SECRET SUPER SOLDIER', x: 50, y: 22, at: 'Someone', dur: 2.8, color: '#FF3B30', size: 75},
        {type: 'sfx', name: 'boom', at: 'immediately'},
      ],
    },
  ],
};
