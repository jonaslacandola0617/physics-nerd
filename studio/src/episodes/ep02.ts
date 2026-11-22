import {Episode} from '../template/types';
import words from './ep02.words.json';

// EP02 v2 — Spider-Man 2 train, reaction format. Script: episodes/02-spiderman2-train/script.md
// Clips not cut yet: each clip shows a placeholder until `file`/`start` are filled in.

export const ep02: Episode = {
  id: 'ep02',
  title: ['Physics Nerd reacts to', 'Spider-Man 2'],
  voiceover: 'ep02/vo.mp3',
  words,
  captionFixes: {'breaking': 'braking', 'Webbs.': 'webs.', 'Webbs': 'webs'},
  beats: [
    {kind: 'play', dur: 4.0, clip: {label: '~1:32:30 Spidey plants his feet on the track, sparks'}},
    {kind: 'pause', from: 0, to: 3.66, clip: {label: 'Freeze: feet throwing sparks', zoom: 0.1}},
    {kind: 'play', dur: 5.0, clip: {label: '~1:32:40 soles burn through, webs to both buildings'}},
    {
      kind: 'pause', from: 5.14, to: 13.9,
      clip: {label: 'Freeze: both arms out, webs taut', zoom: 0.06},
      overlays: [
        {type: 'arrow', x1: 40, y1: 55, x2: 10, y2: 25, at: '10', dur: 2.6, label: '10 T', color: '#FF3B30'},
        {type: 'arrow', x1: 60, y1: 55, x2: 90, y2: 25, at: 'tons', dur: 2.4, label: '10 T', color: '#FF3B30'},
        {type: 'meme', emoji: '📞', at: 'lawyer', dur: 1.0},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:33:00 straining, mask gone, crucifix pose'}},
    {
      kind: 'pause', from: 14.72, to: 22.3,
      clip: {label: "Freeze: Peter's face mid-scream", zoom: 0.08},
      overlays: [
        {type: 'pop', text: '×20 🏋️', x: 50, y: 30, at: '20', dur: 3.2, color: '#FFD60A', size: 200},
        {type: 'sfx', name: 'boom', at: 'rent'},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:33:20 train stops at the edge of the broken track'}},
    {
      kind: 'pause', from: 23.38, to: 31.1,
      clip: {label: 'Freeze: web lines stretched to the buildings', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'WEBS', good: true, at: 'fine', dur: 1.2},
        {type: 'arrow', x1: 50, y1: 15, x2: 50, y2: 55, at: 'peter', dur: 1.6, label: 'WEAK LINK', color: '#FF3B30'},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:33:30 passes out, passengers carry him overhead'}},
    {
      kind: 'pause', from: 31.86, to: 40.54,
      clip: {label: 'Freeze: Peter limp above the crowd', zoom: 0.06},
      overlays: [{type: 'pop', text: 'SUBSCRIBE', x: 50, y: 25, at: 'subscribe', dur: 2.3, color: '#FFD60A', size: 120}],
    },
    {kind: 'play', dur: 2.0, clip: {label: '~1:33:45 passengers lay him down'}},
  ],
};
