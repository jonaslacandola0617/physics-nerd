import {Episode} from '../template/types';
import words from './ep30.words.json';

// EP30 — The Dark Knight (2008): Batman catches Rachel. Script: episodes/physics_nerd_scripts_ep26_to_ep35.md.
// Voice: Google AI Studio take, unedited except volume. from/to = seconds in that take.
// Clips: episodes/30-darkknight-rachel/cut_clips.py. Footage checked: the Joker throws Rachel out of the penthouse,
// Batman dives, the cape flares, they land on a TAXI (roof light visible); Batman is underneath her; the cab driver,
// sipping coffee, gets his window shattered.

const C = (name: string) => `ep30/clips/${name}.mp4`;

export const ep30: Episode = {
  id: 'ep30',
  title: ['Physics Nerd reacts to', 'The Dark Knight'],
  voiceover: 'ep30/vo.wav',
  words,
  captionFixes: {},
  beats: [
    {kind: 'play', dur: 2.7, clip: {file: C('01-catch'), start: 3.6, label: 'Cape flares, slam onto the taxi'}},
    {
      kind: 'pause', from: 0, to: 6.3,
      clip: {file: C('02-roof'), start: 2.5, label: 'Freeze: both of them fine on a flattened roof', zoom: 0.05},
      overlays: [{type: 'meme', emoji: '🚕', at: 'taxi', dur: 1.2}],
    },
    {
      kind: 'vo', from: 6.3, to: 16.7,
      clip: {file: C('03-cape'), start: 0, label: 'The fall, the cape flares'},
      overlays: [{type: 'pop', text: '120 MPH → ~40 MPH (GENEROUS)', x: 50, y: 22, at: 'cuts', dur: 3.0, color: '#34C759', size: 85}],
    },
    {
      kind: 'pause', from: 16.7, to: 26.5,
      clip: {file: C('04-impact'), start: 0.6, label: 'Freeze: onto the taxi roof', zoom: 0.06},
      overlays: [
        {type: 'pop', text: '40 MPH → 0 IN ~1 FT', x: 50, y: 22, at: 'Stopping', dur: 2.6, color: '#FFD60A', size: 100},
        {type: 'pop', text: '50+ G', x: 50, y: 78, at: '50', dur: 2.0, color: '#FF3B30', size: 140},
      ],
    },
    {
      kind: 'pause', from: 26.5, to: 38.45,
      clip: {file: C('02-roof'), start: 6.0, label: 'Freeze: Rachel on top of Batman', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'TAXI ROOF ≠ AIRBAG', x: 50, y: 22, at: 'airbag', dur: 2.2, color: '#FF3B30', size: 100},
        {type: 'meme', emoji: '🥞', at: 'pancake', dur: 1.2},
        {type: 'meme', emoji: '🫁💥', at: 'organs', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {file: C('02-roof'), start: 7.5, label: 'Catching their breath'}},
    {
      kind: 'pause', from: 38.45, to: 44.0,
      clip: {file: C('05-driver'), start: 1.5, label: 'Freeze: the cab driver, window shattered', zoom: 0.05},
      overlays: [
        {type: 'stamp', text: 'GOTHAM CONCUSSIONS: 0', good: false, at: 'concussion', dur: 1.5},
        {type: 'sfx', name: 'boom', at: 'concussion'},
      ],
    },
  ],
};
