import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;
