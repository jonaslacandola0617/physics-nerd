import {Episode} from '../template/types';
import words from './ep03.words.json';

// EP03 — Civil War: holding the helicopter. Script: episodes/03-civilwar-helicopter/script.md
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/03-civilwar-helicopter/cut_clips.py. Footage check: Cap grabs the skid from the pad, then holds it
// with his other hand clamped on the helipad's yellow metal railing (so "railing" is right).

const C = (name: string) => `ep03/clips/${name}.mp4`;

export const ep03: Episode = {
  id: 'ep03',
  title: ['Physics Nerd reacts to', 'Civil War'],
  voiceover: 'ep03/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('01-grab'), start: 0, label: 'Cap grabs the skid'}},
    {
      kind: 'pause', from: 0, to: 5.22,
      clip: {file: C('03-hold'), start: 7.0, label: 'Freeze: the bicep curl', zoom: 0.07},
      overlays: [{type: 'meme', emoji: '💪', at: 'bicep', dur: 1.4}],
    },
    {
      kind: 'vo', from: 5.22, to: 18.2,
      clip: {file: C('02-heli'), start: 0, label: 'Helicopter lifts, Cap pulls it down'},
      overlays: [
        {type: 'stamp', text: 'ROTORS CARRY THE WEIGHT', good: true, at: 'rotors', dur: 1.8},
        {type: 'pop', text: '1,000+ LB', x: 50, y: 28, at: 'thousand', dur: 2.0, color: '#FF3B30', size: 170},
      ],
    },
    {
      kind: 'pause', from: 18.2, to: 25.7,
      clip: {file: C('03-hold'), start: 0.5, label: 'Freeze: stretched between skid and pad', zoom: 0.07},
      overlays: [{type: 'stamp', text: 'TITANIUM TENDONS', good: true, at: 'titanium', dur: 1.6}],
    },
    {
      kind: 'vo', from: 25.7, to: 36.15,
      clip: {file: C('03-hold'), start: 0, label: 'Holding on'},
      overlays: [
        {type: 'pop', text: '~240 LB vs 1,000+ LB', x: 50, y: 26, at: '240', dur: 2.4, color: '#FFD60A', size: 105},
        {type: 'meme', emoji: '🔑', at: 'keychain', dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 36.15, to: 38.06,
      clip: {file: C('04-railing'), start: 0, label: 'Gripping the railing'},
    },
    {
      kind: 'pause', from: 38.06, to: 46.0,
      clip: {file: C('04-railing'), start: 3.0, label: 'Freeze: hand on the railing', zoom: 0.08},
      overlays: [{type: 'pop', text: 'CODE MINIMUM: 200 LB', x: 50, y: 26, at: '200', dur: 2.4, color: '#FF3B30', size: 110}],
    },
    {kind: 'play', dur: 2.6, clip: {file: C('05-pull'), start: 0, label: 'Helicopter dragged down'}},
    {
      kind: 'pause', from: 46.0, to: 53.5,
      clip: {file: C('03-hold'), start: 10.5, label: 'Freeze: Cap and the railing', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'RAILING = STRONGEST AVENGER', good: true, at: 'strongest', dur: 1.8},
        {type: 'sfx', name: 'boom', at: 'avenger'},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('06-crash'), start: 0.4, label: 'Crash onto the roof'}},
  ],
};
