import { useEffect, useState } from 'react';
import SectionCard from '../../../components/common/SectionCard';
import StatusBadge from '../../../components/common/StatusBadge';
import FormField from '../../../components/forms/FormField';
import { providerService } from '../../../services/providerService';

export default function GstVerificationPage() {
  const [record, setRecord] = useState(null);
  const [form, setForm] = useState({
    gstNumber: '',
    legalCompanyName: '',
    registeredAddress: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    providerService.getGst().then((data) => {
      setRecord(data);
      if (data) {
        setForm({
          gstNumber: data.gstNumber || '',
          legalCompanyName: data.legalCompanyName || '',
          registeredAddress: data.registeredAddress || '',
        });
      }
    });
  }, []);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await providerService.submitGst(form);
      const updated = await providerService.getGst();
      setRecord(updated);
      setMessage('GST details submitted successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'GST submission failed.');
    }
  }

  return (
    <div className="page-stack">
      <SectionCard title="GST verification" subtitle="Posting is blocked until this verification is approved.">
        <div className="info-row">
          <div>
            <strong>Current status</strong>
            <p>Admin-ready review support is scaffolded in the backend.</p>
          </div>
          <StatusBadge status={record?.status || 'not_submitted'} />
        </div>
      </SectionCard>
      <SectionCard title="Submit or resubmit GST details">
        <form className="two-column-form" onSubmit={handleSubmit}>
          <FormField label="GST number">
            <input name="gstNumber" value={form.gstNumber} onChange={handleChange} />
          </FormField>
          <FormField label="Legal company name">
            <input name="legalCompanyName" value={form.legalCompanyName} onChange={handleChange} />
          </FormField>
          <FormField label="Registered address">
            <textarea name="registeredAddress" rows="4" value={form.registeredAddress} onChange={handleChange} />
          </FormField>
          {message ? <p className="form-success">{message}</p> : null}
          <button className="primary-button" type="submit">
            Submit GST verification
          </button>
        </form>
      </SectionCard>
    </div>
  );
}
