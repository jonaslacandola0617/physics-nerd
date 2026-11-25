import {Episode} from '../template/types';
import words from './ep35.words.json';

// EP35 — Die Hard 2 (1990): lighting the jet-fuel trail. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/35-diehard2-fuel/cut_clips.py. Footage checked: McClane in the snowstorm flicks his Zippo, drops it in the
// leaked fuel, the flame races along the trail, the 747 accelerating blows up.

const C = (name: string) => `ep35/clips/${name}.mp4`;

export const ep35: Episode = {
  id: 'ep35',
  title: ['Physics Nerd reacts to', 'Die Hard 2'],
  voiceover: 'ep35/vo.wav',
  words,
  captionFixes: {'90s': "'90s", flashpoint: 'flash point', 'lid-zippo': 'lit Zippo', coal: 'cold', 'Valverde,': 'Val Verde,', McLean: 'McClane'},
  beats: [
    {kind: 'play', dur: 3.0, clip: {file: C('01-trail'), start: 3.0, label: 'The flame catches the 747'}},
    {
      kind: 'pause', from: 0, to: 8.1,
      clip: {file: C('02-race'), start: 1.5, label: 'Freeze: a flame outrunning a jumbo jet', zoom: 0.05},
      overlays: [{type: 'stamp', text: 'CHEMISTRY FAN FICTION', good: false, at: 'chemistry', dur: 1.6}],
    },
    {
      kind: 'vo', from: 8.1, to: 18.70,
      clip: {file: C('03-zippo'), start: 0, label: 'McClane flicks the Zippo in the snow'},
      overlays: [
        {type: 'pop', text: 'JET FUEL = REFINED KEROSENE', x: 50, y: 22, at: 'kerosene', dur: 2.4, color: '#FFD60A', size: 90},
        {type: 'pop', text: 'FLASH POINT: ~100°F (38°C)', x: 50, y: 78, at: 'flashpoint', dur: 2.6, color: '#FF3B30', size: 90},
      ],
    },
    {
      kind: 'pause', from: 18.70, to: 29.4,
      clip: {file: C('04-snow'), start: 1.0, label: 'Freeze: the frozen runway', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'FREEZING = ALMOST NO VAPOR', x: 50, y: 22, at: 'vapor', dur: 2.4, color: '#0A84FF', size: 90},
        {type: 'meme', file: 'ep35/assets/match-in-water.jpg', emoji: '', at: 'dropped', dur: 1.2},
      ],
    },
    {
      kind: 'pause', from: 29.4, to: 43.1,
      clip: {file: C('05-plane'), start: 3.5, label: 'Freeze: the 747 at takeoff speed', zoom: 0.05},
      overlays: [
        {type: 'versus', left: '~5 MPH', leftSub: 'flame across a puddle', right: '150+ MPH', rightSub: '747 at takeoff', at: 'crawls', dur: 4.0},
        {type: 'meme', file: 'ep35/assets/snail.jpg', emoji: '', at: 'zero', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 3.0, clip: {file: C('06-boom'), start: 3.0, label: 'The fireball'}},
    {
      kind: 'pause', from: 43.1, to: 50.4,
      clip: {file: C('07-mcclane'), start: 1.5, label: 'Freeze: McClane in the snow', zoom: 0.05},
      overlays: [
        {type: 'meme', file: 'ep35/assets/plane-island.jpg', emoji: '', at: 'Valverde', dur: 1.3},
        {type: 'stamp', text: 'LIGHTER: WON\'T WORK', good: false, at: 'why', dur: 1.5},
        {type: 'sfx', name: 'boom', at: 'work'},
      ],
    },
  ],
};
