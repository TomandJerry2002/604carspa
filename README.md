# 604 Car Spa website

React + Vite build of the 604 Car Spa design.

## Run locally

```bash
npm install
npm run dev
```

## Build for hosting

```bash
npm run build
```

Upload the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, etc).

## Structure

- `src/App.jsx` – all pages, sections and behaviour. Page data (packages, prices, FAQs, cities) is at the top of the file.
- `src/styles.css` – global styles, keyframes and hover/press states.
- `public/media/` – videos, gallery photos and before/after stills.
- `public/image-slot.js` – drop-in image placeholder used for photos not supplied yet (Swarn portrait, ceramic photo).

## Pages

Hash routes: `#/`, `#/interior`, `#/inside-out`, `#/exterior`, `#/ceramic`, `#/city/<name>`, `#/problem/milk`, `#/problem/vomit`.

## Before launch

- Download the two Unsplash background photos (Tesla, G-Class) into `public/media/` and update the URLs in `App.jsx`.
- Replace the transformation video (`public/media/transformation.mp4`) with a full-resolution original.
- Replace the image-slot placeholders with real photos.
- Add payment methods to the FAQ.
