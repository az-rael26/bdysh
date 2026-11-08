# Automatic Portrait / Landscape Photo Frames

This update is based on the **4-photo, no-toys Mochi edition**.

## Installation

In your `feature/mochi-cat` Codespace, replace only:
- `index.js`
- `style.css`

Do NOT replace your `index.html`, `cat-canvas.js`, `h-and-s.css`, `h-and-s.js`, personal `photos/`, or `assets/` folder.

The frames now adapt to each loaded photo's **natural dimensions** (portrait/landscape/square) in the mini carousel, expanded gallery and opened-letter modal. Images are displayed with `object-fit: contain` (no cropping). The cat stays anchored to the center image's top border.

## Changing photo 2
In `index.js` change `assets/demo-photo-2.svg` to `photos/photo2.jpeg` or `photos/photo2.jpg`, exactly matching your file's extension.

The `messages` array still has exactly four editable entries.
