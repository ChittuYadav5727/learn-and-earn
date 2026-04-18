import { useEffect, useState } from 'react';
import MetricCard from '../../../components/common/MetricCard';
import SectionCard from '../../../components/common/SectionCard';
import StatusBadge from '../../../components/common/StatusBadge';
import { providerService } from '../../../services/providerService';

export default function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    providerService.getDashboard().then(setData).catch(() => setData(null));
  }, []);

  return (
    <div className="page-stack">
      <section className="page-hero provider-banner">
        <div>
          <p className="eyebrow">Provider dashboard</p>
          <h1>{data?.provider?.companyName || 'Company workspace'}</h1>
          <p>Monitor GST status, posting volume, and applicant flow from one place.</p>
        </div>
        <div className="status-panel">
          <span>GST status</span>
          <StatusBadge status={data?.gstStatus || 'not_submitted'} />
        </div>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Total posts" value={data?.provider?.stats?.totalPosts || 0} />
        <MetricCard label="Active posts" value={data?.provider?.stats?.activePosts || 0} />
        <MetricCard label="Total applicants" value={data?.provider?.stats?.totalApplicants || 0} />
        <MetricCard label="Accepted" value={data?.provider?.stats?.acceptedApplicants || 0} />
      </section>

      <SectionCard title="Recent activity" subtitle="A quick view of recent posts and latest applicants.">
        <div className="split-grid">
          <div className="stack-list">
            {(data?.recentPosts || []).map((post) => (
              <article className="surface-card nested-card" key={post._id}>
                <h3>{post.title}</h3>
                <p>{post.type}</p>
                <p>Status: {post.status}</p>
              </article>
            ))}
          </div>
          <div className="stack-list">
            {(data?.recentApplicants || []).map((item) => (
              <article className="surface-card nested-card" key={item._id}>
                <h3>{item.user?.name}</h3>
                <p>{item.opportunity?.title}</p>
                <p>Status: {item.status}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
