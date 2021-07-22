import React from 'react';
import { getAuthority } from '@/utils/authority';

const authority = getAuthority('welcome');

const Welcome = () => {
  return <h1>Welcome {typeof authority}</h1>;
};

export default Welcome;
