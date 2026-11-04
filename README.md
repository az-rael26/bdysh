# Birthday Website — H and S (Hearts and Stars)

A birthday gift website with a manually rotated 8-photo carousel, one clickable letter per photo, floral decorated popup, and an independent ambient background of floating hearts and pixel stars.

## Quick start in GitHub Codespaces

1. Upload everything in this folder to your GitHub repository, including the `assets` folder.
2. In Codespaces Terminal, run `python3 -m http.server 5500`.
3. Open **Ports** → **5500** → **Open in Browser**. If port 5500 is already running, simply refresh the preview.

## Edit your gift

- Replace the 8 sample `picsum.photos` `<img src="...">` URLs in `index.html` with your own image paths (e.g., `photos/us1.jpg`). Upload those photos too.
- Edit the 8 `from`, `preview`, and `fullText` fields in `index.js` to personalize each letter.
- The opening photo matches the opening `From: Name` card. Arrow buttons move photos and messages together; **the gallery does not auto-rotate**.
- The recipient clicks the purple message card to open a large photo and a letter. Use Back, Escape, or the shaded backdrop to close it.
- The floral corners use inline vector drawings, not emojis.

## H and S — automatic floating background

- `h-and-s.css` draws soft heart shapes and styles the uploaded pixel-star art (stored at `assets/pixel-star.png`).
- `h-and-s.js` spawns small hearts and stars automatically; no pointer or mouse events are used.
- Both float upward, cycle colors, and fade away. Each has a random size, movement, and duration. The effect is behind gallery/buttons/dialog so they stay clickable.
- Adjust `HNS_SETTINGS.intervalMs`, `heartChance`, and size/duration limits in `h-and-s.js` to customize the effect.
- The site respects reduced-motion settings by disabling the background animation.

## Colors

- Linen `#FDF1E2` — background
- Dolphin `#655A7C` — text and cards
- Amethyst `#AB92BF` — borders and decorative accents

Everything is plain HTML, CSS and JavaScript; no packages or build system required.
