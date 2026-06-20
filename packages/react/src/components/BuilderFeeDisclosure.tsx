import {
  formatCurrency,
  previewFees,
  type BuilderConfig,
  type BuilderFeeSide,
} from "@polymarket-ui-kit/core";
import { cx } from "./shared";
import { shortenBuilderCode } from "./builder-utils";

export interface BuilderFeeDisclosureProps {
  builder: BuilderConfig;
  side?: BuilderFeeSide | undefined;
  notional?: number | undefined;
  price?: number | undefined;
  platformFeeRate?: number | undefined;
  className?: string | undefined;
}

export function BuilderFeeDisclosure({
  builder,
  side = "taker",
  notional,
  price,
  platformFeeRate,
  className,
}: BuilderFeeDisclosureProps) {
  const feeBps =
    side === "maker" ? (builder.makerFeeBps ?? 0) : (builder.takerFeeBps ?? 0);
  const feePreview =
    notional === undefined
      ? null
      : previewFees({
          notional,
          price,
          platformFeeRate,
          builderFeeSide: side,
          builderMakerFeeBps: builder.makerFeeBps,
          builderTakerFeeBps: builder.takerFeeBps,
        });
  const codeLabel = builder.code
    ? shortenBuilderCode(builder.code)
    : "No code attached";

  return (
    <section className={cx("pui-builder-disclosure", className)}>
      <div className="pui-row" style={{ justifyContent: "space-between" }}>
        <span className="pui-builder-disclosure__status">
          {builder.code ? "Builder code attached" : "Builder code not attached"}
        </span>
        <span className="pui-muted">{side} fee</span>
      </div>

      <div className="pui-builder-disclosure__identity">
        <strong>{builder.name}</strong>
        {builder.handle ? <span>{builder.handle}</span> : null}
      </div>

      <dl className="pui-builder-disclosure__grid">
        <div>
          <dt>Code</dt>
          <dd>{codeLabel}</dd>
        </div>
        <div>
          <dt>{side === "maker" ? "Maker fee" : "Taker fee"}</dt>
          <dd>{feeBps} bps</dd>
        </div>
        <div>
          <dt>Estimated builder fee</dt>
          <dd>{feePreview ? formatCurrency(feePreview.builderFee) : "Set notional"}</dd>
        </div>
      </dl>
    </section>
  );
}
