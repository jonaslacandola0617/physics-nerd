import {Episode} from '../template/types';
import words from './ep02.words.json';

// EP02 — Spider-Man 2: stopping the train. Script: episodes/02-spiderman2-train/script.md

export const ep02: Episode = {
  id: 'ep02',
  title: ['Physics Nerd reacts to', 'Spider-Man 2'],
  voiceover: 'ep02/vo.mp3',
  words,
  captionFixes: {TNT: 'TNT'},
  beats: [
    {kind: 'vo', from: 0, to: 3.6, clip: {label: 'Spidey on the front of the train, feet planted', zoom: 0.08}},
    {kind: 'movie', dur: 3, clip: {label: 'Feet grinding on the track, sparks (movie audio)'}},
    {
      kind: 'vo', from: 3.6, to: 11.8,
      clip: {label: 'Train racing along the elevated track'},
      overlays: [
        {type: 'pop', text: '4 CARS', x: 50, y: 25, at: 1.1, dur: 1.9, color: '#FFD60A', size: 130},
        {type: 'pop', text: '160 TONS', x: 50, y: 25, at: 3.9, dur: 2.1, color: '#FF3B30', size: 150},
        {type: 'pop', text: '100 KM/H', x: 50, y: 25, at: 6.3, dur: 1.9, color: '#FFD60A', size: 150},
      ],
    },
    {
      kind: 'vo', from: 11.8, to: 15.8,
      clip: {label: 'Train, wide', zoom: 0.1},
      overlays: [
        {type: 'pop', text: '💥', x: 50, y: 40, at: 1.6, dur: 2.4, size: 260},
        {type: 'pop', text: '15 KG TNT', x: 50, y: 62, at: 1.8, dur: 2.2, color: '#FF3B30', size: 130},
      ],
    },
    {
      kind: 'vo', from: 15.8, to: 18.7,
      clip: {label: 'Spidey shooting webs to both sides'},
      overlays: [
        {type: 'arrow', x1: 50, y1: 50, x2: 8, y2: 15, at: 0.6, dur: 2.3, color: '#FFD60A'},
        {type: 'arrow', x1: 50, y1: 50, x2: 92, y2: 15, at: 0.7, dur: 2.3, color: '#FFD60A'},
      ],
    },
    {
      kind: 'vo', from: 18.7, to: 25.7,
      clip: {label: 'Spidey straining, arms out', zoom: 0.08},
      overlays: [
        {type: 'pop', text: '20 TONS', x: 50, y: 24, at: 2.8, dur: 1.9, color: '#FF3B30', size: 150},
        {type: 'arrow', x1: 40, y1: 50, x2: 12, y2: 28, at: 5.0, dur: 2, label: '10 T', color: '#FF3B30'},
        {type: 'arrow', x1: 60, y1: 50, x2: 88, y2: 28, at: 5.1, dur: 1.9, label: '10 T', color: '#FF3B30'},
      ],
    },
    {
      kind: 'vo', from: 25.7, to: 29.95,
      clip: {label: 'Spidey straining, close'},
      overlays: [
        {type: 'meme', emoji: '😳', at: 0, dur: 1.1},
        {type: 'versus', left: '0.5 T', leftSub: 'deadlift world record', right: '10 T', rightSub: 'each arm', at: 1.5, dur: 2.75},
      ],
    },
    {
      kind: 'vo', from: 29.95, to: 36.4,
      clip: {label: "Spidey's face, mask torn off", zoom: 0.06},
      overlays: [{type: 'pop', text: '×20', x: 50, y: 30, at: 2.7, dur: 3.5, color: '#FFD60A', size: 260}],
    },
    {
      kind: 'vo', from: 36.4, to: 43.4,
      clip: {label: 'Close on the web lines stretching'},
      overlays: [
        {type: 'pop', text: '≈ 1 CM', x: 50, y: 28, at: 4.3, dur: 1.6, color: '#FFD60A', size: 150},
        {type: 'stamp', text: 'ACCURATE', good: true, at: 5.6, dur: 1.4},
      ],
    },
    {kind: 'movie', dur: 3, clip: {label: 'Train stops at the edge of the track (movie audio)'}},
    {
      kind: 'vo', from: 43.4, to: 48.8,
      clip: {label: 'Passengers catching him'},
      overlays: [{type: 'arrow', x1: 50, y1: 70, x2: 50, y2: 35, at: 3.2, dur: 2.2, label: 'shoulders', color: '#FF3B30'}],
    },
    {
      kind: 'vo', from: 48.8, to: 53.84,
      clip: {label: 'Spidey limp, carried overhead'},
      overlays: [{type: 'meme', emoji: '💀', at: 3.6, dur: 1.24}],
    },
  ],
};
