import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Avatar, Button, Headline, Subheading } from 'react-native-paper';
import styled from 'styled-components/native';
import { getUser } from '../components/utils/graphql-requests';

export const UserDetails = (props: { id: string }) => {
  const { data, loading, error } = useQuery(getUser, {
    variables: { id: props.id },
  });

  const translateRole = () => {
    if (data?.user.role === 'user') {
      return 'Usuário';
    } else if (data?.user.role === 'admin') {
      return 'Administrador';
    }
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator color='black' />
      ) : (
        <Wrapper>
          <Avatar.Text label={`${data.user.name.substring(0, 2)}`} />
          <Headline>{data.user.name}</Headline>
          <Subheading>{data.user.birthDate.toString().split('-').reverse().join('/')}</Subheading>
          <Subheading>{translateRole()}</Subheading>
          <Button icon='email' mode='text'>
            {data.user.email}
          </Button>
          <Button icon='phone' mode='text'>
            {data.user.phone}
          </Button>
        </Wrapper>
      )}
      {error ?? <Text>{error}</Text>}
    </View>
  );
};

const Wrapper = styled.View`
  padding: 10%;
  align-items: center;
`;
