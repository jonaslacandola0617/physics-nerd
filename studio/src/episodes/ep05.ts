import {Episode} from '../template/types';
import words from './ep05.words.json';

// EP05 — Jurassic Park: can a T. rex catch the Jeep? Script: episodes/05-jurassicpark-trex/script.md

export const ep05: Episode = {
  id: 'ep05',
  title: ['Physics Nerd reacts to', 'Jurassic Park'],
  voiceover: 'ep05/vo.mp3',
  words,
  captionFixes: {'faster!': 'faster.', 'T-Rex': 'T. rex'},
  beats: [
    {kind: 'vo', from: 0, to: 5.36, clip: {label: 'Malcolm in the back seat, T. rex behind the Jeep', zoom: 0.08}},
    {kind: 'movie', dur: 3, clip: {label: 'T. rex bursting through the trees, roar (movie audio)'}},
    {
      kind: 'vo', from: 5.36, to: 11.42,
      clip: {label: 'Full shot of the T. rex running'},
      overlays: [
        {type: 'pop', text: '8 TONS', x: 50, y: 28, at: 1.6, dur: 2.5, color: '#FFD60A', size: 170},
        {type: 'pop', text: '70 KM/H?', x: 50, y: 28, at: 4.3, dur: 1.75, color: '#FF3B30', size: 150},
      ],
    },
    {
      kind: 'vo', from: 11.42, to: 18.98,
      clip: {label: 'T. rex legs, low angle', zoom: 0.1},
      overlays: [
        {type: 'stamp', text: 'NO WAY', good: false, at: 1.8, dur: 1.7},
        {type: 'pop', text: '> 80% MUSCLE', x: 50, y: 28, at: 4.6, dur: 2.9, color: '#FFD60A', size: 130},
      ],
    },
    {
      kind: 'vo', from: 18.98, to: 23.8,
      clip: {label: 'T. rex running, wide'},
      overlays: [
        {type: 'pop', text: '20–40 KM/H', x: 50, y: 28, at: 1.5, dur: 2.5, color: '#FFD60A', size: 140},
        {type: 'pop', text: '~30', x: 50, y: 28, at: 4.1, dur: 0.7, color: '#FF3B30', size: 190},
      ],
    },
    {
      kind: 'vo', from: 23.8, to: 28.7,
      clip: {label: 'T. rex stride, close on the legs'},
      overlays: [
        {type: 'arrow', x1: 20, y1: 20, x2: 50, y2: 65, at: 1.4, dur: 2.3, label: 'bones', color: '#FF3B30'},
        {type: 'meme', emoji: '🚶', at: 3.85, dur: 1.0},
      ],
    },
    {
      kind: 'vo', from: 28.7, to: 32.85,
      clip: {label: 'Chase, T. rex behind the Jeep'},
      overlays: [{type: 'versus', left: '44', leftSub: 'km/h Usain Bolt', right: '~30', rightSub: 'km/h T. rex', at: 1.5, dur: 2.6}],
    },
    {
      kind: 'vo', from: 32.85, to: 37.5,
      clip: {label: 'Jeep from the front, bouncing down the road', zoom: 0.08},
      overlays: [{type: 'pop', text: '50–60 KM/H', x: 50, y: 28, at: 3.3, dur: 1.3, color: '#FFD60A', size: 140}],
    },
    {
      kind: 'vo', from: 37.5, to: 42.0,
      clip: {label: 'Jeep pulling away from the T. rex'},
      overlays: [
        {type: 'versus', left: '~30', leftSub: 'km/h T. rex', right: '55', rightSub: 'km/h Jeep', at: 0.4, dur: 2.7},
        {type: 'stamp', text: "CAN'T CATCH", good: false, at: 3.2, dur: 1.3},
      ],
    },
    {kind: 'movie', dur: 3, clip: {label: '"Objects in mirror are closer than they appear" close-up (movie audio)'}},
    {
      kind: 'vo', from: 42.0, to: 46.9,
      clip: {label: 'Side mirror with the warning text'},
      overlays: [{type: 'arrow', x1: 20, y1: 20, x2: 50, y2: 70, at: 2.2, dur: 2.5, label: 'the mirror', color: '#FFD60A'}],
    },
    {
      kind: 'vo', from: 46.9, to: 54.6,
      clip: {label: 'Mirror, slow push-in on the T. rex', zoom: 0.12},
      overlays: [
        {type: 'pop', text: 'CONVEX', x: 50, y: 28, at: 1.8, dur: 2.4, color: '#FFD60A', size: 170},
        {type: 'pop', text: 'SMALLER = FARTHER', x: 50, y: 28, at: 5.1, dur: 2.5, color: '#FF3B30', size: 110},
      ],
    },
    {
      kind: 'vo', from: 54.6, to: 57.8,
      clip: {label: 'T. rex filling the mirror'},
      overlays: [{type: 'stamp', text: 'ACCURATE', good: true, at: 2.0, dur: 1.2}],
    },
    {
      kind: 'vo', from: 57.8, to: 62.4,
      clip: {label: 'Muldoon on the gearshift / Malcolm yelling'},
      overlays: [{type: 'meme', emoji: '🫠', at: 2.9, dur: 1.5}],
    },
  ],
};
