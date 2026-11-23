import {Episode} from '../template/types';
import words from './ep10.words.json';

// EP10 v4 — Ant-Man: the flying ant (approved rewrite). Script: episodes/physics_nerd_scripts_ep06_to_ep10.md
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/10-antman-ant/cut_clips.py (HDR tone-mapped). Punch check: tiny Scott decks Falcon at 1:04:27.

const C = (name: string) => `ep10/clips/${name}.mp4`;

export const ep10: Episode = {
  id: 'ep10',
  title: ['Physics Nerd reacts to', 'Ant-Man'],
  voiceover: 'ep10/vo.mp3',
  words,
  captionFixes: {particles: 'Particles', Tiny: 'tiny', 'full-sized': 'full-size'},
  beats: [
    // 1. movie open
    {kind: 'play', dur: 2.8, clip: {file: C('01-ride-close'), start: 0, label: 'Scott on the flying ant'}},
    // 2. hook on a freeze
    {
      kind: 'pause', from: 0, to: 6.65,
      clip: {file: C('01-ride-close'), start: 2.2, label: 'Freeze: Scott riding the ant', zoom: 0.07},
      overlays: [{type: 'meme', file: 'ep10/assets/motorcycle.jpg', emoji: '', at: 'motorcycle', dur: 1.4}],
    },
    // 3. the movie's own rule
    {
      kind: 'vo', from: 6.65, to: 15.84,
      clip: {file: C('03-hank'), start: 0, label: 'Hank explains atomic distance'},
      overlays: [{type: 'pop', text: 'SAME ATOMS = SAME MASS', x: 50, y: 28, at: 'same', dur: 2.2, color: '#FFD60A', size: 100}],
    },
    {
      kind: 'pause', from: 15.84, to: 19.72,
      clip: {file: C('02-ride-helmet'), start: 4.0, label: 'Freeze: Scott in the helmet', zoom: 0.07},
      overlays: [{type: 'pop', text: '~200 LB', x: 50, y: 28, at: '200', dur: 2.2, color: '#FF3B30', size: 190}],
    },
    // 4. Hank's 50x
    {
      kind: 'vo', from: 19.72, to: 26.55,
      clip: {file: C('04-sugar'), start: 0, label: 'Sugar cubes, ants in formation'},
      overlays: [
        {type: 'pop', text: "50× (HANK'S NUMBER)", x: 50, y: 28, at: '50', dur: 2.0, color: '#34C759', size: 110},
        {type: 'meme', file: 'ep10/assets/grain-of-rice.jpg', emoji: '', at: 'grain', dur: 1.4},
      ],
    },
    // 5. punchline on a freeze
    {
      kind: 'pause', from: 26.55, to: 32.47,
      clip: {file: C('01-ride-close'), start: 2.6, label: 'Freeze: the ant carrying Scott', zoom: 0.08},
      overlays: [{type: 'pop', text: '~3,000,000×', x: 50, y: 40, at: '3', dur: 2.4, color: '#FF3B30', size: 170}],
    },
    // 6. movie burst
    {kind: 'play', dur: 2.5, clip: {file: C('05-ride-night'), start: 0, label: 'Night ride past the cars'}},
    // 7. to be fair: the punch
    {
      kind: 'vo', from: 32.47, to: 41.9,
      clip: {file: C('06-punch'), start: 0, label: 'Tiny Scott decks Falcon'},
      overlays: [{type: 'stamp', text: 'RULE USED', good: true, at: 'punch', dur: 1.6}],
    },
    // 8. closer on a freeze
    {
      kind: 'pause', from: 41.9, to: 47.5,
      clip: {file: C('02-ride-helmet'), start: 5.5, label: 'Freeze: Scott riding', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'ANT > AVENGERS', x: 50, y: 26, at: 'avengers', dur: 1.6, color: '#FFD60A', size: 140},
        {type: 'sfx', name: 'boom', at: 'avengers'},
      ],
    },
    // 9. end on the movie
    {kind: 'play', dur: 2.2, clip: {file: C('07-ride-sky'), start: 0.6, label: 'POV on the ant'}},
  ],
};
