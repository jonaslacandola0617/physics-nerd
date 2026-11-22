// Episode data model. Every episode is one data file that fills these in.

export type Word = {w: string; s: number; e: number};

/** A movie clip cut into public/<ep>/clips. `file` missing = placeholder (shows `label`). */
export type ClipRef = {
  file?: string; // path inside public/, e.g. "ep01/clips/spin-wide.mp4"
  start?: number; // seconds into that clip file
  label: string; // what this shot should show (used on the placeholder)
  zoom?: number; // slow push-in amount over the beat, e.g. 0.08
};

/** Positions are 0–100, in % of the clip box. `at` / `dur` are seconds from the beat start. */
export type Overlay =
  | {type: 'pop'; text: string; x: number; y: number; at: number; dur?: number; color?: string; size?: number}
  | {type: 'arrow'; x1: number; y1: number; x2: number; y2: number; at: number; dur?: number; label?: string; color?: string}
  | {type: 'radius'; cx: number; cy: number; r: number; at: number; dur?: number; label: string}
  | {type: 'spin'; cx: number; cy: number; r: number; at: number; dur?: number; label?: string}
  | {type: 'stamp'; text: string; good: boolean; at: number; dur?: number}
  | {type: 'versus'; left: string; leftSub: string; right: string; rightSub: string; at: number; dur?: number}
  | {type: 'meme'; file?: string; emoji: string; at: number; dur?: number};

export type Beat =
  | {kind: 'vo'; from: number; to: number; clip: ClipRef; overlays?: Overlay[]}
  | {kind: 'movie'; dur: number; clip: ClipRef; overlays?: Overlay[]};

export type Episode = {
  id: string;
  title: [string, string]; // two-line title bar
  voiceover: string; // path inside public/
  words: Word[];
  captionFixes?: Record<string, string>; // whisper token -> display text
  beats: Beat[];
};
