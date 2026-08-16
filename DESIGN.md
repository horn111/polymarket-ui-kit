---
name: Polymarket UI Kit
description: A public-information interface system that keeps probability legible and its evidence visible.
colors:
  light-canvas: "oklch(0.972 0.009 255)"
  light-surface: "oklch(0.995 0.003 255)"
  light-surface-subtle: "oklch(0.938 0.017 255)"
  light-surface-strong: "oklch(0.882 0.028 255)"
  light-ink: "oklch(0.205 0.025 258)"
  light-ink-inverse: "oklch(0.985 0.006 255)"
  light-muted-ink: "oklch(0.43 0.035 255)"
  light-soft-ink: "oklch(0.5 0.045 255)"
  light-rule: "oklch(0.77 0.025 255 / 0.9)"
  light-rule-strong: "oklch(0.56 0.06 255 / 0.95)"
  cobalt: "oklch(0.49 0.205 258)"
  cobalt-hover: "oklch(0.41 0.19 258)"
  cobalt-soft: "oklch(0.9 0.055 255)"
  cyan-live: "oklch(0.58 0.13 225)"
  cyan-live-soft: "oklch(0.91 0.045 225)"
  coral-negative: "oklch(0.57 0.19 29)"
  coral-negative-soft: "oklch(0.93 0.045 29)"
  ochre-warning: "oklch(0.61 0.125 79)"
  focus-blue: "oklch(0.62 0.18 253)"
  dark-canvas: "oklch(0.14 0.035 258)"
  dark-surface: "oklch(0.18 0.04 258)"
  dark-surface-subtle: "oklch(0.225 0.05 258)"
  dark-ink: "oklch(0.96 0.012 255)"
  dark-rule: "oklch(0.36 0.06 258 / 0.82)"
  dark-cobalt: "oklch(0.7 0.16 252)"
  dark-cyan-live: "oklch(0.76 0.12 220)"
  dark-coral-negative: "oklch(0.72 0.17 30)"
typography:
  display:
    fontFamily: '"PUI Schibsted Grotesk", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(11rem, 20vw, 20rem)"
    fontWeight: 720
    lineHeight: 0.72
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"PUI Schibsted Grotesk", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(3rem, 5.5vw, 5.8rem)"
    fontWeight: 780
    lineHeight: 0.93
    letterSpacing: "-0.04em"
  title:
    fontFamily: '"PUI Schibsted Grotesk", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(1.1rem, 3vw, 1.55rem)"
    fontWeight: 760
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"PUI Schibsted Grotesk", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: '"PUI Chivo Mono", "Cascadia Mono", Consolas, ui-monospace, monospace'
    fontSize: "0.58rem"
    fontWeight: 540
    lineHeight: 1.2
    letterSpacing: "0.065em"
rounded:
  xs: "1px"
  sm: "2px"
  md: "4px"
  lg: "6px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-5: "1.25rem"
  space-6: "1.5rem"
  space-7: "2rem"
  space-8: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.light-ink-inverse}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 1rem"
    height: "2.625rem"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-hover}"
    textColor: "{colors.light-ink-inverse}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 1rem"
    height: "2.625rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.sm}"
    padding: "0.25rem 1rem"
    height: "2.625rem"
  input:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "0 0.875rem"
    height: "2.75rem"
  card:
    backgroundColor: "{colors.light-surface}"
    textColor: "{colors.light-ink}"
    rounded: "{rounded.md}"
    padding: "clamp(1rem, 2.5vw, 1.5rem)"
  outcome:
    backgroundColor: "{colors.light-canvas}"
    textColor: "{colors.light-ink}"
    rounded: "0"
    padding: "0.75rem 1rem"
    height: "4.25rem"
  share-surface:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.light-ink-inverse}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-4}"
---

# Design System: Polymarket UI Kit

## Overview

**Creative North Star: "Public Probability"**

Probability is public information with visible proof. The system presents the market,
timeline, resolution context, and evidence as one continuous information plane rather
than a stack of crypto-dashboard cards. It feels engineered, tactile, and assured,
with the directness of civic wayfinding and the precision of a calibrated instrument.

This is the global visual world for the React package, docs, demo, Studio, embeds,
exports, registry items, and examples. The package styles are the source of truth:
consumers import `@polymarket-ui-kit/react/styles.css` and `themes.css`, then compose
their surface without replacing the semantic color, type, shape, state, or motion
vocabulary. Light is the lead presentation; dark is a complete deep-navy counterpart.

**Key Characteristics:**

- Oversized humanist probability numerals paired with compact, factual labels.
- Cobalt fields, blue-tinted mineral neutrals, cyan live state, and coral negative state.
- Hairline information rails and square internal regions instead of nested card stacks.
- Market data and provenance kept adjacent across product and distribution surfaces.
- Dense working layouts that remain calm because every region has a mechanical role.

