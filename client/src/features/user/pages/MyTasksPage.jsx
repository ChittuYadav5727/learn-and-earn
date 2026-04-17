import { useEffect, useState } from 'react';
import EmptyState from '../../../components/common/EmptyState';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

export default function MyTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [submissionLinks, setSubmissionLinks] = useState({});
  const [message, setMessage] = useState('');

  function loadTasks() {
    userService.getTasks().then(setTasks).catch(() => setTasks([]));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleChange(id, value) {
    setSubmissionLinks((current) => ({ ...current, [id]: value }));
  }

  async function handleSubmit(id) {
    try {
      await userService.submitTask(id, submissionLinks[id]);
      setMessage('Task submitted successfully.');
      loadTasks();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Task submission failed.');
    }
  }

  return (
    <SectionCard title="My Task" subtitle="View assigned tasks and keep submission status up to date.">
      {message ? <p className="form-success">{message}</p> : null}
      {tasks.length === 0 ? (
        <EmptyState title="No tasks assigned" description="Accepted applications become tasks here." />
      ) : (
        <div className="stack-list">
          {tasks.map((task) => (
            <article key={task._id} className="surface-card nested-card">
              <div className="info-row">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.provider?.companyName}</p>
                </div>
                <span className="status-badge status-reviewing">{task.status}</span>
              </div>
              <p>{task.instructions}</p>
              <label className="form-field">
                <span>Submission link</span>
                <input
                  value={submissionLinks[task._id] || task.submissionLink || ''}
                  onChange={(event) => handleChange(task._id, event.target.value)}
                  placeholder="https://..."
                />
              </label>
              <button className="primary-button" onClick={() => handleSubmit(task._id)} type="button">
                Submit task
              </button>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
