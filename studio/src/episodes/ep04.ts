import {Episode} from '../template/types';
import words from './ep04.words.json';

// EP04 v2 — Fast Five vault, reaction format. Script: episodes/04-fastfive-vault/script.md
// Clips not cut yet: each clip shows a placeholder until `file`/`start` are filled in.

export const ep04: Episode = {
  id: 'ep04',
  title: ['Physics Nerd reacts to', 'Fast Five'],
  voiceover: 'ep04/vo.mp3',
  words,
  captionFixes: {"charger's": "Charger's"},
  beats: [
    {kind: 'play', dur: 4.0, clip: {label: '~1:52:00 Chargers floor it, vault rips out of the wall'}},
    {kind: 'pause', from: 0, to: 4.45, clip: {label: 'Freeze: vault half-through the wall', zoom: 0.1}},
    {kind: 'play', dur: 5.5, clip: {label: '~1:52:15 vault sliding, sparks, both cars pulling'}},
    {
      kind: 'pause', from: 5.64, to: 14.5,
      clip: {label: 'Freeze: vault + both cars, cables taut', zoom: 0.05},
      overlays: [
        {type: 'pop', text: '~5 TONS', x: 50, y: 30, at: 'five', dur: 2.4, color: '#FF3B30', size: 180},
        {type: 'arrow', x1: 50, y1: 80, x2: 25, y2: 30, at: 'two', dur: 1.6, color: '#FFD60A'},
        {type: 'arrow', x1: 50, y1: 80, x2: 75, y2: 30, at: 'cars', dur: 1.4, color: '#FFD60A'},
      ],
    },
    {kind: 'play', dur: 5.0, clip: {label: '~1:53:00 rear tyres smoking through traffic'}},
    {
      kind: 'pause', from: 14.95, to: 22.45,
      clip: {label: 'Freeze: close on a smoking rear tyre', zoom: 0.1},
      overlays: [
        {type: 'pop', text: '< 1 TON', x: 50, y: 30, at: 'under', dur: 2.2, color: '#FFD60A', size: 170},
        {type: 'stamp', text: 'WHEELSPIN', good: false, at: 'zero', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 5.5, clip: {label: '~1:55:00 vault swings into the police cars'}},
    {
      kind: 'pause', from: 23.2, to: 30.9,
      clip: {label: 'Freeze: mid-impact, cop car folding', zoom: 0.06},
      overlays: [
        {type: 'stamp', text: 'ACCURATE', good: true, at: 'wrecks', dur: 1.8},
        {type: 'meme', emoji: '📋', at: 'insurance', dur: 1.2},
      ],
    },
    {kind: 'play', dur: 4.0, clip: {label: "~1:57:00 Dom at the wheel, jaw set"}},
    {
      kind: 'pause', from: 31.66, to: 39.48,
      clip: {label: "Freeze: Dom's face", zoom: 0.08},
      overlays: [
        {type: 'sfx', name: 'boom', at: 'family'},
        {type: 'pop', text: 'SUBSCRIBE', x: 50, y: 25, at: 'subscribe', dur: 2.8, color: '#FFD60A', size: 120},
      ],
    },
    {kind: 'play', dur: 2.0, clip: {label: '~1:57:05 vault scraping on'}},
  ],
};
