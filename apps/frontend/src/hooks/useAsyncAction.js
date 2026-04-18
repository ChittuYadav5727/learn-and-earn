import { useState } from 'react';

export function useAsyncAction(action) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function execute(...args) {
    try {
      setLoading(true);
      setError('');
      return await action(...args);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { execute, loading, error, setError };
}
