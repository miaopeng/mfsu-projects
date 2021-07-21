import React from 'react';
import { getAuthority } from '@/utils/authority';

const auth = getAuthority();
console.log('auth', auth);

const Welcome = () => {
  return <h1>Welcome</h1>;
};

export default Welcome;
