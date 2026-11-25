import {Episode} from '../template/types';
import words from './ep32.words.json';

// EP32 — Mission: Impossible – Ghost Protocol (2011): the Burj Khalifa climb. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/32-ghostprotocol-burj/cut_clips.py. Footage checked: gloves slapped onto the glass, the climb, one glove
// dies and he hangs one-handed, swinging out (peel-force beat), the rope swing back in through the window.
// Script cue changes: no sandstorm in this window (desert road + view from the top instead); no "bare-fingertip ledge"
// (he swings back in on a rope).

const C = (name: string) => `ep32/clips/${name}.mp4`;

export const ep32: Episode = {
  id: 'ep32',
  title: ['Physics Nerd reacts to', 'Ghost Protocol'],
  voiceover: 'ep32/vo.wav',
  words,
  captionFixes: {earth: 'Earth'},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('01-slap'), start: 2.2, label: 'Gloves on the glass'}},
    {
      kind: 'pause', from: 0, to: 7.9,
      clip: {file: C('02-hang'), start: 1.5, label: 'Freeze: a speck on the Burj Khalifa', zoom: 0.08},
      overlays: [{type: 'stamp', text: 'BASED ON REAL SCIENCE', good: true, at: 'real', dur: 1.5}],
    },
    {
      kind: 'vo', from: 7.9, to: 18.3,
      clip: {file: C('03-climb'), start: 0, label: 'Climbing with the gloves'},
      overlays: [
        {type: 'pop', text: 'REAL TECH: GECKO DRY ADHESION', x: 50, y: 22, at: 'Stanford', dur: 3.0, color: '#34C759', size: 80},
        {type: 'meme', emoji: '🦎', at: 'gecko', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 18.3, to: 32.8,
      clip: {file: C('04-desert'), start: 0, label: 'The Dubai desert'},
      overlays: [
        {type: 'pop', text: 'ONLY WORKS ON LAB-CLEAN GLASS', x: 50, y: 22, at: 'spotless', dur: 2.6, color: '#FFD60A', size: 80},
        {type: 'pop', text: 'DESERT DUST = NO GRIP', x: 50, y: 78, at: 'dust', dur: 2.4, color: '#FF3B30', size: 95},
      ],
    },
    {
      kind: 'pause', from: 32.8, to: 43.25,
      clip: {file: C('05-glove'), start: 4.0, label: 'Freeze: one dead glove, hanging one-handed', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'PULL DOWN: STRONG ✓', x: 50, y: 22, at: 'straight', dur: 2.0, color: '#34C759', size: 95},
        {type: 'pop', text: 'PEEL OUTWARD: POPS OFF ✗', x: 50, y: 78, at: 'peel', dur: 2.2, color: '#FF3B30', size: 90},
      ],
    },
    {kind: 'play', dur: 4.0, clip: {file: C('06-swing'), start: 4.0, label: 'Swinging back in on the rope'}},
    {
      kind: 'pause', from: 43.25, to: 52.8,
      clip: {file: C('06-swing'), start: 1.0, label: 'Freeze: Tom Cruise, actually out there', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'REAL STUNT · HIDDEN HARNESS', good: true, at: 'cable', dur: 1.8},
        {type: 'sfx', name: 'boom', at: 'gloves'},
      ],
    },
  ],
};
