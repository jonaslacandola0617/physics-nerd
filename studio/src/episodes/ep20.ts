import {Episode} from '../template/types';
import words from './ep20.words.json';

// EP20 — Interstellar (2014): the giant wave on Miller's planet. Script: episodes/physics_nerd_scripts_ep16_to_ep25.md.
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/20-interstellar-wave/cut_clips.py. Footage: "Those aren't mountains, they're waves", the Ranger riding up
// the wave face, tumbling off the back, water draining from the flooded engines.

const C = (name: string) => `ep20/clips/${name}.mp4`;

export const ep20: Episode = {
  id: 'ep20',
  title: ['Physics Nerd reacts to', 'Interstellar'],
  voiceover: 'ep20/vo.mp3',
  words,
  captionFixes: {ranger: 'Ranger'},
  beats: [
    {kind: 'play', dur: 3.5, clip: {file: C('02-wall'), start: 7.5, label: 'The Ranger tipped up the face of the giant wave'}},
    {
      kind: 'pause', from: 0, to: 7.75,
      clip: {file: C('02-wall'), start: 1.0, label: 'Freeze: the Ranger on the wall of water', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '1 HOUR = 7 YEARS', x: 50, y: 24, at: 'hour', dur: 2.2, color: '#FFD60A', size: 100},
        {type: 'meme', file: 'ep20/assets/everest.jpg', emoji: '', at: 'suddenly', dur: 1.3},
      ],
    },
    {
      kind: 'vo', from: 7.75, to: 20.0,
      clip: {file: C('03-rolling'), start: 0, label: 'The wave rolls across the shallow ocean'},
      overlays: [
        {type: 'pop', text: 'KIP THORNE · NOBEL PRIZE', x: 50, y: 24, at: 'Kip', dur: 2.2, color: '#34C759', size: 95},
        {type: 'pop', text: '1.3× EARTH GRAVITY · ~4,000 FT WAVE', x: 50, y: 78, at: 'tidal', dur: 2.6, color: '#FFD60A', size: 80},
      ],
    },
    {
      kind: 'vo', from: 20.0, to: 33.72,
      clip: {file: C('04-lift'), start: 0, label: 'The Ranger gets lifted up the face'},
      overlays: [{type: 'pop', text: 'BOTTOM PRESSURE: ~2,300 PSI', x: 50, y: 24, at: 'pressure', dur: 3.0, color: '#FF3B30', size: 90}],
    },
    {
      kind: 'pause', from: 33.72, to: 40.7,
      clip: {file: C('02-wall'), start: 8.5, label: 'Freeze: the Ranger on the wave face', zoom: 0.06},
      overlays: [{type: 'versus', left: '1 ATM', leftSub: 'built to hold inside', right: '~157 ATM', rightSub: 'bottom of the wave', at: 'Spaceships', dur: 5.0}],
    },
    {
      kind: 'pause', from: 40.7, to: 46.85,
      clip: {file: C('03-rolling'), start: 14.0, label: 'Freeze: the crest', zoom: 0.06},
      overlays: [{type: 'meme', file: 'ep20/assets/crushed-can.jpg', emoji: '', at: 'stepping', dur: 1.3}],
    },
    {kind: 'play', dur: 3.6, clip: {file: C('05-over'), start: 0, label: 'Off the back of the wave, upright'}},
    {
      kind: 'pause', from: 46.85, to: 55.8,
      clip: {file: C('06-drain'), start: 0.8, label: 'Freeze: draining the flooded engines', zoom: 0.06},
      overlays: [
        {type: 'pop', text: 'ONE BAD WAVE AWAY', x: 50, y: 24, at: 'one', dur: 2.2, color: '#FF3B30', size: 100},
        {type: 'meme', file: 'ep20/assets/pancakes.jpg', emoji: '', at: 'pancake', dur: 1.3},
        {type: 'sfx', name: 'boom', at: 'pancake'},
      ],
    },
  ],
};
