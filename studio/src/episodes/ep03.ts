import {Episode} from '../template/types';
import words from './ep03.words.json';

// EP03 — Captain America: Civil War, holding the helicopter. Script: episodes/03-civilwar-helicopter/script.md

export const ep03: Episode = {
  id: 'ep03',
  title: ['Physics Nerd reacts to', 'Civil War'],
  voiceover: 'ep03/vo.mp3',
  words,
  beats: [
    {kind: 'vo', from: 0, to: 4.1, clip: {label: 'Cap grabbing the helicopter', zoom: 0.08}},
    {kind: 'movie', dur: 3, clip: {label: 'Bicep-flex close-up, rotor roar (movie audio)'}},
    {
      kind: 'vo', from: 4.1, to: 10.7,
      clip: {label: 'Helicopter straining to lift off the roof'},
      overlays: [
        {type: 'pop', text: '3 TONS', x: 50, y: 30, at: 1.8, dur: 4.6, color: '#FFD60A', size: 170},
        {type: 'stamp', text: 'NOT ALL OF IT', good: false, at: 5.0, dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 10.7, to: 18.2,
      clip: {label: 'Rotor blades spinning'},
      overlays: [
        {type: 'arrow', x1: 50, y1: 70, x2: 50, y2: 25, at: 0.6, dur: 3.2, label: 'LIFT = WEIGHT', color: '#34C759'},
        {type: 'arrow', x1: 50, y1: 45, x2: 85, y2: 15, at: 4.4, dur: 3, label: 'EXTRA', color: '#FF3B30'},
      ],
    },
    {
      kind: 'vo', from: 18.2, to: 25.45,
      clip: {label: 'Wide: Cap stretched between ledge and helicopter'},
      overlays: [
        {type: 'pop', text: '+25%', x: 50, y: 28, at: 2.0, dur: 2.2, color: '#FFD60A', size: 170},
        {type: 'pop', text: '750 KG', x: 50, y: 28, at: 4.6, dur: 2.6, color: '#FF3B30', size: 170},
      ],
    },
    {
      kind: 'vo', from: 25.45, to: 30.6,
      clip: {label: 'Cap hanging on, straining'},
      overlays: [
        {type: 'meme', emoji: '😳', at: 0.1, dur: 1.1},
        {type: 'pop', text: '= 10 PEOPLE', x: 50, y: 30, at: 3.0, dur: 2.1, color: '#FFD60A', size: 130},
      ],
    },
    {
      kind: 'vo', from: 30.6, to: 34.7,
      clip: {label: 'Close on his bent arm', zoom: 0.1},
      overlays: [{type: 'pop', text: '90°', x: 55, y: 45, at: 3.0, dur: 1.1, color: '#FFD60A', size: 200}],
    },
    {
      kind: 'vo', from: 34.7, to: 42.6,
      clip: {label: 'Bent arm, slow zoom', zoom: 0.12},
      overlays: [
        {type: 'arrow', x1: 25, y1: 75, x2: 40, y2: 58, at: 0.8, dur: 3, label: 'bicep', color: '#FFD60A'},
        {type: 'arrow', x1: 75, y1: 75, x2: 62, y2: 30, at: 3.3, dur: 3, label: 'load', color: '#FF3B30'},
        {type: 'pop', text: '8 : 1', x: 50, y: 25, at: 6.4, dur: 1.5, color: '#FFD60A', size: 200},
      ],
    },
    {
      kind: 'vo', from: 42.6, to: 46.0,
      clip: {label: "Cap's face, straining"},
      overlays: [{type: 'pop', text: '6 TONS', x: 50, y: 40, at: 2.1, dur: 1.3, color: '#FF3B30', size: 230}],
    },
    {
      kind: 'vo', from: 46.0, to: 51.4,
      clip: {label: 'Cap holding on'},
      overlays: [
        {type: 'versus', left: '0.4 T', leftSub: 'heavy bicep curl', right: '6 T', rightSub: "Cap's tendon", at: 1.4, dur: 4},
      ],
    },
    {
      kind: 'vo', from: 51.4, to: 58.8,
      clip: {label: 'Helicopter tipping over the roof edge'},
      overlays: [
        {type: 'stamp', text: 'NOT THAT CRAZY', good: true, at: 2.2, dur: 2.3},
        {type: 'stamp', text: 'SNAPPED', good: false, at: 5.8, dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 58.8, to: 62.64,
      clip: {label: 'Cap pulling the helicopter down'},
      overlays: [{type: 'meme', emoji: '💀', at: 2.2, dur: 1.4}],
    },
  ],
};
