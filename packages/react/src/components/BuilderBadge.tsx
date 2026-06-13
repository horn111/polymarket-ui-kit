import type { BuilderProfile } from "@polymarket-ui-kit/core";

export interface BuilderBadgeProps {
  builder: BuilderProfile;
}

export function BuilderBadge({ builder }: BuilderBadgeProps) {
  const label = builder.handle ? `${builder.name} (${builder.handle})` : builder.name;

  return (
    <span className="pui-badge" title={builder.code ? `Builder code ${builder.code}` : undefined}>
      {builder.verified ? "Verified" : "Builder"}
      <strong>{label}</strong>
    </span>
  );
}

