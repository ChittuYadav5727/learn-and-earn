import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

export default function LeaderboardPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    userService.getLeaderboard().then(setRows).catch(() => setRows([]));
  }, []);

  return (
    <SectionCard title="Leaderboard" subtitle="Top users based on platform points and earnings momentum.">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>College</th>
              <th>Points</th>
              <th>Earnings</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row._id}>
                <td>#{row.rank}</td>
                <td>{row.name}</td>
                <td>{row.profile?.college || '-'}</td>
                <td>{row.stats?.points || 0}</td>
                <td>INR {row.stats?.earnings || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
