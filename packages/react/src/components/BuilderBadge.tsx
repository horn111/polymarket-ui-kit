import type {
  BuilderConfig,
  BuilderFeeSide,
  BuilderProfile,
} from "@polymarket-ui-kit/core";
import { shortenBuilderCode } from "./builder-utils";

export interface BuilderBadgeProps {
  builder: BuilderProfile | BuilderConfig;
  showCode?: boolean | undefined;
  feeSide?: BuilderFeeSide | undefined;
  feeBps?: number | undefined;
}

export function BuilderBadge({
  builder,
  showCode = false,
  feeSide,
  feeBps,
}: BuilderBadgeProps) {
  const label = builder.handle ? `${builder.name} (${builder.handle})` : builder.name;
  const codeLabel = builder.code ? shortenBuilderCode(builder.code) : null;
  const feeLabel =
    feeBps === undefined || feeSide === undefined ? null : `${feeSide} ${feeBps} bps`;
  const titleParts = [
    builder.code ? `Builder code ${builder.code}` : null,
    feeLabel ? `Builder fee ${feeLabel}` : null,
  ].filter((value): value is string => Boolean(value));

  return (
    <span
      className="pui-badge"
      title={titleParts.length ? titleParts.join(". ") : undefined}
    >
      {builder.verified ? "Verified" : "Builder"}
      <strong>{label}</strong>
      {showCode && codeLabel ? <code>{codeLabel}</code> : null}
    </span>
  );
}
