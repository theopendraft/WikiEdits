import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md my-8">
          <strong>Something went wrong:</strong>
          <div className="mt-2 text-sm">{this.state.error?.message || String(this.state.error)}</div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
