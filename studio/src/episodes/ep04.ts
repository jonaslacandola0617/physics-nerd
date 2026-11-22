import {Episode} from '../template/types';
import words from './ep04.words.json';

// EP04 — Fast Five: dragging the vault through Rio. Script: episodes/04-fastfive-vault/script.md

export const ep04: Episode = {
  id: 'ep04',
  title: ['Physics Nerd reacts to', 'Fast Five'],
  voiceover: 'ep04/vo.mp3',
  words,
  captionFixes: {'volt.': 'vault', '0': 'zero', '1800': '1,800'},
  beats: [
    {kind: 'vo', from: 0, to: 4.5, clip: {label: 'Two Chargers launching, cables tight', zoom: 0.08}},
    {kind: 'movie', dur: 3, clip: {label: 'Vault ripping out of the wall (movie audio)'}},
    {
      kind: 'vo', from: 4.5, to: 11.5,
      clip: {label: 'Vault sliding on the road, sparks'},
      overlays: [
        {type: 'pop', text: '10 TONS', x: 50, y: 28, at: 1.6, dur: 2.4, color: '#FFD60A', size: 170},
        {type: 'stamp', text: 'NOT ROLLING', good: false, at: 3.4, dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 11.5, to: 19.1,
      clip: {label: 'Sparks under the vault, close-up', zoom: 0.1},
      overlays: [
        {type: 'pop', text: 'μ ≈ 0.5', x: 50, y: 28, at: 2.3, dur: 2.3, color: '#FFD60A', size: 150},
        {type: 'pop', text: '5 TONS', x: 50, y: 28, at: 4.8, dur: 2.7, color: '#FF3B30', size: 170},
      ],
    },
    {
      kind: 'vo', from: 19.1, to: 22.6,
      clip: {label: 'Both cars from behind, cables to the vault'},
      overlays: [
        {type: 'arrow', x1: 50, y1: 85, x2: 25, y2: 30, at: 1.8, dur: 1.7, label: '2.5 T', color: '#FFD60A'},
        {type: 'arrow', x1: 50, y1: 85, x2: 75, y2: 30, at: 1.9, dur: 1.6, label: '2.5 T', color: '#FFD60A'},
      ],
    },
    {
      kind: 'vo', from: 22.6, to: 26.9,
      clip: {label: 'Rear tires spinning on asphalt', zoom: 0.08},
      overlays: [{type: 'arrow', x1: 20, y1: 20, x2: 50, y2: 60, at: 2.8, dur: 1.5, label: 'grip', color: '#FF3B30'}],
    },
    {
      kind: 'vo', from: 26.9, to: 34.6,
      clip: {label: 'Charger, side shot'},
      overlays: [
        {type: 'pop', text: '900 KG', x: 50, y: 28, at: 1.5, dur: 2.5, color: '#FFD60A', size: 150},
        {type: 'pop', text: '< 1 TON', x: 50, y: 28, at: 5.9, dur: 1.8, color: '#FF3B30', size: 170},
      ],
    },
    {
      kind: 'vo', from: 34.6, to: 38.5,
      clip: {label: 'Chase, both cars'},
      overlays: [{type: 'versus', left: '0.9 T', leftSub: 'grip per car', right: '2.5 T', rightSub: 'needed per car', at: 0.5, dur: 3.4}],
    },
    {
      kind: 'vo', from: 38.5, to: 43.5,
      clip: {label: 'Tire smoke / burnout'},
      overlays: [
        {type: 'meme', emoji: '💨', at: 0.2, dur: 1.1},
        {type: 'stamp', text: 'WHEELSPIN', good: false, at: 3.0, dur: 2},
      ],
    },
    {
      kind: 'vo', from: 43.5, to: 51.3,
      clip: {label: 'Chase at full speed through Rio'},
      overlays: [{type: 'versus', left: '900', leftSub: 'HP they have', right: '1,800', rightSub: 'HP needed', at: 3.6, dur: 4.2}],
    },
    {
      kind: 'vo', from: 51.3, to: 59.4,
      clip: {label: 'Vault smashing police cars'},
      overlays: [{type: 'stamp', text: 'ACCURATE', good: true, at: 6.5, dur: 1.6}],
    },
    {kind: 'movie', dur: 3, clip: {label: 'Vault swinging into cars, crash (movie audio)'}},
    {
      kind: 'vo', from: 59.4, to: 64.0,
      clip: {label: 'Dom driving, intense'},
      overlays: [{type: 'meme', emoji: '🫡', at: 2.2, dur: 1.6}],
    },
  ],
};
