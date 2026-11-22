import {Episode} from '../template/types';
import words from './ep06.words.json';

// EP06 — Iron Man: the tank shot. Script: episodes/physics_nerd_scripts_ep06_to_ep10.md (v3.1).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/06-ironman-tank/cut_clips.py. Footage check: hit mid-air by the tank at 1:18:35,
// lands in rubble (a furrow in a village street rather than open desert), stands, fires the wrist missile.

const C = (name: string) => `ep06/clips/${name}.mp4`;

export const ep06: Episode = {
  id: 'ep06',
  title: ['Physics Nerd reacts to', 'Iron Man'],
  voiceover: 'ep06/vo.mp3',
  words,
  captionFixes: {Gs: "G's", 'Gs.': "G's.", 'sci-fi': 'sci-fi'},
  beats: [
    // 1. movie open: tank shot
    {kind: 'play', dur: 3.2, clip: {file: C('01-fly-tank'), start: 2.6, label: 'Hit mid-air, the tank firing'}},
    // 2. hook on a freeze
    {
      kind: 'pause', from: 0, to: 6.45,
      clip: {file: C('03-helmet'), start: 2.4, label: 'Freeze: helmet in the dirt, eyes lit', zoom: 0.07},
    },
    // 3. it's not the tank round
    {
      kind: 'vo', from: 6.45, to: 13.48,
      clip: {file: C('01-fly-tank'), start: 0, label: 'Flying low, hit, tank firing'},
      overlays: [{type: 'stamp', text: 'THE LANDING', good: false, at: 'landing', dur: 1.2}],
    },
    // 4. the landing
    {
      kind: 'vo', from: 13.48, to: 19.18,
      clip: {file: C('02-impact'), start: 0, label: 'Dust clears, Tony in the rubble'},
      overlays: [
        {type: 'pop', text: '~100 MPH → 0 IN 3 FT', x: 50, y: 28, at: 'stopping', dur: 2.0, color: '#FFD60A', size: 100},
        {type: 'pop', text: '~100 G', x: 50, y: 45, at: '100#2', dur: 1.8, color: '#FF3B30', size: 200},
      ],
    },
    // 5. crumple zones
    {
      kind: 'vo', from: 19.18, to: 23.9,
      clip: {file: C('07-landing'), start: 0, label: 'Iron Man landing in Gulmira'},
      overlays: [{type: 'stamp', text: 'CARS CRUMPLE', good: true, at: 'crumpled', dur: 1.2}],
    },
    // 6. punchline on a freeze
    {
      kind: 'pause', from: 23.9, to: 32.49,
      clip: {file: C('03-helmet'), start: 2.9, label: 'Freeze: rigid helmet', zoom: 0.08},
      overlays: [
        {type: 'stamp', text: 'NO CRUMPLE ZONE', good: false, at: 'rigid', dur: 1.6},
        {type: 'meme', file: 'ep06/assets/egg-can.jpg', emoji: '', at: 'egg', dur: 1.6},
      ],
    },
    // 7. movie burst: stands up, wrist missile
    {kind: 'play', dur: 3.0, clip: {file: C('04-stand-missile'), start: 4.6, label: 'Fires the wrist missile'}},
    // 8. to be fair
    {
      kind: 'vo', from: 32.49, to: 38.65,
      clip: {file: C('05-walkaway'), start: 0, label: 'Walking away as the tank explodes'},
      overlays: [{type: 'stamp', text: 'ARMOR: FINE', good: true, at: 'spotless', dur: 1.4}],
    },
    // 9. closer on a freeze
    {
      kind: 'pause', from: 38.65, to: 46.0,
      clip: {file: C('05-walkaway'), start: 3.6, label: 'Freeze: walk-away, explosion behind', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'SUIT: 10/10', x: 50, y: 24, at: 'suit', dur: 1.8, color: '#34C759', size: 130},
        {type: 'stamp', text: 'TONY: CONCUSSED', good: false, at: 'mess', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'tidy'},
      ],
    },
    // 10. end on the movie
    {kind: 'play', dur: 2.2, clip: {file: C('06-flyoff'), start: 1.2, label: 'Lifts off'}},
  ],
};
