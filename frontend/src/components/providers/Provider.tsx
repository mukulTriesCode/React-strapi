import { ApolloProvider } from '@apollo/client/react';
import React from 'react'
import { client } from '../../utils/apolloClient';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider