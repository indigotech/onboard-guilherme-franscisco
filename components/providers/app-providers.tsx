import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AsyncStorage } from 'react-native';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const AppProviders: React.FC = (props) => {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>{props.children}</PaperProvider>
    </ApolloProvider>
  );
};
