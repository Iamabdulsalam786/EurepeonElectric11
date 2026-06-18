import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('React render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', color: '#141417' }}>
          <h1 style={{ marginBottom: 12 }}>App failed to render</h1>
          <p style={{ marginBottom: 12 }}>This is the error causing the blank white screen:</p>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#b42318' }}>{this.state.error.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}
