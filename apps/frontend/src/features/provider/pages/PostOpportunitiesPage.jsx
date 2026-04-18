import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import FormField from '../../../components/forms/FormField';
import { providerService } from '../../../services/providerService';

export default function PostOpportunitiesPage() {
  const [dashboard, setDashboard] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'internship',
    workMode: 'remote',
    location: 'Remote',
    skills: '',
    stipend: '',
    duration: '',
    deadline: '',
    seats: 1,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    providerService.getDashboard().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await providerService.createOpportunity({
        ...form,
        skills: form.skills.split(',').map((item) => item.trim()).filter(Boolean),
        seats: Number(form.seats),
      });
      setMessage('Opportunity posted successfully.');
      setForm({
        title: '',
        description: '',
        type: 'internship',
        workMode: 'remote',
        location: 'Remote',
        skills: '',
        stipend: '',
        duration: '',
        deadline: '',
        seats: 1,
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not create opportunity.');
    }
  }

  const isApproved = dashboard?.gstStatus === 'approved';

  return (
    <div className="page-stack">
      <SectionCard title="Post opportunities" subtitle="Publish internships, jobs, freelance tasks, or competitions.">
        {!isApproved ? (
          <div className="alert-card">
            <h3>Posting locked</h3>
            <p>GST approval is required before a provider can post opportunities.</p>
          </div>
        ) : null}
        <form className="two-column-form" onSubmit={handleSubmit}>
          <FormField label="Title">
            <input disabled={!isApproved} name="title" value={form.title} onChange={handleChange} />
          </FormField>
          <FormField label="Type">
            <select disabled={!isApproved} name="type" value={form.type} onChange={handleChange}>
              <option value="internship">Internship</option>
              <option value="job">Job</option>
              <option value="freelance">Freelance task</option>
              <option value="competition">Competition</option>
            </select>
          </FormField>
          <FormField label="Work mode">
            <select disabled={!isApproved} name="workMode" value={form.workMode} onChange={handleChange}>
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </FormField>
          <FormField label="Location">
            <input disabled={!isApproved} name="location" value={form.location} onChange={handleChange} />
          </FormField>
          <FormField label="Skills" hint="Comma separated">
            <input disabled={!isApproved} name="skills" value={form.skills} onChange={handleChange} />
          </FormField>
          <FormField label="Compensation">
            <input disabled={!isApproved} name="stipend" value={form.stipend} onChange={handleChange} />
          </FormField>
          <FormField label="Duration">
            <input disabled={!isApproved} name="duration" value={form.duration} onChange={handleChange} />
          </FormField>
          <FormField label="Deadline">
            <input disabled={!isApproved} name="deadline" type="date" value={form.deadline} onChange={handleChange} />
          </FormField>
          <FormField label="Open seats">
            <input disabled={!isApproved} min="1" name="seats" type="number" value={form.seats} onChange={handleChange} />
          </FormField>
          <FormField label="Description">
            <textarea disabled={!isApproved} name="description" rows="5" value={form.description} onChange={handleChange} />
          </FormField>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="primary-button" disabled={!isApproved} type="submit">
            Post opportunity
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
