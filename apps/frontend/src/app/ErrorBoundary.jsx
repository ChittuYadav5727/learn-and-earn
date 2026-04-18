import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error-state">
          <div className="surface-card error-boundary-card">
            <p className="eyebrow">Something went wrong</p>
            <h1>We hit an unexpected problem.</h1>
            <p>Please refresh the page to continue. If this persists, check the API server and environment setup.</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
