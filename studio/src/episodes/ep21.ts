import {Episode} from '../template/types';
import words from './ep21.words.json';

// EP21 — Indiana Jones and the Kingdom of the Crystal Skull (2008): nuking the fridge. Script:
// episodes/physics_nerd_scripts_ep16_to_ep25.md. Voice: Google Vids take, breath-trimmed + roomified.
// Clips: episodes/21-indy4-fridge/cut_clips.py (English = audio track 1). Footage: Indy climbs into a "LEAD LINED" fridge,
// the blast throws it over the speeding car, it slams down and tumbles, Indy crawls out and faces the mushroom cloud.

const C = (name: string) => `ep21/clips/${name}.mp4`;

export const ep21: Episode = {
  id: 'ep21',
  title: ['Physics Nerd reacts to', 'Indiana Jones'],
  voiceover: 'ep21/vo.mp3',
  words,
  captionFixes: {"archaeologist's": 'archaeologist', g: 'G'},
  beats: [
    {kind: 'play', dur: 2.5, clip: {file: C('01-launch'), start: 1.5, label: 'The fridge flies past the car'}},
    {
      kind: 'pause', from: 0, to: 7.2,
      clip: {file: C('01-launch'), start: 3.5, label: 'Freeze: fridge over the car', zoom: 0.06},
      overlays: [
        {type: 'meme', emoji: '🍄‍🟫☁️', at: 'mushroom', dur: 1.3},
        {type: 'meme', emoji: '🧊', at: 'appliance', dur: 1.2},
      ],
    },
    {
      kind: 'vo', from: 7.2, to: 15.75,
      clip: {file: C('02-fridge'), start: 0, label: 'Indy shuts himself in the lead-lined fridge'},
      overlays: [{type: 'stamp', text: 'RADIATION: PARTLY BLOCKED', good: true, at: 'block', dur: 1.6}],
    },
    {
      kind: 'vo', from: 15.75, to: 29.25,
      clip: {file: C('03-blast'), start: 0, label: 'The blast throws the fridge past the car'},
      overlays: [
        {type: 'pop', text: 'INSTANT LAUNCH: 100+ G', x: 50, y: 24, at: 'zero', dur: 2.8, color: '#FF3B30', size: 100},
      ],
    },
    {
      kind: 'pause', from: 29.25, to: 37.35,
      clip: {file: C('02-fridge'), start: 5.3, label: 'Freeze: LEAD LINED', zoom: 0.05},
      overlays: [
        {type: 'pop', text: 'UNPADDED METAL BOX', x: 50, y: 24, at: 'unpadded', dur: 2.2, color: '#FFD60A', size: 100},
        {type: 'meme', emoji: '🥤', at: 'smoothie', dur: 1.3},
      ],
    },
    {kind: 'play', dur: 3.7, clip: {file: C('04-tumble'), start: 0, label: 'Slam, tumble, Indy rolls out'}},
    {
      kind: 'pause', from: 37.35, to: 46.0,
      clip: {file: C('05-cloud'), start: 3.0, label: 'Freeze: Indy vs the mushroom cloud', zoom: 0.06},
      overlays: [
        {type: 'meme', emoji: '🧱🌀', at: 'dryer', dur: 1.3},
        {type: 'meme', emoji: '🤠', at: 'fedora', dur: 1.2},
        {type: 'stamp', text: 'BUILT DIFFERENT', good: true, at: 'Clearly', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'used'},
      ],
    },
  ],
};
