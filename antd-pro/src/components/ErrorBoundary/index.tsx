import React from 'react';
import { PageClientError, PageNetworkError } from '@/components/Exception';
import { reportError } from '@/hooks/useErrorReport';

interface S {
  hasError: boolean;
  errorType: 'client' | 'network';
}

export default class ErrorBoundary extends React.Component<any, S> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorType: 'client' as 'client' };
  }

  componentDidCatch(error: any, info: any) {
    const errorType = error && error.type === 'NetworkError' ? 'network' : 'client';
    this.setState({ hasError: true, errorType });
    reportError(error, info);
  }

  render() {
    const { hasError, errorType } = this.state;
    if (hasError) {
      return errorType === 'network' ? <PageNetworkError /> : <PageClientError />;
    }
    return this.props.children;
  }
}
