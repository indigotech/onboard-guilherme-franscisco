import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
    }
  }
`;

export const getUsers = gql`
  query getUsers($offset: Int!) {
    users(pageInfo: { offset: $offset }) {
      nodes {
        id
        name
        email
      }
      count
    }
  }
`;

export const createUser = gql`
  mutation createUser($name: String!, $phone: String!, $birthDate: Date!, $email: String!, $role: UserRole!) {
    createUser(data: { name: $name, phone: $phone, birthDate: $birthDate, email: $email, role: $role }) {
      name
    }
  }
`;

export const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      name
      phone
      birthDate
      email
      role
    }
  }
`;
