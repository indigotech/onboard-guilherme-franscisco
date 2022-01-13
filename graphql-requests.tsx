import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export const getUsers = gql`
  query {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;
