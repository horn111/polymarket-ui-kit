import type { MarketComment } from "@polymarket-ui-kit/core";
import { formatRelativeTime } from "@polymarket-ui-kit/core";
import { EmptyState } from "./shared";

export interface CommentListProps {
  comments: MarketComment[];
  limit?: number;
}

export function CommentList({ comments, limit = 5 }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <EmptyState
        description="Show live community context when comments are available."
        title="No comments yet"
      />
    );
  }

  return (
    <section className="pui-panel pui-stack pui-comments">
      <div className="pui-row pui-between">
        <strong>Comments</strong>
        <span className="pui-muted">{comments.length}</span>
      </div>
      {comments.slice(0, limit).map((comment) => (
        <article className="pui-comment" key={comment.id}>
          <div className="pui-row pui-between">
            <strong>
              {comment.profile?.name ??
                comment.profile?.pseudonym ??
                comment.userAddress?.slice(0, 8) ??
                "Anon"}
            </strong>
            <span className="pui-muted">{formatRelativeTime(comment.createdAt)}</span>
          </div>
          <p className="pui-reset-margin">{comment.body}</p>
        </article>
      ))}
    </section>
  );
}
