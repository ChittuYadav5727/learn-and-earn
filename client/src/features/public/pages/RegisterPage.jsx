import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import AuthForm from '../../../components/forms/AuthForm';
import { useAuth } from '../../../hooks/useAuth';
import { useAsyncAction } from '../../../hooks/useAsyncAction';
import { useToast } from '../../../hooks/useToast';
import { authService } from '../../../services/authService';

const learnerFields = [
  { name: 'name', label: 'Full name', type: 'text', placeholder: 'Aarav Sharma' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'aarav@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Minimum 6 characters' },
  {
    name: 'selectedMode',
    label: 'Starting mode',
    type: 'select',
    options: [
      { label: 'Learn', value: 'learn' },
      { label: 'Earn', value: 'earn' },
    ],
  },
  { name: 'college', label: 'College', type: 'text', placeholder: 'Your college name' },
];

const providerFields = [
  { name: 'companyName', label: 'Company name', type: 'text', placeholder: 'Northstar Labs' },
  { name: 'companyEmail', label: 'Company email', type: 'email', placeholder: 'hr@northstar.com' },
  { name: 'industry', label: 'Industry', type: 'text', placeholder: 'EdTech' },
  { name: 'email', label: 'Admin login email', type: 'email', placeholder: 'admin@northstar.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Minimum 6 characters' },
  { name: 'headquarters', label: 'Headquarters', type: 'text', placeholder: 'Bengaluru, India' },
];

export default function RegisterPage() {
  const [role, setRole] = useState('user');
  const [socialProviders, setSocialProviders] = useState([]);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    selectedMode: 'learn',
    college: '',
    companyName: '',
    companyEmail: '',
    industry: '',
    headquarters: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const { execute, loading, error } = useAsyncAction((payload) =>
    role === 'provider' ? authService.registerProvider(payload) : authService.registerUser(payload)
  );
  const { showToast } = useToast();

  const fields = useMemo(() => (role === 'provider' ? providerFields : learnerFields), [role]);

  useEffect(() => {
    authService.getSocialProviders().then(setSocialProviders).catch(() => setSocialProviders([]));
  }, []);

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload =
      role === 'provider'
        ? {
            companyName: values.companyName,
            companyEmail: values.companyEmail,
            industry: values.industry,
            email: values.email,
            password: values.password,
            headquarters: values.headquarters,
          }
        : {
            name: values.name,
            email: values.email,
            password: values.password,
            selectedMode: values.selectedMode,
            college: values.college,
          };

    try {
      const session = await execute(payload);
      login(session);
      showToast({
        title: 'Account created',
        description: role === 'provider' ? 'Provider workspace created successfully.' : 'Learner workspace created successfully.',
        tone: 'success',
      });
      navigate(role === 'provider' ? '/provider/dashboard' : '/user/learn-earn', { replace: true });
    } catch {}
  }

  async function handleSocialAuth(provider) {
    try {
      const response = await authService.getSocialRedirect(provider.id);
      window.location.href = response.authUrl;
    } catch {
      showToast({
        title: `${provider.label} unavailable`,
        description: 'Configure the provider auth URL on the backend to enable this flow.',
        tone: 'error',
      });
      navigate('/', { replace: true });
    }
  }

  return (
    <main className="auth-page">
      <div className="role-tabs">
        <button className={role === 'user' ? 'primary-button' : 'secondary-button'} onClick={() => setRole('user')} type="button">
          Learner
        </button>
        <button className={role === 'provider' ? 'primary-button' : 'secondary-button'} onClick={() => setRole('provider')} type="button">
          Provider
        </button>
      </div>
      <AuthForm
        title={role === 'provider' ? 'Create provider account' : 'Create learner account'}
        description={
          role === 'provider'
            ? 'Set up your company workspace. GST verification can be completed after registration.'
            : 'Get started with a learner account and choose your starting mode.'
        }
        fields={fields}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Register"
        topContent={
          socialProviders.length ? (
            <div className="social-auth-panel">
              {socialProviders.map((provider) => (
                <button
                  key={provider.id}
                  className={`social-auth-button${provider.isEnabled ? '' : ' is-unavailable'}`}
                  type="button"
                  onClick={() => handleSocialAuth(provider)}
                  title={provider.isEnabled ? provider.label : `${provider.label} is not configured yet`}
                >
                  {provider.label}
                </button>
              ))}
            </div>
          ) : null
        }
        footer={
          <p>
            Already registered? <Link to="/login">Login</Link>
          </p>
        }
      />
    </main>
  );
}
