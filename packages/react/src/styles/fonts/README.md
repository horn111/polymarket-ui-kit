# Local type assets

Production styles use locally hosted variable fonts from the Google Fonts collection:

- Unbounded — display and calibrated numerals
- Schibsted Grotesk — interface and documentation text
- Chivo Mono — code, timestamps, IDs, and instrument labels

Each family is distributed under the SIL Open Font License. The WOFF2 files are the
Unicode-subset builds published by Fontsource, stored beside their matching OFL text.
This keeps demo, docs, Storybook, registry, and package consumers on the same type
system without a third-party runtime request while avoiding a full TTF download.
