// Episode data model. Every episode is one data file that fills these in.

export type Word = {w: string; s: number; e: number};

/** A movie clip cut into public/<ep>/clips. `file` missing = placeholder (shows `label`). */
export type ClipRef = {
  file?: string; // path inside public/, e.g. "ep01/clips/spin-wide.mp4"
  start?: number; // seconds into that clip file (for PAUSE beats: the frame to freeze on)
  label: string; // what this shot should show (used on the placeholder)
  zoom?: number; // slow push-in amount over the beat, e.g. 0.08
};

export type SfxName = 'click' | 'resume' | 'pop' | 'whoosh' | 'boom' | 'ding';

/**
 * Positions are 0–100, in % of the clip box.
 * `at` is seconds from the beat start, OR a word from that beat's voiceover (e.g. 'complaint'),
 * which resolves to the moment that word starts. `dur` is in seconds.
 */
export type At = number | string;
export type Overlay =
  | {type: 'pop'; text: string; x: number; y: number; at: At; dur?: number; color?: string; size?: number}
  | {type: 'arrow'; x1: number; y1: number; x2: number; y2: number; at: At; dur?: number; label?: string; color?: string}
  | {type: 'radius'; cx: number; cy: number; r: number; at: At; dur?: number; label: string}
  | {type: 'spin'; cx: number; cy: number; r: number; at: At; dur?: number; label?: string}
  | {type: 'stamp'; text: string; good: boolean; at: At; dur?: number}
  | {type: 'versus'; left: string; leftSub: string; right: string; rightSub: string; leftImg?: string; rightImg?: string; at: At; dur?: number}
  | {type: 'meme'; file?: string; emoji: string; at: At; dur?: number}
  | {type: 'sfx'; name: SfxName; at: At; volume?: number};

export type Beat =
  /** v2: movie plays with its own audio, no narration. */
  | {kind: 'play'; dur: number; clip: ClipRef; overlays?: Overlay[]}
  /** v2: click, frame freezes on clip.start, voiceover slice [from, to] plays over it. */
  | {kind: 'pause'; from: number; to: number; clip: ClipRef; overlays?: Overlay[]}
  /** v1 (legacy): narration over moving footage. */
  | {kind: 'vo'; from: number; to: number; clip: ClipRef; overlays?: Overlay[]}
  /** v1 (legacy): same as 'play'. */
  | {kind: 'movie'; dur: number; clip: ClipRef; overlays?: Overlay[]};

export type Episode = {
  id: string;
  title: [string, string]; // two-line title bar
  voiceover: string; // path inside public/
  words: Word[];
  captionFixes?: Record<string, string>; // whisper token -> display text
  beats: Beat[];
};
