import {Episode} from '../template/types';
import words from './ep16.words.json';

// EP16 — Furious 7 (2015): the Etihad Towers jumps. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/16-furious7-skyscraper/cut_clips.py. Footage checked: the car jumps tower 1 -> 2 -> 3 with Dom in it,
// "No brakes!" is said three times, Dom and Brian bail before the empty car falls out of tower 3.

const C = (name: string) => `ep16/clips/${name}.mp4`;

export const ep16: Episode = {
  id: 'ep16',
  title: ['Physics Nerd reacts to', 'Furious 7'],
  voiceover: 'ep16/vo.mp3',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('01-exit'), start: 0, label: 'Out the window of tower 1'}},
    {
      kind: 'pause', from: 0, to: 5.3,
      clip: {file: C('01-exit'), start: 0.75, label: 'Freeze: mid-air through the glass', zoom: 0.07},
      overlays: [{type: 'meme', file: 'ep16/assets/contract.jpg', emoji: '', at: 'clause', dur: 1.6}],
    },
    {
      kind: 'vo', from: 5.3, to: 15.9,
      clip: {file: C('02-rev'), start: 0, label: 'Dom revs inside the room'},
      overlays: [
        {type: 'pop', text: 'INDOOR RUNWAY: ~60 FT', x: 50, y: 24, at: '60', dur: 2.4, color: '#FFD60A', size: 100},
        {type: 'pop', text: '$3.4M LYKAN HYPERSPORT', x: 50, y: 76, at: 'million', dur: 2.2, color: '#FF3B30', size: 85},
      ],
    },
    {
      kind: 'vo', from: 15.9, to: 20.15,
      clip: {file: C('03-slowmo'), start: 0, label: 'Slow-mo between the towers'},
      overlays: [{type: 'sfx', name: 'whoosh', at: 'slow'}],
    },
    {
      kind: 'pause', from: 20.15, to: 30.0,
      clip: {file: C('04-towers'), start: 0.5, label: 'Freeze: the gap between towers', zoom: 0.05},
      overlays: [
        {type: 'arrow', x1: 52, y1: 30, x2: 80, y2: 44, at: 'crossing', dur: 4.5, label: '150 FT', color: '#FF3B30'},
        {type: 'pop', text: '100 MPH = 147 FT/S', x: 50, y: 80, at: '100', dur: 2.2, color: '#FFD60A', size: 95},
        {type: 'pop', text: 'DROPS 16 FT IN 1 SEC', x: 50, y: 80, at: 'drops', dur: 2.4, color: '#FF3B30', size: 100},
      ],
    },
    {
      kind: 'pause', from: 30.0, to: 36.2,
      clip: {file: C('06-crash'), start: 0.55, label: 'Freeze: smashing into tower 2', zoom: 0.07},
      overlays: [
        {type: 'pop', text: '≈ 1½ FLOORS LOWER', x: 50, y: 24, at: 'half', dur: 2.2, color: '#FF3B30', size: 100},
        {type: 'meme', file: 'ep16/assets/toilet.jpg', emoji: '', at: 'someone', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('06-crash'), start: 0, label: 'Into tower 2, then tower 3'}},
    {
      kind: 'vo', from: 36.2, to: 43.05,
      clip: {file: C('07-gallery'), start: 0, label: 'Plowing through the tower 3 gallery'},
      overlays: [{type: 'pop', text: 'LAMINATED SAFETY GLASS', x: 50, y: 24, at: 'laminated', dur: 2.4, color: '#FFD60A', size: 90}],
    },
    {
      kind: 'pause', from: 43.05, to: 47.9,
      clip: {file: C('08-dom'), start: 0.5, label: 'Freeze: Dom on the broken glass', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'NO BRAKES · NO GRAVITY · JUST FAMILY', x: 50, y: 22, at: 'twice', dur: 2.6, color: '#FF3B30', size: 75},
        {type: 'stamp', text: 'GRAVITY: SCARED', good: false, at: 'gravity', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'scared'},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('09-fall'), start: 0, label: 'Empty car out of tower 3'}},
  ],
};
