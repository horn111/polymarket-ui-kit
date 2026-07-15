import { formatCurrency, type TraderLeaderboardRow } from "@polymarket-ui-kit/core";
import { EmptyState } from "./shared";

export interface LeaderboardTableProps {
  rows: TraderLeaderboardRow[];
}

export function LeaderboardTable({ rows }: LeaderboardTableProps) {
  if (rows.length === 0) {
    return <EmptyState title="No leaderboard rows" />;
  }

  return (
    <div className="pui-panel pui-leaderboard">
      <table className="pui-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Trader</th>
            <th>Volume</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.rank}-${row.wallet}`}>
              <td>{row.rank}</td>
              <td>{row.name ?? `${row.wallet.slice(0, 6)}...${row.wallet.slice(-4)}`}</td>
              <td>{formatCurrency(row.volume, { compact: true })}</td>
              <td>{formatCurrency(row.profit, { compact: true })}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
