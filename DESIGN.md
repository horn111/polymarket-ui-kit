# Design System

## Direction

The approved direction is **Mechanical Probability**. Polymarket UI Kit is the master
brand; Civic Forecast is the politics edition. The system borrows only two techniques
from the rejected concepts: Broadcast Intelligence's data-lock timing and Signal
Optics' restrained illumination on charts.

The physical scene is a calibrated market instrument on a dark editing-stage desk:
low ambient light, readable ceramic labels, controlled specular highlights, and no
decorative neon. Dark is the primary showcase theme; light is a complete ceramic and
graphite counterpart.

## Color

All production values are expressed as semantic OKLCH tokens.

- Graphite canvas: near-black with a small neutral chroma.
- Anodized surfaces: stepped graphite values with one consistent light direction.
- Ceramic: neutral near-white for primary labels and actions.
- Burnished copper: the master accent for selection, charts, focus-adjacent detail, and
  the calibrated brand mark. It must remain muted and material, never gold or neon.
- Live: restrained mineral teal.
- Negative: oxide coral, used only for semantic negative states.
- Warning: muted amber, used only for warning states.
- Party-coded red/blue pairs, purple/violet, and chartreuse are prohibited.

## Typography

- Display: Unbounded Variable candidate for large brand statements and calibrated
  numerals only.
- UI: Schibsted Grotesk Variable candidate for controls, documentation, and component
  copy.
- Mono: Chivo Mono candidate for code, timestamps, IDs, and instrument labels.
- Fonts are hosted locally after license and metric verification.
- Data uses tabular numerals. Display tracking never goes below -0.04em. Body copy is
  limited to 65–75 characters per line.

## Shape and material

- Outer instrument surfaces use 12–18 px radii; inner controls use 5–8 px.
- Ceramic actions are light, rectangular plates with dark ink.
- Elevation suggests one overhead light source. Shadows are graphite-tinted.
- Fine screw, calibration, or engraving details are allowed only on brand and feature
  surfaces, never repeated on every card.
- Glass is not a default surface. Charts may use a restrained optical glow at the active
  data point.

## Motion

- Controls: 160–240 ms, ease-out-quart or ease-out-quint.
- Data locks and plate alignment: 360–840 ms.
- Hero orchestration: maximum 1800 ms and never blocks interaction.
- Animate transform, opacity, clip-path, masks, SVG paths, and light only.
- No scroll-jacking, bounce, elastic easing, or universal section fade.
- Reduced motion renders the final composition immediately with a short crossfade at
  most.

## Components

- Cards are used only when a bounded instrument surface communicates hierarchy.
- Dense data components fall back to flat graphite or ceramic surfaces.
- Loading, empty, error, focus, selected, pressed, and disabled states share one
  vocabulary across React, demo, docs, and Storybook.
- Charts use stable neutral series plus copper, teal, coral, and oxide/steel variants;
  line pattern, labels, or markers must communicate state without relying on hue.

## Layout

- Marketing layouts are asymmetric and scene-based.
- Product workspaces use disciplined two-dimensional grids with aligned controls and
  data baselines.
- Avoid equal feature-card grids and nested cards.
- All surfaces must remain complete at 320, 390, 768, 1280, and 1440 px.
