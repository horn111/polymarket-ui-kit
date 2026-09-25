# Civic Forecast

Civic Forecast is the presentation system for Polymarket UI Kit: an open-source
React component library, public-data adapters and hooks, a copy-in registry, and
an embed/share Studio. It serves developers building research portals, media
tools, and market interfaces. The current package exposes 22 React components
and eight registry items.

The first opinionated workflow is civic reporting: a market question and its
prices sit beside separately labeled polling context, sources, and settlement
criteria. Host applications supply that outside context; the kit does not verify
political claims or source records. General market components also support other
categories.

Distribution surfaces include React, iframe embeds, PNG, and SVG. Studio accepts
a market URL or slug and produces previews and integration snippets. The Lab
uses illustrative fixtures to demonstrate components and their states.

The demo is read-only. Host applications retain signing and order-placement
responsibilities. Sample data is labeled explicitly; failed public requests
remain unavailable rather than substituting a fictional market. See
[the release guide](docs/release.md) for release readiness and publishing steps.

The approved visual direction follows the user's dark teal panel and illuminated
dial references. See [DESIGN.md](DESIGN.md) for the implemented system.
