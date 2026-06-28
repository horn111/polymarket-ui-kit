# Combo-Aware UI

Polymarket Combos let builders compose multiple market legs into richer market
surfaces. Polymarket UI Kit supports the read/display layer for that workflow:
public combo-market discovery, leg selection, combo cards, and intent payloads.

This kit does not submit RFQ quotes, sign messages, run maker infrastructure, or
place orders. Host apps own authenticated Combo/RFQ integration.

## What Ships

- `listComboMarkets` fetches public combo-capable markets.
- `useComboMarkets` loads those markets in React.
- `ComboLegPicker` lets users choose outcomes from combo-capable markets.
- `ComboLegList` shows selected legs and selected outcome prices.
- `ComboIntentPreview` emits a typed `ComboIntent`.
- `ComboBuilderCard` combines picker, selected legs, and intent preview.
- `ComboShareCard` creates an embed/social surface for selected combo legs.

## Public Data

The public Combo catalog endpoint exposes active markets that can be used as
combo legs:

```txt
GET https://combos-rfq-api.polymarket.com/v1/rfq/combo-markets
```

The API returns arrays such as `position_ids`, `outcomes`, and
`outcome_prices`. The adapter maps them by shared array index so a selected
outcome keeps the correct `positionId`.

## Intent Handoff

```tsx
import { ComboBuilderCard, useComboMarkets } from "@polymarket-ui-kit/react";

export function ComboSurface() {
  const combos = useComboMarkets({ limit: 12 });

  return (
    <ComboBuilderCard
      markets={combos.data?.markets ?? []}
      onComboIntent={(intent) => {
        // Pass intent.legs[].positionId into your own authenticated RFQ flow.
      }}
    />
  );
}
```

`ComboIntent` is a UI handoff object, not an executable order. It is designed so
host applications can route selected legs into their own Polymarket Combo/RFQ
implementation.

## Defaults

- Direction defaults to `BUY`.
- Side defaults to `YES`.
- Builder code is optional and passed through only when supplied by the host app.
- Reference probability is display-only and should not be treated as an RFQ
  quote.
