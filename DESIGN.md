---
name: Civic Forecast
description: An editorial catalogue of market questions, measured data, and sources.
colors:
  primary: "#d0b779"
  primary-hover: "#e3ca90"
  on-primary: "#192421"
  canvas: "#0d1718"
  surface: "#182a2b"
  surface-muted: "#132224"
  surface-strong: "#263b3a"
  well: "#101c1e"
  ink: "#e4eae3"
  muted-ink: "#a5b4ad"
  border: "#2c4140"
  border-strong: "#526a61"
  positive: "#98c9ad"
  negative: "#df938c"
  light-canvas: "#e9ede7"
  light-surface: "#f5f7f1"
  light-well: "#dfe7de"
  light-ink: "#1c302c"
  light-muted-ink: "#53665f"
  light-border: "#cad5ca"
  light-primary: "#806021"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(3.5rem, 6.4vw, 5.75rem)"
    fontWeight: 400
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2rem, 3.4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  briefing-question:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.4cqi, 2.65rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Instrument Sans, Avenir Next, Avenir, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    lineHeight: 1.7
  measurement:
    fontFamily: "Instrument Sans, Avenir Next, Avenir, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 450
    letterSpacing: "-0.03em"
  control:
    fontSize: "0.875rem"
  label:
    fontSize: "0.8125rem"
  caption:
    fontSize: "0.75rem"
  code:
    fontFamily: "SFMono-Regular, Consolas, Liberation Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    lineHeight: 1.8
rounded:
  action: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  compact: "0.75rem"
  md: "1rem"
  panel: "1.25rem"
  lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.action}"
    padding: "0.75rem 1.1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-utility:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
  input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
  market-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
---

# Design System: Civic Forecast

## Overview

**Creative North Star: "The civic editorial catalogue"**

Broad serif questions give the reader a point of entry into dense factual
material. Quiet teal surfaces, fine rules, and aligned figures make each specimen
read as a question with an accountable record. Captions explain the component's
purpose alongside the working example.

The user's teal panel family and illuminated dial remain the visual anchors.
Brass identifies actions, selection, and leading measurements. The CF monogram
stays legible at navigation and favicon sizes. The catalogue composition is
implemented in the demo and documentation; it supplies a pattern for presenting
components without requiring every consuming application to adopt the page.

**Key Characteristics:**

- Source Serif 4 for questions and display language; Instrument Sans for data and controls.
- Teal fields and ruled records with restrained brass accents.
- Contextual specimens paired with their purpose.
- Visible source labels and separate market and polling measurements.
- A draggable dial with equivalent click and keyboard controls.

## Colors

Deep teal, sage, and restrained brass carry the reference palette into an
editorial setting. The semantic variables in
`packages/react/src/styles/tokens.css` and `themes.css` are the implementation
source of truth. The frontmatter records the apps' dark presentation and the
main light-mode counterparts. Package tokens default to light; applications and
consumers set the theme scope explicitly or use ThemeProvider.

### Primary

- **Brass:** actions, selected controls, leading values, and chart traces.
- **Dark brass:** the light theme's accent, chosen for contrast against sage.

### Secondary

- **Mint and muted coral:** signed values and states alongside text; neither
  assigns a political party.

### Neutral

- **Deep teal:** page canvas, quiet material surfaces, and code wells.
- **Pale sage ink:** primary text, with muted sage for supporting records.
- **Teal rules:** boundaries between related measurements and source records.
- **Light sage:** the light theme's canvas, surfaces, and recessed fields.

## Typography

**Display and question font:** Source Serif 4, with Georgia and serif fallbacks.
**Body, data, and control font:** Instrument Sans, with the sans stack in the
frontmatter. **Code font:** the system monospace stack.

The serif carries the subject being discussed; the sans keeps prices, labels,
provenance, and controls compact. The apps self-host both families in WOFF2,
including a true Source Serif 4 italic for the demo introduction.
Static PNG/SVG exports still use the earlier Instrument Sans question treatment;
that export limitation is not the type rule for new surfaces.

### Hierarchy

- **Display:** a broad, regular serif headline; the second line may use the loaded
  italic. At narrow demo widths it scales to `clamp(2.65rem, 10vw, 4.5rem)`.
- **Headline:** serif section headings shared by the demo's catalogue, integration,
  distribution, and Lab sections. Documentation uses a smaller serif display ramp.
- **Briefing question:** a container-relative serif title that wraps naturally.
- **Title:** the compact market-card question; larger share formats have more room.
- **Body:** explanatory prose with generous line spacing and bounded line length.
- **Measurement:** tabular sans figures; outcome names remain visually subordinate.
- **Control, label, and caption:** the compact sans steps in the frontmatter.

