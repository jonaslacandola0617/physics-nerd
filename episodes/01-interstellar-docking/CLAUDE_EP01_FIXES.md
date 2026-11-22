# EP01 Visual & Sync Upgrade — Prompt & Spec for Claude

Drop the 3 new visual assets into `studio/public/ep01/assets/` with these exact filenames:
1. `studio/public/ep01/assets/fighter-jet-9g.jpg` (F-22 Raptor banking hard in a 9G turn with vapor cones)
2. `studio/public/ep01/assets/station-shrapnel.jpg` (Modular white space station ring ripping apart into shrapnel)
3. `studio/public/ep01/assets/space-pipe-organ.jpg` (Ornate golden cathedral pipe organ floating in deep space)

Once the images are in place, apply **all 5 fixes below** to `studio/src/template/Overlays.tsx`, `studio/src/template/types.ts`, and `studio/src/episodes/ep01.ts`, then re-render `renders/ep01.mp4`.

---

## Fix 1: Swap the Backwards Stamps at the End (`0:58` – `1:00`)
In `studio/src/episodes/ep01.ts`:
- Currently, when the VO says *"Cooper surviving makes total sense,"* the red `✗ SHIP` stamp appears, and when it says *"The ship surviving?"*, the green `✓ COOPER` stamp appears.
- **Fix:** Check the exact `at` word/timestamp triggers against `ep01.words.json` so that:
  - `{type: 'stamp', text: 'COOPER', good: true}` triggers cleanly on `"cooper"` / `"surviving"` / `"sense"` (first sentence).
  - `{type: 'stamp', text: 'SHIP', good: false}` triggers cleanly on `"ship"` / `"surviving"` (second sentence).
  - Ensure the two stamps never overlap.

---

## Fix 2: Fix Clipped `Arrow` Labels Globally (`0:52` `"spin axi"`)
In `studio/src/template/Overlays.tsx` inside the `Arrow` component:
- Currently, the label is positioned at `left: `${x2}%`` with `transform: 'translate(-50%, 30%)'`. When an arrow ends near the edge (like `x2: 92`), the label clips off-screen (`spin axi`).
- **Fix:** Position the label at the midpoint of the arrow (`(x1 + x2) / 2`) or clamp `left` between `20%` and `80%`:
  ```tsx
  const labelX = Math.min(Math.max((x1 + x2) / 2, 20), 80);
  const labelY = (y1 + y2) / 2;
  ```
  This fixes `"spin axis"` at `0:52` and prevents edge-clipping on all future episodes.

---

## Fix 3: Replace Cartoon Emoji Overlays With Real `<Img>` Cutaways
Your `Meme` component in `studio/src/template/Overlays.tsx` already supports `file?: string` and renders `<Img src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />` inside a `1:1` rounded card. Use that exact mechanism—zero emojis!

In `studio/src/episodes/ep01.ts`:
1. **`0:30` (Fighter Jet — replaces passenger plane emoji `✈️`):**
   - Replace the emoji overlay on *"modern fighter jet is designed around nine Gs"* with:
     ```ts
     {type: 'meme', file: 'ep01/assets/fighter-jet-9g.jpg', emoji: '', at: 'fighter', dur: 2.2}
     ```
2. **`0:42` (Station Shrapnel — replaces black cartoon explosion box `💥`):**
   - Replace the explosion overlay on *"flying across the galaxy like shrapnel"* with:
     ```ts
     {type: 'meme', file: 'ep01/assets/station-shrapnel.jpg', emoji: '', at: 'shrapnel', dur: 2.2}
     ```
3. **`1:02` (Hans Zimmer's Pipe Organ — punchline cutaway):**
   - Add a quick cutaway card right when the VO hits *"Hans Zimmer's organ"*:
     ```ts
     {type: 'meme', file: 'ep01/assets/space-pipe-organ.jpg', emoji: '', at: 'organ', dur: 1.8}
     ```

---

## Fix 4: Upgrade the `Versus` Comparison Card (`0:34` `9 G vs 150 G`)
In `studio/src/template/types.ts` and `studio/src/template/Overlays.tsx`:
- Add optional `leftImg?: string` and `rightImg?: string` props to the `versus` overlay type.
- When `leftImg` is provided (e.g., `'ep01/assets/fighter-jet-9g.jpg'`), render a clean circular or rounded-square thumbnail (`width: 220, height: 220, borderRadius: 20, border: '4px solid #fff'`) right above the `9 G` number on the left side.
- Optionally pass a still/thumbnail of the Endurance ring on the right side above `150 G` (or keep `150 G` bold red over the spinning Endurance background).

---

## Fix 5: Brighter Wide Shot Under the `~150 G` Outward Arrows (`0:24`)
In `studio/src/episodes/ep01.ts`:
- Currently, the `~150 G` red outward arrows appear over a very dark close-up of the hub where the outer ring isn't visible.
- **Fix:** Swap that beat's clip/freeze frame to the brighter wide top-down shot of the spinning Endurance ring (`ep01/clips/01-spin-topdown.mp4` or `08-spin-far.mp4`) so the red outward arrows point directly outward from the visible ring modules.

---

## Verification Checklist Before Final Render
- [ ] `✓ COOPER` appears on Cooper's line; `✗ SHIP` appears on the ship's line.
- [ ] `spin axis` text is fully visible inside the frame with comfortable margins.
- [ ] Zero Unicode emojis (`✈️`, `💥`, `🌀`) remain in `ep01.ts`.
- [ ] All 3 images in `studio/public/ep01/assets/` load cleanly in Remotion preview without broken paths.
- [ ] `~150 G` outward arrows sit clearly over the visible spinning ring.
