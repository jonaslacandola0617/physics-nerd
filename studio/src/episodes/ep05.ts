import {Episode} from '../template/types';
import words from './ep05.words.json';

// EP05 v2 — Jurassic Park T. rex vs. Jeep, reaction format. Script: episodes/05-jurassicpark-trex/script.md
// Clips not cut yet: each clip shows a placeholder until `file`/`start` are filled in.

export const ep05: Episode = {
  id: 'ep05',
  title: ['Physics Nerd reacts to', 'Jurassic Park'],
  voiceover: 'ep05/vo.mp3',
  words,
  captionFixes: {Ah: '', 'Ah,': ''},
  beats: [
    {kind: 'play', dur: 3.5, clip: {label: '~1:06:00 rex smashes out of the trees behind the Jeep'}},
    {kind: 'pause', from: 0, to: 5.3, clip: {label: 'Freeze: rex mid-roar behind the Jeep', zoom: 0.08}},
    {kind: 'play', dur: 5.0, clip: {label: '~1:06:05 "Must go faster" — rex gaining'}},
    {
      kind: 'pause', from: 6.46, to: 12.7,
      clip: {label: 'Freeze: rex mid-stride, legs in frame', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '80% LEG MUSCLE?', x: 50, y: 30, at: '80', dur: 2.6, color: '#FFD60A', size: 110},
        {type: 'meme', emoji: '🍗', at: 'drumsticks', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:06:15 rex alongside, Jeep bouncing down the road'}},
    {
      kind: 'pause', from: 13.66, to: 24.45,
      clip: {label: 'Freeze: Muldoon at the wheel', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '~30 KM/H', x: 50, y: 30, at: '30', dur: 2.6, color: '#FF3B30', size: 170},
        {type: 'pop', text: '🏫 SCHOOL ZONE', x: 50, y: 30, at: 'school', dur: 1.8, color: '#FFD60A', size: 110},
        {type: 'meme', emoji: '🏃‍♂️', at: 'usain', dur: 1.6},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:06:25 the side mirror: "OBJECTS IN MIRROR..."'}},
    {
      kind: 'pause', from: 25.1, to: 34.4,
      clip: {label: 'Freeze: mirror, rex inside, sticker readable', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'CONVEX', x: 50, y: 25, at: 'convex', dur: 2.2, color: '#FFD60A', size: 150},
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'smartest', dur: 1.6},
      ],
    },
    {kind: 'play', dur: 4.5, clip: {label: '~1:06:40 Jeep pulls away, rex gives up'}},
    {
      kind: 'pause', from: 35.26, to: 40.62,
      clip: {label: 'Freeze: Malcolm looking back', zoom: 0.08},
      overlays: [{type: 'sfx', name: 'boom', at: 'escorting'}],
    },
    {kind: 'play', dur: 3.0, clip: {label: '~1:06:45 Jeep speeding off'}},
  ],
};
