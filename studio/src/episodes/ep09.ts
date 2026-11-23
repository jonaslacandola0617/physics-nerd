import {Episode} from '../template/types';
import words from './ep09.words.json';

// EP09 — John Wick: Chapter 4: the bulletproof suit. Script: episodes/physics_nerd_scripts_ep06_to_ep10.md (approved hook).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/09-johnwick-suit/cut_clips.py (Osaka Continental fight). Footage check: he throws the jacket up as a
// shield; the attackers are armored gunmen with assault rifles (soft armor wouldn't stop those either).

const C = (name: string) => `ep09/clips/${name}.mp4`;

export const ep09: Episode = {
  id: 'ep09',
  title: ['Physics Nerd reacts to', 'John Wick: Chapter 4'],
  voiceover: 'ep09/vo.mp3',
  words,
  captionFixes: {'back-face': 'backface'},
  beats: [
    {kind: 'play', dur: 2.6, clip: {file: C('05-rifles'), start: 0, label: 'Gunmen open fire'}},
    {
      kind: 'pause', from: 0, to: 6.3,
      clip: {file: C('01-shield'), start: 0.4, label: 'Freeze: jacket up as a shield', zoom: 0.08},
      overlays: [{type: 'meme', emoji: '🛡️', at: 'shield', dur: 1.4}],
    },
    {
      kind: 'vo', from: 6.3, to: 16.5,
      clip: {file: C('02-fight'), start: 0, label: 'Advancing behind the jacket'},
      overlays: [{type: 'stamp', text: 'KEVLAR SUITS: REAL', good: true, at: 'real', dur: 1.6}],
    },
    {
      kind: 'vo', from: 16.5, to: 25.79,
      clip: {file: C('03-fight2'), start: 0, label: 'The fight'},
      overlays: [{type: 'pop', text: 'THE IMPACT GOES SOMEWHERE', x: 50, y: 26, at: 'impact', dur: 2.2, color: '#FFD60A', size: 90}],
    },
    {
      kind: 'pause', from: 25.79, to: 35.46,
      clip: {file: C('04-floor'), start: 2.0, label: 'Freeze: Wick down on the glass', zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'BACKFACE DEFORMATION', x: 50, y: 26, at: 'deformation', dur: 2.2, color: '#FF3B30', size: 100},
        {type: 'meme', emoji: '⚾', at: 'baseball', dur: 1.6},
      ],
    },
    {kind: 'play', dur: 2.4, clip: {file: C('05-rifles'), start: 0.2, label: 'Rifles'}},
    {
      kind: 'vo', from: 35.46, to: 44.23,
      clip: {file: C('06-drum'), start: 0, label: 'Still fighting'},
      overlays: [{type: 'stamp', text: 'CRACKED RIBS', good: false, at: 'ribs', dur: 1.4}],
    },
    {
      kind: 'pause', from: 44.23, to: 53.5,
      clip: {file: C('07-calm'), start: 2.0, label: 'Freeze: Wick, unbothered', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'SUIT: REAL', good: true, at: 'suit', dur: 1.4},
        {type: 'stamp', text: 'RIBS: BRUISED', good: false, at: 'baseball', dur: 1.4},
        {type: 'sfx', name: 'boom', at: 'magic'},
      ],
    },
    {kind: 'play', dur: 2.2, clip: {file: C('07-calm'), start: 5.0, label: 'Wick'}},
  ],
};
