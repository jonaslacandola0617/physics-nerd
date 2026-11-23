import {Episode} from '../template/types';
import words from './ep14.words.json';

// EP14 — Infinity War: Thor and the star. Script: episodes/physics_nerd_scripts_ep11_to_ep15.md (approved fixes).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/14-infinitywar-thor-star/cut_clips.py. Footage: rings around the star, Rocket's pod, the star
// reigniting, Thor holding the iris open in the beam, the pour.

const C = (name: string) => `ep14/clips/${name}.mp4`;

export const ep14: Episode = {
  id: 'ep14',
  title: ['Physics Nerd reacts to', 'Infinity War'],
  voiceover: 'ep14/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.5, clip: {file: C('04-beam'), start: 0, label: 'Beam through the iris'}},
    {
      kind: 'pause', from: 0, to: 3.56,
      clip: {file: C('01-iris'), start: 0.5, label: 'Freeze: Thor holding the iris', zoom: 0.07},
    },
    {
      kind: 'vo', from: 3.56, to: 15.2,
      clip: {file: C('02-rings'), start: 0, label: 'Rings, pod, the star reignites'},
      overlays: [
        {type: 'stamp', text: 'FORGET THE HEAT', good: false, at: 'forget', dur: 1.2},
        {type: 'pop', text: '~1.5 SUNS · ~12 MILES WIDE', x: 50, y: 26, at: 'mass', dur: 2.6, color: '#FFD60A', size: 90},
      ],
    },
    {
      kind: 'vo', from: 15.2, to: 24.79,
      clip: {file: C('03-pod'), start: 0, label: "Rocket's pod, beam"},
      overlays: [{type: 'pop', text: 'MILLIONS × EARTH GRAVITY', x: 50, y: 26, at: 'millions', dur: 2.4, color: '#FF3B30', size: 95}],
    },
    {
      kind: 'pause', from: 24.79, to: 34.38,
      clip: {file: C('04-beam'), start: 3.5, label: 'Freeze: Thor in the beam', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'TIDAL STRETCHING', good: false, at: 'stretches', dur: 1.6},
        {type: 'meme', emoji: '🍝', at: 'spaghetti', dur: 1.8},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {file: C('05-pour'), start: 0, label: 'The pour'}},
    {
      kind: 'pause', from: 34.38, to: 42.0,
      clip: {file: C('06-close'), start: 0.6, label: 'Freeze: the iris', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'FORGE CONTRACTOR = STRONGEST IN MCU', x: 50, y: 24, at: 'whoever', dur: 2.8, color: '#FFD60A', size: 75},
        {type: 'sfx', name: 'boom', at: 'mcu'},
      ],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('01-iris'), start: 1.8, label: 'Thor in the light'}},
  ],
};
