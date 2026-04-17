import FormField from './FormField';

export default function AuthForm({
  title,
  description,
  fields,
  values,
  onChange,
  onSubmit,
  loading,
  error,
  submitLabel,
  topContent,
  footer,
}) {
  return (
    <div className="auth-card">
      <div className="auth-copy">
        <p className="eyebrow">Learn & Earn</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <ul className="auth-benefits">
          <li>Skill tracks aligned to portfolio outcomes</li>
          <li>Verified opportunities and progress-based earning loops</li>
          <li>Secure workspace flows for learners and providers</li>
        </ul>
      </div>
      <form className="auth-form" onSubmit={onSubmit}>
        {topContent ? <div className="auth-top-content">{topContent}</div> : null}
        {fields.map((field) => (
          <FormField key={field.name} label={field.label} hint={field.hint}>
            {field.type === 'select' ? (
              <select name={field.name} value={values[field.name] || ''} onChange={onChange}>
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea
                name={field.name}
                rows={field.rows || 4}
                value={values[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                name={field.name}
                type={field.type}
                value={values[field.name] || ''}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            )}
          </FormField>
        ))}
        {error ? <p className="form-error">{error}</p> : null}
        <button className="primary-button" disabled={loading} type="submit">
          {loading ? 'Please wait...' : submitLabel}
        </button>
        {footer ? <div className="auth-footer">{footer}</div> : null}
      </form>
    </div>
  );
}
