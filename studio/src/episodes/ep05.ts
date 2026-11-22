import {Episode} from '../template/types';
import words from './ep05.words.json';

// EP05 v3 (approved; breath-trimmed take, subscribe line cut — ends on 'escorting you') — Jurassic Park T. rex vs. Jeep. Script: episodes/05-jurassicpark-trex/script.md
// play = movie with its own audio · pause = click + freeze + VO · vo = VO narrated over moving (muted) footage.
// Clips not cut yet: placeholders until `file`/`start` are filled in.

export const ep05: Episode = {
  id: 'ep05',
  title: ['Physics Nerd reacts to', 'Jurassic Park'],
  voiceover: 'ep05/vo.mp3',
  words,
  captionFixes: {jeep: 'Jeep', T: 'T.', '-Rex?': 'rex?', 'T-Rex?': 'T. rex?'},
  beats: [
    {kind: 'play', dur: 3.5, clip: {label: '~1:06:00 rex smashes out of the trees, chase begins'}},
    {kind: 'pause', from: 0, to: 2.98, clip: {label: 'Freeze: rex mid-roar behind the Jeep', zoom: 0.08}},
    {
      kind: 'vo', from: 3.25, to: 15.7,
      clip: {label: 'Rex running, legs pumping (muted)'},
      overlays: [
        {type: 'pop', text: '~6 TONS', x: 50, y: 28, at: '6', dur: 1.8, color: '#FFD60A', size: 160},
        {type: 'pop', text: '86% LEG MUSCLE', x: 50, y: 28, at: '86', dur: 2.6, color: '#FF3B30', size: 110},
        {type: 'versus', left: '20%', leftSub: 'chicken', right: '86%', rightSub: 'T. rex (to run)', at: 'chicken', dur: 1.6},
      ],
    },
    {
      kind: 'pause', from: 15.8, to: 19.15,
      clip: {label: 'Freeze: rex legs mid-stride', zoom: 0.08},
      overlays: [{type: 'meme', emoji: '🍗', at: 'legs', dur: 1.4}],
    },
    {kind: 'play', dur: 3.0, clip: {label: 'Malcolm: "Must go faster."'}},
    {
      kind: 'vo', from: 19.42, to: 26.15,
      clip: {label: 'Rex gaining, Jeep bouncing (muted)'},
      overlays: [
        {type: 'pop', text: '~28 KM/H', x: 50, y: 28, at: '28', dur: 2.2, color: '#FFD60A', size: 170},
        {type: 'sfx', name: 'boom', at: 'snap'},
      ],
    },
    {
      kind: 'pause', from: 26.4, to: 30.85,
      clip: {label: 'Freeze: Muldoon at the wheel', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '×2', x: 50, y: 30, at: 'double', dur: 1.2, color: '#34C759', size: 200},
        {type: 'meme', emoji: '🚲', at: 'bicycle', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {label: 'Mirror shot: rex lunges, roar'}},
    {
      kind: 'pause', from: 31.15, to: 36.9,
      clip: {label: 'Freeze: mirror + "OBJECTS IN MIRROR..." sticker', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'CONVEX', x: 50, y: 25, at: 'convex', dur: 1.8, color: '#FFD60A', size: 150},
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'closer', dur: 1.6},
      ],
    },
    {
      kind: 'pause', from: 37.08, to: 41.32,
      clip: {label: 'Freeze: Malcolm looking back', zoom: 0.08},
      overlays: [
        {type: 'sfx', name: 'boom', at: 'escorting'},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {label: 'Jeep speeding off'}},
  ],
};
