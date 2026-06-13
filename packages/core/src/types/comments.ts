export interface CommentProfile {
  name?: string | null | undefined;
  pseudonym?: string | null | undefined;
  displayUsernamePublic?: boolean | null | undefined;
  bio?: string | null | undefined;
  isMod?: boolean | null | undefined;
  isCreator?: boolean | null | undefined;
  proxyWallet?: string | null | undefined;
  baseAddress?: string | null | undefined;
  profileImage?: string | null | undefined;
}

export interface MarketComment {
  id: string;
  body: string | null;
  parentEntityType?: string | null | undefined;
  parentEntityID?: number | null | undefined;
  parentCommentID?: string | null | undefined;
  userAddress?: string | null | undefined;
  replyAddress?: string | null | undefined;
  createdAt?: string | null | undefined;
  updatedAt?: string | null | undefined;
  profile?: CommentProfile | null | undefined;
  reactionCount?: number | null | undefined;
  reportCount?: number | null | undefined;
  raw?: unknown | undefined;
}

export interface ListCommentsParams {
  limit?: number | undefined;
  offset?: number | undefined;
  order?: string | undefined;
  ascending?: boolean | undefined;
  parentEntityType?: "Event" | "Series" | "market" | undefined;
  parentEntityId?: number | undefined;
  getPositions?: boolean | undefined;
  holdersOnly?: boolean | undefined;
}