## Colors

The palette is blue-led in both themes. Cobalt is the brand and interaction system,
not one accent among many.

### Primary

- **Public Cobalt:** Owns primary actions, selected navigation, positive market
  emphasis, lead chart series, key numerals, the brand mark, and share fields.
- **Deep Cobalt:** Handles hover and stronger text emphasis in the light theme.
- **Cobalt Wash:** Marks selected or contextual regions without creating a new card.

### Secondary

- **Live Cyan:** Reserved for live, streaming, and secondary chart state. It supports
  cobalt and never replaces it as the dominant signal.
- **Signal Coral:** Reserved for negative outcomes, errors, asks, and decreasing values.
- **Warning Ochre:** Reserved for warnings; it is not decorative warmth.

### Neutral

- **Mineral Canvas:** The light theme's cool near-white page field.
- **Paper Surface:** The lightest bounded surface for components and working panels.
- **Blue Mist:** Secondary and tertiary fields used for grouping and soft selection.
- **Deep Navy Canvas:** The dark theme's chromatic foundation, never neutral black.
- **Blue Ink and Rules:** Text, muted copy, borders, and chart grids retain a slight
  blue bias so the interface remains coherent in either theme.

**The Blue Authority Rule.** Cobalt owns action, selection, and primary probability;
cyan and coral remain semantic support colors.

**The Color-Independent State Rule.** Every status and outcome also carries text,
value, position, line treatment, or iconography; hue is never the only distinction.

## Typography

**Display Font:** PUI Schibsted Grotesk, with Arial Nova and system sans fallbacks

**Body Font:** PUI Schibsted Grotesk, with Arial Nova and system sans fallbacks

**Label/Mono Font:** PUI Chivo Mono, with Cascadia Mono and system mono fallbacks

**Character:** Schibsted Grotesk gives both language and large numerals a human,
public-information voice. Chivo Mono is a narrow utility layer for code, timestamps,
source kinds, identifiers, and measurements. PUI Unbounded remains bundled only for
compatibility; it is not the production display voice.

### Hierarchy

- **Probability:** The signature scale. Use tabular numerals, a tight but readable
  fit, and a clipped line box so the number behaves like a structural anchor.
- **Display:** Hero propositions use heavy weight, compressed line height, balanced
  wrapping, and a short measure of roughly nine characters where the composition calls
  for it.
- **Headline:** Section statements keep the same strong humanist voice at a smaller
  responsive scale.
- **Title:** Market and component titles stay compact, usually between 1.1 and 2.6rem,
  with no more than `-0.04em` tracking.
- **Body:** Explanatory copy uses regular sentence case and stays within a readable
  65–75 character measure.
- **Label:** Mono labels are small, tracked, and usually uppercase. Do not use mono for
  prose, navigation, buttons, or large data.

**The One Humanist Voice Rule.** Schibsted carries both interface language and the
large probability; hierarchy comes from scale, weight, and placement rather than a
decorative display face.

## Layout

Desktop shells are wide but bounded: the demo tops out at 96rem, docs at 100rem, with
responsive gutters from 1rem to 3.5rem. Hairline borders align navigation, content,
charts, evidence, install rails, and component proof into one two-dimensional system.

The first desktop viewport uses an asymmetric split. A proposition and oversized
probability anchor occupy the left rail; one continuous market, chart, resolution, and
evidence plane occupies the larger right side. Components and install or registry
proof enter early enough to make reusability visible without displacing the market.

At roughly 820–860px, the hero becomes a single column. On narrow mobile, preserve the
proposition and primary action, then show the live market and provenance before moving
supporting principles below them. Outcome pairs stack below 520px. Evidence changes
from four equal columns to a horizontally scrollable rail below 720px, with each item
wide enough to expose title and source rather than becoming a cramped tile.

Studio keeps controls aligned as a dense switchboard and pairs the preview with output
code on desktop; both become single-column in the existing tablet and mobile
breakpoints. Registry items and examples inherit the package grid, component tokens,
and theme selectors rather than establishing their own visual dialect.

**The Continuous Plane Rule.** Use rails, aligned rows, and shared baselines to group
related information. Do not wrap every region in a separate floating card.

## Elevation & Depth

Public Probability is flat by default. Resting cards, panels, docs, the demo hero, and
Studio workspaces use tonal contrast plus one-pixel rules, with shadows explicitly
removed. The package retains two soft blue-tinted elevation tokens for true overlays,
such as the trade drawer, and for backwards-compatible host themes; they are not a
license to lift ordinary content.

**The Flat-by-Default Rule.** If a border or field change communicates the hierarchy,
do not add a shadow. Elevation is reserved for an element that genuinely overlays the
current plane.

## Shapes

