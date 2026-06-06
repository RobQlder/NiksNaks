# Nik Naks Collectables — v2 design prototype

A static HTML/CSS/JS prototype of the **v2** site, built to fix v1's design/alignment
problems and give the client something concrete to react to. **Placeholder images and
sample text throughout.** Once the look is agreed, this becomes the visual spec for the
WordPress (Lightsail) build — see `../implementation-plan-lightsail.md`.

## Run it

```
python3 -m http.server 8080 --directory prototype
```
Then open http://localhost:8080/ (or use the `niknaks-prototype` preview server).

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — hero, collection cards, about teaser, repair CTA |
| `collection.html` | A collection landing (MOTU) → **album cards link to gallery pages** |
| `gallery.html` | An album page — masonry gallery + lightbox + captions |
| `about.html` | About page |
| `repair.html` | Toy-repair enquiry form (not wired up in the prototype) |

`assets/` holds the stylesheet (`css/styles.css`), the lightbox script
(`js/lightbox.js`), and generated SVG placeholder images (`img/`).

## v1 problems this fixes

- **Illegible hero** (orange title over a busy cartoon collage) → title now sits on a clean
  retro panel with strong contrast.
- **Unreadable repair band** + the "REPARIED" typo → solid teal panel, readable text,
  spelling fixed ("repaired").
- **Plain text collection links** → real image cards with titles and descriptions.
- **Broken/overlapping galleries** (v1 MOTU) → responsive masonry grid, captions **below**
  each image (never overlapping), click-to-zoom lightbox with prev/next and keyboard nav.
- **Generic AI clip-art + third-party cartoon IP** → neutral placeholders; the live site
  uses photos of Nikki's actual collection (avoids copyright risk).
- **Placeholder starter text** (the "Tyler Moore" About copy, test captions) → real-style
  sample copy, clearly flagged as placeholder.

## How it maps to the WordPress build

- **Albums are pages, not a plugin feature:** the collection→album→gallery structure here is
  exactly the page model planned for WordPress (native pages/menus), so the gallery plugin
  only renders flat galleries.
- **Gallery:** the masonry+lightbox+captions look is what **Modula** or **FooGallery**
  (free) should be configured to match.
- **Theme:** the palette, fonts (Fredoka + Nunito Sans), card and section styles are the
  design spec to reproduce in the Astra theme / a child theme's CSS.
- **Form:** `repair.html` defines the fields; in WordPress this is SureForms (or similar)
  wired to email via SMTP (see implementation plan, Phase 3.4).

## Still to do (real content)

Replace placeholders with: real toy photos per album, Nikki's own About copy and portrait,
final collection/album names, brand logo, and the destination email for the repair form.
