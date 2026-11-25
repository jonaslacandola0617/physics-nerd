import {Episode} from '../template/types';
import words from './ep29.words.json';

// EP29 — F9 (2021): the Pontiac Fiero in orbit. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/29-f9-space/cut_clips.py. Footage checked: the rocket-strapped Fiero over Earth, Roman in a diving
// helmet, the car smashes through the satellite. (The ground launch isn't in this cut of the film's sequence.)

const C = (name: string) => `ep29/clips/${name}.mp4`;

export const ep29: Episode = {
  id: 'ep29',
  title: ['Physics Nerd reacts to', 'F9'],
  voiceover: 'ep29/vo.wav',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('01-boost'), start: 0, label: 'The Fiero, rocket firing, in orbit'}},
    {
      kind: 'pause', from: 0, to: 7.7,
      clip: {file: C('01-boost'), start: 2.0, label: 'Freeze: a duct-taped 1980s Pontiac in space', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'NASA BUDGET: BILLIONS', x: 50, y: 22, at: 'billions', dur: 2.0, color: '#FFD60A', size: 100},
        {type: 'meme', emoji: '🚗🦆', at: 'duct', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 7.7, to: 22.04,
      clip: {file: C('03-space'), start: 0, label: 'In orbit'},
      overlays: [
        {type: 'pop', text: 'ORBIT: ~17,500 MPH SIDEWAYS', x: 50, y: 22, at: 'sideways', dur: 3.0, color: '#FFD60A', size: 85},
        {type: 'pop', text: 'REAL ROCKETS: ~90% FUEL', x: 50, y: 78, at: 'rockets', dur: 3.0, color: '#FF3B30', size: 90},
      ],
    },
    {
      kind: 'pause', from: 22.04, to: 28.6,
      clip: {file: C('01-boost'), start: 2.4, label: 'Freeze: the little roof rocket', zoom: 0.06},
      overlays: [{type: 'meme', emoji: '☁️', at: 'cloud', dur: 1.2}],
    },
    {
      kind: 'pause', from: 28.6, to: 37.29,
      clip: {file: C('05-helmet'), start: 2.0, label: 'Freeze: Roman in the cabin', zoom: 0.05},
      overlays: [{type: 'pop', text: 'CABIN AIR: 14.7 PSI OUTWARD', x: 50, y: 22, at: '15', dur: 2.8, color: '#FFD60A', size: 85}],
    },
    {
      kind: 'pause', from: 37.29, to: 45.65,
      clip: {file: C('02-float'), start: 1.0, label: 'Freeze: the taped-up car body', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'WINDSHIELD ALONE: ~17 TONS', x: 50, y: 22, at: 'windshield', dur: 2.6, color: '#FF3B30', size: 90},
        {type: 'meme', emoji: '🥤💥', at: 'shaken', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('06-smash'), start: 0.5, label: 'Straight through the satellite'}},
    {
      kind: 'pause', from: 45.65, to: 51.5,
      clip: {file: C('05-helmet'), start: 0.5, label: 'Freeze: Roman, diving helmet on', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'PHYSICS TEXTBOOKS: AVOIDED', good: false, at: 'textbooks', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'textbooks'},
      ],
    },
  ],
};
