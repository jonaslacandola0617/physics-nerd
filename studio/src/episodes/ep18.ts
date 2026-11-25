import {Episode} from '../template/types';
import words from './ep18.words.json';

// EP18 — Inception (2010): the van falling off the bridge. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/18-inception-van/cut_clips.py (all from the 2:03-2:17 trim: the slow-motion fall is intercut there with
// the weightless dreamers, the splash, and the crew waking underwater).

const C = (name: string) => `ep18/clips/${name}.mp4`;

export const ep18: Episode = {
  id: 'ep18',
  title: ['Physics Nerd reacts to', 'Inception'],
  voiceover: 'ep18/vo.wav',
  words,
  bedDb: -3.5, // AI Studio take at -20.0 LUFS vs the usual -16.5: movie audio + SFX down to keep the balance
  captionFixes: {freefall: 'free fall', 'freefall,': 'free fall,'},
  beats: [
    {kind: 'play', dur: 2.5, clip: {file: C('01-hang'), start: 0, label: 'The van drops past the bridge'}},
    {
      kind: 'pause', from: 0.0, to: 7.59,
      clip: {file: C('01-hang'), start: 0.1, label: 'Freeze: van over the river', zoom: 0.1},
      overlays: [
        {type: 'stamp', text: 'ZERO-G: CORRECT', good: true, at: 'gravity', dur: 1.4},
        {type: 'meme', file: 'ep18/assets/nap.jpg', emoji: '', at: 'feels', dur: 1.2},
      ],
    },
    {
      kind: 'vo', from: 7.59, to: 18.23,
      clip: {file: C('02-zerog'), start: 0, label: 'The dreamers go weightless'},
      overlays: [{type: 'pop', text: 'FREE FALL = WEIGHTLESS', x: 50, y: 24, at: 'free', dur: 2.6, color: '#34C759', size: 95}],
    },
    {
      kind: 'vo', from: 18.23, to: 24.67,
      clip: {file: C('04-fall'), start: 0, label: 'Tumbling down inside the van'},
    },
    {
      kind: 'pause', from: 24.67, to: 30.51,
      clip: {file: C('03-impact'), start: 0.6, label: 'Freeze: just before the river', zoom: 0.07},
      overlays: [
        {type: 'pop', text: '~55 FT DROP → ~40 MPH IMPACT', x: 50, y: 24, at: 'speed', dur: 2.8, color: '#FF3B30', size: 85},
        {type: 'pop', text: '= A 40 MPH CAR CRASH', x: 50, y: 78, at: 'hits', dur: 2.2, color: '#FFD60A', size: 95},
      ],
    },
    {
      kind: 'pause', from: 30.51, to: 37.26,
      clip: {file: C('03-impact'), start: 2.6, label: 'Freeze: the splash', zoom: 0.06},
      overlays: [
        {type: 'meme', file: 'ep18/assets/belly-flop.jpg', emoji: '', at: 'belly', dur: 1.4},
        {type: 'pop', text: '3-TON METAL BOX · NO AIRBAGS', x: 50, y: 24, at: 'metal', dur: 2.6, color: '#FF3B30', size: 85},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('03-impact'), start: 1.0, label: 'Splash'}},
    {
      kind: 'pause', from: 37.26, to: 46.61,
      clip: {file: C('05-wake'), start: 2.8, label: 'Freeze: Cobb unbuckling underwater', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'UNCONSCIOUS = ZERO BRACING', x: 50, y: 24, at: 'unconscious', dur: 2.6, color: '#FFD60A', size: 90},
        {type: 'meme', file: 'ep18/assets/ambulance.jpg', emoji: '', at: 'squad', dur: 1.3},
        {type: 'sfx', name: 'boom', at: 'ambulance'},
      ],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('05-wake'), start: 0, label: 'Waking up underwater'}},
  ],
};