The system uses a restrained radius scale from 1px to 6px. Bounded cards and Studio
panels typically use 4px corners; large preview containers may reach 6px; compact
controls use 2px. Outcome regions, chart divisions, status markers, and internal rails
remain square. The circular percent marker and live dot are purposeful data
punctuation, not a general pill language.

Borders are one pixel and blue-tinted. Clipping is functional: it contains continuous
planes, chart lines, loading scans, and the signature probability reveal.

**The Square Interior Rule.** A bounded component may have a quiet outer radius, but
its data rows and internal regions meet edge-to-edge with square corners.

## Components

### Buttons

- **Shape:** Compact cobalt rectangles with 2px corners and a 2.625rem minimum height.
- **Primary:** Cobalt field, inverse ink, confident sentence-case type, and no shadow.
- **Ghost:** Transparent field with a strong hairline border; hover uses the cobalt
  wash rather than elevation.
- **Hover / Focus / Pressed:** Hover deepens cobalt, keyboard focus uses a 2px focus-blue
  outline with a 3px offset, and press moves the control down by 1px.

### Inputs / Fields

- **Style:** Flat paper surface, strong blue-tinted border, 2px corners, and a 2.75rem
  minimum height. Studio groups fields into aligned, rail-divided control banks.
- **Focus:** Use the shared focus-blue outline and cobalt caret.
- **Error / Disabled:** Error combines the coral wash, coral text, and an explicit
  message. Disabled controls remain legible at reduced opacity and use a not-allowed
  cursor.

### Cards / Containers

- **Corner Style:** Quiet 4px outer corners; square internal regions.
- **Background:** Paper surface over the mineral canvas, or transparent regions within
  a continuous parent plane.
- **Shadow Strategy:** None at rest; use the Elevation & Depth rule for overlays only.
- **Border:** One-pixel information rails carry most hierarchy.
- **Internal Padding:** Usually 1–1.5rem, reduced only when data density requires it.

### Market, Outcomes, and Charts

Market title, resolution, outcomes, chart, and evidence read as one instrument. The
primary outcome receives cobalt emphasis and the negative outcome coral emphasis, with
labels and values preserving meaning. Charts use cobalt for the lead series, cyan for
live secondary series, coral for negative series, and blue-tinted grid lines. Lines
draw over 560ms using the mechanical ease when motion is allowed.

### Evidence Rail

Evidence is attached to the market, not sent to a detached references page. Every item
carries kind, title, publisher, optional relative time, and an authored square-stroke
external-link icon. The desktop rail uses four equal columns separated by hairlines;
mobile exposes one broad item at a time through horizontal scrolling. Empty evidence
uses a direct title and an instruction to add official records, polls, models, or
reporting.

### Navigation

Navigation is a horizontal ruled band with a square cobalt brand mark, compact
uppercase links, and underlined active theme controls. Hover fills with cobalt wash.
On smaller desktop widths, secondary links may collapse while the brand, theme, and
Studio path remain available through the surface's responsive treatment.

### Share, Embed, and Studio Surfaces

Share surfaces may commit to a full cobalt field with inverse ink and darker tonal
subregions. Dense Studio panels, tables, embed controls, and code outputs remain flat
for scanability. Theme selection changes the shared `data-pui-theme` tokens, so React,
iframe, PNG, SVG, registry, docs, demo, and example outputs preserve one identity.

### Interaction & Motion

Controls transition over 160–220ms with exponential ease-out. The authored hero moment
reveals only the large probability through an 840ms clipped vertical arrival; content
does not depend on the animation. Reduced-motion mode renders the final state
immediately. Do not use bounce, elastic easing, scroll-jacking, or repeated section
fade-ups.

## Do's and Don'ts

### Do:

- **Do** lead with the market and its probability, then keep evidence and resolution
  context physically adjacent.
- **Do** use the semantic package tokens and import both package style sheets before
  composing docs, demo, Studio, registry, or example surfaces.
- **Do** use cobalt as the dominant action and probability color; reserve cyan, coral,
  and ochre for their named semantic jobs.
- **Do** preserve keyboard focus, skip links, screen-reader labels, textual chart
  values, tabular numerals, and complete layouts from 320px through large desktop.
- **Do** render final content immediately when reduced motion is requested.

### Don't:

- **Don't** turn the system into a generic SaaS card grid, a floating-window dashboard,
  or a crypto-neon control room.
- **Don't** introduce party-coded red/blue pairs, violet or purple AI palettes,
  chartreuse accents, or decorative gradients.
- **Don't** use editorial serif styling, terminal brutalism, glassmorphism, simulated
  metal, ornamental screws, or cinematic hardware lighting as the production world.
- **Don't** use large pill buttons, ornamental icon tiles, nested cards, or shadows on
  resting content.
- **Don't** detach provenance from the number it supports or encode state by hue alone.
