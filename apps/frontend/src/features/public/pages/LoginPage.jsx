import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AuthForm from '../../../components/forms/AuthForm';
import { useAuth } from '../../../hooks/useAuth';
import { useAsyncAction } from '../../../hooks/useAsyncAction';
import { useToast } from '../../../hooks/useToast';
import { authService } from '../../../services/authService';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '', role: 'auto' });
  const [socialProviders, setSocialProviders] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { execute, loading, error } = useAsyncAction(authService.login);
  const { showToast } = useToast();

  useEffect(() => {
    authService.getSocialProviders().then(setSocialProviders).catch(() => setSocialProviders([]));
  }, []);

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const session = await execute(values);
      login(session);
      showToast({ title: 'Welcome back', description: 'Your workspace is ready.', tone: 'success' });

      const fallback = session.user.role === 'provider' ? '/provider/dashboard' : '/user/learn-earn';
      navigate(location.state?.from || fallback, { replace: true });
    } catch {}
  }

  async function handleSocialAuth(provider) {
    try {
      const response = await authService.getSocialRedirect(provider.id);
      window.location.href = response.authUrl;
    } catch {
      showToast({
        title: `${provider.label} unavailable`,
        description: 'Add the provider auth URL in the server environment to enable social login.',
        tone: 'error',
      });
      navigate('/', { replace: true });
    }
  }

  return (
    <main className="auth-page">
      <AuthForm
        title="Welcome back"
        description="Sign in to your learner or provider workspace."
        fields={[
          { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
          { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
          {
            name: 'role',
            label: 'Login as',
            type: 'select',
            options: [
              { label: 'Auto detect', value: 'auto' },
              { label: 'Learner', value: 'user' },
              { label: 'Provider', value: 'provider' },
            ],
          },
        ]}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        submitLabel="Login"
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
            Need an account? <Link to="/register">Register now</Link>
          </p>
        }
      />
    </main>
  );
}