**The Question and Measure Rule.** Give questions a serif voice and numerical
comparisons a tabular sans voice; preserve the distinction when density changes.

## Layout

The demo uses a 1440px maximum container with fluid side padding; documentation
uses 1320px. A broad introduction shares a row with its explanation and action.
The full-width briefing follows. Ruled catalogue rows then pair each specimen
with its purpose, alternating the wider specimen column where appropriate.
Integration, the interactive Lab, and distribution retain clear section breaks.

Inside the briefing, the question, settlement criteria, and provenance occupy
one field. The adjacent sheet contains labeled market and polling columns with
named price history below. This split follows the component's available width:
at 700px it becomes two fields; below that the question and metadata precede the
data sheet, followed by the settlement and source record. Below 380px the two
reading columns also stack. The same container behavior applies to the registry
version.

At 760px the demo's page columns stack and the Lab dial becomes horizontal, with
its labels in three columns. Catalogue copy precedes its specimen on mobile.
Documentation rows stack at 820px. Navigation remains visible. Studio keeps
controls above preview and output and measures its same-origin iframe to fit.
Use the quarter-rem component spacing scale; larger section intervals belong to
the catalogue layout rather than each individual card.

## Elevation & Depth

Outer material surfaces retain a quiet teal gradient and a thin border, but
ordinary cards and panels have no box shadow. Market outcomes, share-card quotes,
metadata, and briefing measurements use flat fields and rules. Dark code wells
still separate implementation examples. Light material uses the pale sage
counterpart. The dial retains its local glow and rim as an interactive reference
detail; selected theme controls retain a fine inset rim.

**The Ruled Record Rule.** Separate related data with alignment and fine rules;
introduce a new container only when it identifies a distinct component or control.

The existing drawer uses the ambient shadow token to separate a floating surface.
Its exact dark and light values are captured in the sidecar, not applied to
ordinary catalogue cards.

## Shapes

The shared radius scale is small (6px), medium (10px), and large (14px). Inputs
and utility controls use small corners, code containers use medium corners, and
outer component cards use large corners. The demo's brass call to action has a
more squared action radius (4px). Ruled data rows have square edges and no inset
box. Functional status pills and the circular dial keep their own silhouettes;
the dial follows a continuous curved track in both orientations.

## Components

### Buttons

Brass calls to action use the on-accent text color and a brighter hover state in
dark mode. The shared utility button uses ink against the surface color; ghost
buttons use a transparent fill and ruled border. Focus remains visibly outlined.
Shared controls have a minimum 44px target; the demo action has a 48px target.
Inset theme controls show selection through material, border, and text together.

### Cards / Containers

`MarketCard` pairs a serif question with ranked, ruled outcome rows and plots only
supplied history. `ShareCard` places the leading quote between rules, with open
metadata columns below. Both keep the outer material shell without nested metric
tiles. Interactive outcomes expose hover, selected, and focus states.

### Inputs / Fields

Fields use muted or well backgrounds, a thin border, and small corners. Labels
remain visible above the field. Focus uses an offset accent outline; controls
inherit the body sans face.

### Navigation

Text links, the CF mark, and theme controls share a ruled horizontal bar. Links
use muted ink and turn brass on hover. Mobile wraps the links into a visible
second row rather than hiding the navigation.

### Election briefing

`ElectionBriefCard` separates the question and provenance from the measurements.
Polling vote share and market probability have separate headings and retain
their supplied source labels. History identifies the outcome, last value,
observed range, and dates; missing history gets a visible empty state. Source
records expand with native details/summary controls. The registry shares this
composition and its container breakpoints. The history trace keeps a thin,
non-scaling stroke as the component changes width.

### Component dial

The Lab selector has nine sections. Pointer movement follows continuously;
release snaps to the nearest section. Clicking a label selects it directly.
Arrow keys, Home, and End move selection and focus through semantic tabs. The
selected tab labels the shared panel. Selection glides for 280ms with an ease-out
quartic curve, or changes immediately under reduced motion. The track alone
captures dragging, leaving the rest of the page scrollable.

## Do's and Don'ts

- Do keep market probability, poll share, and source provenance explicit.
- Do give serif questions room to wrap and align sans figures for comparison.
- Do pair catalogue specimens with a concrete description of their purpose.
- Do use the shared palette, type roles, and radius tokens when extending the system.
- Do preserve visible keyboard focus and reduced-motion behavior.
- Don't add decorative background grids.
- Don't turn related outcome rows or share metadata into nested rounded tiles.
- Don't fabricate data, sources, live indicators, or history to fill a panel.
- Don't replace a failed public-market request with sample prices.
