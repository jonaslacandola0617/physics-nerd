import {Episode} from '../template/types';
import words from './ep04.words.json';

// EP04 v3 — Fast Five vault. Script: episodes/04-fastfive-vault/script.md (approved closer).
// Voice: Google Vids take, breath-trimmed + roomified. from/to = seconds in that take.
// Clips: episodes/04-fastfive-vault/cut_clips.py (vault confirmed sliding flat, sparks at 1:48:10).

const C = (name: string) => `ep04/clips/${name}.mp4`;

export const ep04: Episode = {
  id: 'ep04',
  title: ['Physics Nerd reacts to', 'Fast Five'],
  voiceover: 'ep04/vo.mp3',
  words,
  captionFixes: {Friction: 'Friction:', 'Friction.': 'Friction:', 'Family.': 'Family:'},
  beats: [
    // 1. movie open
    {kind: 'play', dur: 2.7, clip: {file: C('01-open'), start: 0, label: 'Vault dragged past a cop car'}},
    // 2. hook on a freeze: the cables
    {
      kind: 'pause', from: 0, to: 5.95,
      clip: {file: C('03-pull'), start: 4.1, label: 'Freeze: both Chargers, cables to the vault', zoom: 0.06},
      overlays: [{type: 'meme', file: 'ep04/assets/tow-chain.jpg', emoji: '', at: 'hooked', dur: 1.4}],
    },
    // 3. the vault is heavy and has no wheels (sparks land on "not on wheels")
    {
      kind: 'vo', from: 5.95, to: 15.22,
      clip: {file: C('02-slide'), start: 0, label: 'Vault sliding, sparks underneath'},
      overlays: [
        {type: 'pop', text: '~10 TONS', x: 50, y: 28, at: '10', dur: 1.6, color: '#FF3B30', size: 180},
        {type: 'stamp', text: 'NO WHEELS', good: false, at: 'wheels', dur: 1.4},
        {type: 'pop', text: 'STEEL ON ASPHALT', x: 50, y: 30, at: 'sliding', dur: 1.8, color: '#FFD60A', size: 110},
      ],
    },
    // 4. pulling force
    {
      kind: 'vo', from: 15.22, to: 20.45,
      clip: {file: C('03-pull'), start: 0, label: 'Both Chargers pulling on the bridge'},
      overlays: [{type: 'pop', text: '~5 TONS OF PULL', x: 50, y: 28, at: '5', dur: 2.0, color: '#FF3B30', size: 130}],
    },
    // 5. the tyres
    {
      kind: 'pause', from: 20.45, to: 29.12,
      clip: {file: C('04-charger-front'), start: 0.4, label: 'Freeze: Charger head-on', zoom: 0.08},
      overlays: [
        {type: 'pop', text: 'GRIP < 1 TON', x: 50, y: 30, at: 'under#2', dur: 2.0, color: '#FFD60A', size: 140},
        {type: 'stamp', text: 'WHEELSPIN', good: false, at: 'traction', dur: 1.2},
      ],
    },
    // 6. movie burst
    {kind: 'play', dur: 2.2, clip: {file: C('05-burnout'), start: 0.5, label: 'Burnout smoke'}},
    // 7. real life
    {
      kind: 'vo', from: 29.12, to: 37.90,
      clip: {file: C('06-reallife'), start: 0, label: 'Bridge, Dom, burnout, cops'},
      overlays: [{type: 'pop', text: '0 INCHES', x: 50, y: 30, at: 'inch', dur: 1.4, color: '#FFD60A', size: 150}],
    },
    // 8. to be fair, on a freeze
    {
      kind: 'pause', from: 37.90, to: 46.56,
      clip: {file: C('07-cop-hit'), start: 1.0, label: 'Freeze: vault crushing a cop car', zoom: 0.07},
      overlays: [
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'flatten', dur: 1.8},
        {type: 'sfx', name: 'boom', at: 'flatten'},
      ],
    },
    // 9. movie burst
    {kind: 'play', dur: 3.0, clip: {file: C('08-cop-flip'), start: 0.3, label: 'Cop car flipped into the bay'}},
    // 10. closer on Dom
    {
      kind: 'pause', from: 46.56, to: 54.3,
      clip: {file: C('09-dom-end'), start: 1.6, label: "Freeze: Dom on the bridge", zoom: 0.07},
      overlays: [
        {type: 'pop', text: 'FRICTION: 0', x: 50, y: 26, at: 'zero', dur: 1.6, color: '#FF3B30', size: 140},
        {type: 'stamp', text: 'FAMILY: UNDEFEATED', good: true, at: 'undefeated', dur: 1.6},
        {type: 'sfx', name: 'boom', at: 'undefeated'},
      ],
    },
    // 11. end on the movie
    {kind: 'play', dur: 2.2, clip: {file: C('09-dom-end'), start: 3.5, label: 'Charger crashing behind Dom'}},
  ],
};
