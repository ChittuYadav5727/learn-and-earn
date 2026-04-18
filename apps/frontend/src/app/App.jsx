import ErrorBoundary from './ErrorBoundary';
import { ToastProvider } from './ToastContext';
import AppRouter from '../routes/AppRouter';

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </ErrorBoundary>
  );
}
