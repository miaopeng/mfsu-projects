import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

const Layout: React.FC = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>;

export default Layout;
