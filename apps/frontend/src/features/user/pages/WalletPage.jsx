import { useEffect, useState } from 'react';
import MetricCard from '../../../components/common/MetricCard';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    userService.getWallet().then(setWallet).catch(() => setWallet(null));
  }, []);

  return (
    <div className="page-stack">
      <section className="metrics-grid">
        <MetricCard label="Current balance" value={`INR ${wallet?.balance || 0}`} />
        <MetricCard label="Total earned" value={`INR ${wallet?.totalEarned || 0}`} />
        <MetricCard label="Transactions" value={wallet?.transactions?.length || 0} />
      </section>
      <SectionCard title="Wallet activity" subtitle="Credits, debits, and payout-ready reward history.">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(wallet?.transactions || []).map((item, index) => (
                <tr key={`${item.title}-${index}`}>
                  <td>{item.title}</td>
                  <td>{item.type}</td>
                  <td>INR {item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
