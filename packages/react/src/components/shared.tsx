import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function cx(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

export interface EmptyStateProps extends ComponentPropsWithoutRef<"div"> {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div className={cx("pui-panel pui-stack pui-empty-state", className)} {...props}>
      <strong>{title}</strong>
      {description ? <span className="pui-muted">{description}</span> : null}
      {action}
    </div>
  );
}
