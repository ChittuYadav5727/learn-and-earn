import { useEffect, useState } from 'react';
import EmptyState from '../../../components/common/EmptyState';
import SectionCard from '../../../components/common/SectionCard';
import { providerService } from '../../../services/providerService';

export default function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');

  async function loadPosts() {
    const response = await providerService.getOpportunities();
    setPosts(response);
  }

  useEffect(() => {
    loadPosts().catch(() => setPosts([]));
  }, []);

  async function handleToggle(post) {
    try {
      await providerService.updateOpportunity(post._id, {
        status: post.status === 'open' ? 'closed' : 'open',
      });
      setMessage('Post status updated.');
      loadPosts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not update post.');
    }
  }

  async function handleDelete(id) {
    try {
      await providerService.deleteOpportunity(id);
      setMessage('Post deleted.');
      loadPosts();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not delete post.');
    }
  }

  return (
    <SectionCard title="Manage posts" subtitle="Edit lifecycle state, close openings, or remove old posts.">
      {message ? <p className="form-success">{message}</p> : null}
      {posts.length === 0 ? (
        <EmptyState title="No posts yet" description="Create your first verified opportunity from the posting page." />
      ) : (
        <div className="stack-list">
          {posts.map((post) => (
            <article className="surface-card nested-card" key={post._id}>
              <div className="info-row">
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.type}</p>
                </div>
                <span className="status-badge status-reviewing">{post.status}</span>
              </div>
              <p>{post.description}</p>
              <div className="button-row">
                <button className="secondary-button" onClick={() => handleToggle(post)} type="button">
                  {post.status === 'open' ? 'Close post' : 'Reopen post'}
                </button>
                <button className="danger-button" onClick={() => handleDelete(post._id)} type="button">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
