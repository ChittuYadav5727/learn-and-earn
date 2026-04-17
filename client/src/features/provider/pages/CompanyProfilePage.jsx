import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import StatusBadge from '../../../components/common/StatusBadge';
import FormField from '../../../components/forms/FormField';
import { providerService } from '../../../services/providerService';

export default function CompanyProfilePage() {
  const [form, setForm] = useState({
    companyName: '',
    companyEmail: '',
    industry: '',
    companySize: '',
    website: '',
    foundedYear: '',
    headquarters: '',
    description: '',
    contactName: '',
    contactDesignation: '',
    contactPhone: '',
  });
  const [status, setStatus] = useState('not_submitted');
  const [message, setMessage] = useState('');

  useEffect(() => {
    providerService.getProfile().then((data) => {
      setStatus(data.gstStatus);
      setForm({
        companyName: data.companyName || '',
        companyEmail: data.companyEmail || '',
        industry: data.companyDetails?.industry || '',
        companySize: data.companyDetails?.companySize || '',
        website: data.companyDetails?.website || '',
        foundedYear: data.companyDetails?.foundedYear || '',
        headquarters: data.companyDetails?.headquarters || '',
        description: data.companyDetails?.description || '',
        contactName: data.contactPerson?.name || '',
        contactDesignation: data.contactPerson?.designation || '',
        contactPhone: data.contactPerson?.phone || '',
      });
    });
  }, []);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const updated = await providerService.updateProfile(form);
      setStatus(updated.gstStatus);
      setMessage('Company profile updated.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Company profile update failed.');
    }
  }

  return (
    <div className="page-stack">
      <SectionCard
        title="Company profile"
        subtitle="Manage company identity, contact information, and verification state."
        actions={<StatusBadge status={status} />}
      >
        <form className="two-column-form" onSubmit={handleSubmit}>
          <FormField label="Company name">
            <input name="companyName" value={form.companyName} onChange={handleChange} />
          </FormField>
          <FormField label="Company email">
            <input name="companyEmail" value={form.companyEmail} onChange={handleChange} />
          </FormField>
          <FormField label="Industry">
            <input name="industry" value={form.industry} onChange={handleChange} />
          </FormField>
          <FormField label="Company size">
            <input name="companySize" value={form.companySize} onChange={handleChange} />
          </FormField>
          <FormField label="Website">
            <input name="website" value={form.website} onChange={handleChange} />
          </FormField>
          <FormField label="Founded year">
            <input name="foundedYear" value={form.foundedYear} onChange={handleChange} />
          </FormField>
          <FormField label="Headquarters">
            <input name="headquarters" value={form.headquarters} onChange={handleChange} />
          </FormField>
          <FormField label="Contact person">
            <input name="contactName" value={form.contactName} onChange={handleChange} />
          </FormField>
          <FormField label="Contact designation">
            <input name="contactDesignation" value={form.contactDesignation} onChange={handleChange} />
          </FormField>
          <FormField label="Contact phone">
            <input name="contactPhone" value={form.contactPhone} onChange={handleChange} />
          </FormField>
          <FormField label="Description">
            <textarea name="description" rows="5" value={form.description} onChange={handleChange} />
          </FormField>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="primary-button" type="submit">
            Save company profile
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
