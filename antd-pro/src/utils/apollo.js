import React from 'react';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { ApolloLink } from 'apollo-link';
// import { createUploadLink } from 'apollo-upload-client';
import { Modal } from 'antd';
import { history } from 'umi';
import persist from '@/utils/persist';
import { UNAUTHORIZED_ERROR } from '@/utils/constants';

export const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};

// const authLink = new ApolloLink((operation, forward) => {
//   if (persist?.token) {
//     operation.setContext(({ headers }) => ({
//       headers: {
//         Authorization: persist.token,
//         ...headers,
//       },
//     }));
//   }
//   return forward(operation);
// });

// log erors
const logError = (error, info) => console.error(error, info);

// check auth
const checkAuth = (errors) =>
  errors.length && errors.some((error) => error.message === UNAUTHORIZED_ERROR);

// create error link
const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation }) => {
    const { silent } = operation.getContext();

    let content = '未知错误...';

    if (graphQLErrors) {
      logError('GraphQL - Error', {
        errors: graphQLErrors,
        operationName: operation.operationName,
        variables: operation.variables,
      });

      if (checkAuth(graphQLErrors)) {
        console.log('invalid auth, logout');
        persist.clear();
        if (window.location.pathname !== '/user/login') {
          history.replace('/user/login');
        }
        return;
      }

      if (silent) return;

      content = graphQLErrors.map((error) => <p key={error.message}>{error.message}</p>);
      Modal.warning({
        title: 'Error',
        content,
      });
    }

    if (silent) return;

    if (networkError) {
      const error = (
        <>
          <div>StatusCode: {networkError.statusCode}</div>
          <div>operation: {operation.operationName}</div>
        </>
      );
      Modal.warning({
        title: 'Error',
        content: error,
      });
    }
  });

// http link
const createHttpLink = () =>
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  });

// export const createClient = (cache) => {
//   return new ApolloClient({
//     cache,
//     link: ApolloLink.from([createErrorLink(), authLink, createHttpLink()]),
//     defaultOptions: {
//       query: {
//         fetchPolicy: 'network-only',
//         errorPolicy: 'all',
//       },
//       mutate: {
//         errorPolicy: 'all',
//       },
//     },
//   });
// };

// export const createUploadClient = (cache) =>
//   new ApolloClient({
//     cache,
//     link: ApolloLink.from([createErrorLink(), authLink, createUploadLink({ uri: '/graphql' })]),
//   });

// export const client = createClient(createCache());
// export const uploadClient = createUploadClient(createCache());

const defaultNormalizer = (data) => data;
const checkData = (data) => {
  const { errors } = data;
  if (errors) {
    Modal.warning({
      title: 'Error',
      content: errors.fullMessages.map((m) => <div key={m}>{m}</div>),
    });
    return { errors };
  }
  return data;
};

export const request = (options) => {
  const { type, normalizer = defaultNormalizer, ...args } = options;
  return client[type]({ ...args })
    .then(checkData)
    .then(normalizer)
    .catch((errors) => ({ errors }));
};

// export const uploadRequest = (options) =>
//   uploadClient
//     .mutate(options)
//     .then(checkData)
//     .catch((errors) => ({ errors }));
