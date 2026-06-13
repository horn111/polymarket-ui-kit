import {
  formatCurrency,
  previewFees,
  type FeePreview,
  type FeePreviewInput,
} from "@polymarket-ui-kit/core";

export interface FeePillProps {
  preview?: FeePreview;
  input?: FeePreviewInput;
  label?: string;
}

export function FeePill({ preview, input, label = "Fees" }: FeePillProps) {
  const feePreview = preview ?? (input ? previewFees(input) : null);

  return (
    <span className="pui-badge" title="Estimated platform and builder fees">
      {label}
      <strong>{feePreview ? formatCurrency(feePreview.totalFee) : "-"}</strong>
    </span>
  );
}

