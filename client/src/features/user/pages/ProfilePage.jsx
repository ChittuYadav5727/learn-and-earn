import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import FormField from '../../../components/forms/FormField';
import { userService } from '../../../services/userService';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    college: '',
    degree: '',
    graduationYear: '',
    location: '',
    bio: '',
    skills: '',
  });
  const [activity, setActivity] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    userService.getProfile().then((data) => {
      setActivity(data.activity);
      setProfile({
        name: data.profile?.name || '',
        phone: data.profile?.profile?.phone || '',
        college: data.profile?.profile?.college || '',
        degree: data.profile?.profile?.degree || '',
        graduationYear: data.profile?.profile?.graduationYear || '',
        location: data.profile?.profile?.location || '',
        bio: data.profile?.profile?.bio || '',
        skills: (data.profile?.profile?.skills || []).join(', '),
      });
    });
  }, []);

  function handleChange(event) {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await userService.updateProfile({
        ...profile,
        skills: profile.skills.split(',').map((item) => item.trim()).filter(Boolean),
      });
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Profile update failed.');
    }
  }

  return (
    <div className="page-stack">
      <section className="metrics-grid">
        <article className="metric-card">
          <span className="metric-label">Applications</span>
          <strong className="metric-value">{activity?.applications || 0}</strong>
        </article>
        <article className="metric-card">
          <span className="metric-label">Tasks</span>
          <strong className="metric-value">{activity?.tasks || 0}</strong>
        </article>
        <article className="metric-card">
          <span className="metric-label">Certificates</span>
          <strong className="metric-value">{activity?.certifications || 0}</strong>
        </article>
      </section>
      <SectionCard title="Profile" subtitle="Personal details, academic context, and activity overview.">
        <form className="two-column-form" onSubmit={handleSubmit}>
          <FormField label="Full name">
            <input name="name" value={profile.name} onChange={handleChange} />
          </FormField>
          <FormField label="Phone">
            <input name="phone" value={profile.phone} onChange={handleChange} />
          </FormField>
          <FormField label="College">
            <input name="college" value={profile.college} onChange={handleChange} />
          </FormField>
          <FormField label="Degree">
            <input name="degree" value={profile.degree} onChange={handleChange} />
          </FormField>
          <FormField label="Graduation year">
            <input name="graduationYear" value={profile.graduationYear} onChange={handleChange} />
          </FormField>
          <FormField label="Location">
            <input name="location" value={profile.location} onChange={handleChange} />
          </FormField>
          <FormField label="Skills" hint="Comma separated">
            <input name="skills" value={profile.skills} onChange={handleChange} />
          </FormField>
          <FormField label="Bio">
            <textarea name="bio" rows="5" value={profile.bio} onChange={handleChange} />
          </FormField>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="primary-button" type="submit">
            Save profile
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
