import {Episode} from '../template/types';
import words from './ep07.words.json';

// EP07 — Top Gun: Maverick: surviving the Mach 10 breakup. Script: episodes/physics_nerd_scripts_ep06_to_ep10.md (v3.1).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/07-topgun-mach10/cut_clips.py. Footage check: gauge reads 10.3, the jet breaks up (fireball, then a
// streak across the dawn sky), he wears a full pressure suit, "Where am I?" in the diner.

const C = (name: string) => `ep07/clips/${name}.mp4`;

export const ep07: Episode = {
  id: 'ep07',
  title: ['Physics Nerd reacts to', 'Top Gun: Maverick'],
  voiceover: 'ep07/vo.mp3',
  words,
  captionFixes: {speeds: 'speed'},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('01-breakup'), start: 0, label: 'Mach 10.3, the jet breaks up'}},
    {
      kind: 'pause', from: 0, to: 9.01,
      clip: {file: C('06-diner'), start: 3.0, label: 'Freeze: Maverick drinking water', zoom: 0.07},
      overlays: [{type: 'meme', file: 'ep07/assets/glass-of-water.jpg', emoji: '', at: 'diner', dur: 1.4}],
    },
    {
      kind: 'vo', from: 9.01, to: 15.94,
      clip: {file: C('02-darkstar'), start: 0, label: 'Darkstar at the edge of space'},
      overlays: [{type: 'pop', text: 'MACH 10 ≈ 6,600 MPH', x: 50, y: 28, at: '6', dur: 2.4, color: '#FF3B30', size: 110}],
    },
    {
      kind: 'pause', from: 15.94, to: 26.37,
      clip: {file: C('01-breakup'), start: 0.05, label: 'Freeze: gauge at 10.3', zoom: 0.07},
      overlays: [
        {type: 'versus', left: 'MACH 3.2', leftSub: 'SR-71 record (1966)', right: 'MACH 10.3', rightSub: 'Darkstar', at: 'fastest', dur: 3.2},
        {type: 'stamp', text: "CREWMATE DIDN'T SURVIVE", good: false, at: 'lived', dur: 1.6},
      ],
    },
    {
      kind: 'vo', from: 26.37, to: 37.44,
      clip: {file: C('03-speed'), start: 0, label: 'Climbing, alarms, breakup'},
      overlays: [{type: 'pop', text: '~10× WIND BLAST', x: 50, y: 28, at: '10', dur: 2.2, color: '#FF3B30', size: 130}],
    },
    {kind: 'play', dur: 2.6, clip: {file: C('04-streak'), start: 0.4, label: 'Fireball across the sky'}},
    {
      kind: 'vo', from: 37.44, to: 45.88,
      clip: {file: C('05-suit'), start: 0, label: 'Pressure-suit helmet'},
      overlays: [{type: 'stamp', text: 'PRESSURE SUIT', good: true, at: 'pressure', dur: 1.6}],
    },
    {kind: 'play', dur: 3.5, clip: {file: C('06-diner'), start: 8.2, label: '"Where am I?"'}},
    {
      kind: 'pause', from: 45.88, to: 54.1,
      clip: {file: C('06-diner'), start: 3.0, label: 'Freeze: Maverick at the counter', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'TOM CRUISE > AERODYNAMICS', x: 50, y: 24, at: 'grounded', dur: 2.6, color: '#FFD60A', size: 90},
        {type: 'sfx', name: 'boom', at: 'skeleton'},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('06-diner'), start: 11.5, label: 'The kid staring'}},
  ],
};
