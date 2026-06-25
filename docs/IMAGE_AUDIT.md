# Image Audit — European Electric LLC

**Last updated:** June 18, 2026  
**Status:** Image usage has been improved with the current local asset library. Service detail images now use a real-image pool that avoids placeholder assets and face-forward stock photos.

## Client constraints

- One photo should not be reused in multiple prominent places when avoidable.
- Avoid photos where a person's face is clearly visible.
- Do not use random Google/Pinterest images or unlicensed stock.
- Envato access is currently unavailable, so any new replacement photo must come from existing licensed assets, client-provided photos, or a free commercial-use source.

## Current client-owned assets (`RelevantPics/`)

| File | Best use | Description |
|------|----------|-------------|
| `1.jpeg` | Commercial / conduit / outdoor site work | Commercial conduit routing |
| `2.jpeg` | Panels / power systems | Commercial electrical panels |
| `3.jpeg` | Residential / electrician at work | Electrician at panel |
| `4.jpe` | Safety / switchgear / specialty | Commercial switchgear |
| `video1.mp4` | Field work showcase | On-site electrical work |
| `video2.mp4` | Commercial project showcase | Commercial installation |

## Added free-use sources

| File | Source | License note | Usage |
|------|--------|--------------|-------|
| `public/assets/images/service/insight-ev.jpg` | [Pexels — Kindel Media](https://www.pexels.com/photo/an-electric-car-charging-9799996/) | Pexels marks this photo as free to use | Latest News EV charger insight card |
| `public/assets/images/resource/about-primary-panel.jpg` | [Unsplash](https://unsplash.com/photos/electrical-panel-with-wires-and-components-q0Jo_J5YxHY) | Free to use under the Unsplash License | About page primary image |
| `public/assets/images/resource/about-secondary-switch.jpg` | [Unsplash](https://unsplash.com/photos/close-up-of-an-electrical-main-switch-panel-iUv4vkuClDs) | Free to use under the Unsplash License | About page secondary image |

## Current limitation

Strict "one photo, one place" across the entire website is only fully possible if the project has enough unique licensed photos for every hero, card, detail page, article, and gallery image. The current service-detail hero pool has 25 real/no-face-safe entries for about 31 service detail pages, so a small amount of repetition may still happen unless at least 6 more approved no-face photos are added.

Placeholder-looking template files such as later `service-*`, `project-*`, `news-*`, and `working-*` stock images should not be used unless visually checked first.

Avoid using these categories for client-facing replacements unless manually approved:

- `team/*`
- `testimonial-*`
- `author-*`
- Any photo where a face is visible or recognizable

## Still needed (free commercial-use or client photos)

Priority replacements to reduce repetition and improve relevance:

| Section | Current | Needed photo |
|---------|---------|--------------|
| **Indoor Lighting** | Existing licensed/local asset | Recessed/pendant lighting install, no visible face |
| **Outdoor Lighting** | Existing licensed/local asset | Landscape/security/pathway lighting, no visible face |
| **Home Rewiring** | Existing licensed/local asset | Residential wiring/rewire in progress, no visible face |
| **Contact sidebar** | Existing licensed/local asset | Branded van, tools, panel, or electrician from behind/no face |
| **Safety Upgrades** | Existing licensed/local asset | GFCI/AFCI outlet, surge protector, or breaker close-up |
| **New Construction** | Existing licensed/local asset | Framing/conduit rough-in, no visible face |
| **Remodeling** | Existing licensed/local asset | Kitchen/bathroom remodel wiring, no visible face |

## Safe free sources (commercial license)

- [Unsplash](https://unsplash.com) — license allows commercial use; verify each photo
- [Pexels](https://pexels.com) — free for commercial use
- [Pixabay](https://pixabay.com) — free for commercial use

**Avoid:** Random Google Images, Pinterest, or unlicensed stock without attribution check.

## Search keywords for sourcing

- `electrician installing panel`
- `ev charger home garage installation`
- `recessed lighting installation`
- `commercial LED retrofit`
- `electrical conduit commercial`
- `residential rewiring`
- `outdoor landscape lighting electrical`

## Where to drop new images

1. Save to `public/assets/images/RelevantPics/` (or `public/assets/images/service/` for category-specific)
2. Update mappings in `src/config/media.js`
3. Update `scripts/canonical/index.html` and `about.html` if homepage/about sections change
4. Run `npm run build` before deploy

## Re-enable street address later

In `src/config/site.js` set:

```js
showAddress: true,
showMap: true,
```

Then restore the map block in `scripts/canonical/contact.html` if removed.
