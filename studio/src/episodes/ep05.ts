import {Episode} from '../template/types';
import words from './ep05.words.json';

// EP05 v3 (approved; breath-trimmed take, subscribe line cut — ends on 'escorting you') — Jurassic Park T. rex vs. Jeep. Script: episodes/05-jurassicpark-trex/script.md
// play = movie with its own audio · pause = click + freeze + VO · vo = VO narrated over moving (muted) footage.
// Clips: episodes/05-jurassicpark-trex/cut_clips.py (movie times in comments there).

const C = (name: string) => `ep05/clips/${name}.mp4`;

export const ep05: Episode = {
  id: 'ep05',
  title: ['Physics Nerd reacts to', 'Jurassic Park'],
  voiceover: 'ep05/vo.mp3',
  words,
  captionFixes: {jeep: 'Jeep', T: 'T.', '-Rex?': 'rex?', 'T-Rex?': 'T. rex?'},
  beats: [
    {kind: 'play', dur: 3.5, clip: {file: C('01-chase-start'), start: 0, label: 'Rex emerges from the trees, chase begins'}},
    {kind: 'pause', from: 0, to: 3.24, clip: {file: C('02-rex-roar'), start: 1.0, label: 'Freeze: rex mid-roar behind the Jeep', zoom: 0.08}},
    {
      kind: 'vo', from: 3.25, to: 15.7,
      clip: {file: C('03-rex-legs'), start: 0, label: 'Rex running, legs pumping (muted)'},
      overlays: [
        {type: 'pop', text: '~6 TONS', x: 50, y: 28, at: '6', dur: 1.8, color: '#FFD60A', size: 160},
        {type: 'pop', text: '86% LEG MUSCLE', x: 50, y: 28, at: '86', dur: 2.6, color: '#FF3B30', size: 110},
        {type: 'versus', left: '20%', leftSub: 'chicken', right: '86%', rightSub: 'T. rex (to run)', at: 'chicken', dur: 1.6},
      ],
    },
    {
      kind: 'pause', from: 15.8, to: 19.20,
      clip: {file: C('03-rex-legs'), start: 3.4, label: 'Freeze: rex legs mid-stride', zoom: 0.08},
      overlays: [{type: 'meme', file: 'ep05/assets/chicken-legs.jpg', emoji: '', at: 'legs', dur: 1.4}],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('04-must-go-faster'), start: 0, label: 'Malcolm: "Must go faster."'}},
    {
      kind: 'vo', from: 19.35, to: 26.29,
      clip: {file: C('05-jeep-gaining'), start: 0, label: 'Rex gaining, Jeep bouncing (muted)'},
      overlays: [
        {type: 'pop', text: '~28 KM/H', x: 50, y: 28, at: '28', dur: 2.2, color: '#FFD60A', size: 170},
        {type: 'sfx', name: 'boom', at: 'snap'},
      ],
    },
    {
      kind: 'pause', from: 26.4, to: 31.04,
      clip: {file: C('06-muldoon'), start: 0.6, label: 'Freeze: Muldoon at the wheel', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '×2', x: 50, y: 30, at: 'double', dur: 1.2, color: '#34C759', size: 200},
        {type: 'meme', file: 'ep05/assets/bicycle.jpg', emoji: '', at: 'bicycle', dur: 1.4},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('07-mirror'), start: 0, label: 'Mirror shot: rex lunges, roar'}},
    {
      kind: 'pause', from: 31.11, to: 36.9,
      clip: {file: C('07-mirror'), start: 1.3, label: 'Freeze: mirror + "OBJECTS IN MIRROR..." sticker', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'CONVEX', x: 50, y: 25, at: 'convex', dur: 1.8, color: '#FFD60A', size: 150},
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'closer', dur: 1.6},
      ],
    },
    {
      kind: 'pause', from: 37.02, to: 41.27,
      clip: {file: C('08-malcolm'), start: 1.5, label: 'Freeze: Malcolm looking back', zoom: 0.08},
      overlays: [
        {type: 'sfx', name: 'boom', at: 'escorting'},
      ],
    },
    {kind: 'play', dur: 2.5, clip: {file: C('09-jeep-off'), start: 0, label: 'Jeep speeding off'}},
  ],
};
