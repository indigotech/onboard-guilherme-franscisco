import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Avatar, Button, Headline, Subheading } from 'react-native-paper';
import { UserType } from '../components/interfaces/user-type';
import { getUser } from '../components/utils/graphql-requests';

export const UserDetails = (props: { id: string }) => {
  const [user, setUser] = React.useState<UserType>({
    id: '',
    name: '',
    email: '',
    phone: '',
    birthDate: new Date(),
    password: '',
    role: '',
  });

  const onCompleted = (data: { user: UserType }) => {
    setUser(data.user);
  };

  const { loading, error } = useQuery(getUser, {
    variables: { id: props.id },
    onCompleted: onCompleted,
  });

  return (
    <View>
      {loading ? (
        <ActivityIndicator color='black' />
      ) : (
        <View style={styles.wrapper}>
          <Avatar.Text label={`${user.name.substring(0, 2)}`} />
          <Headline>{user.name}</Headline>
          <Subheading>{user.birthDate}</Subheading>
          <Subheading>{user.role}</Subheading>
          <Button icon='email' mode='text'>
            {user.email}
          </Button>
          <Button icon='phone' mode='text'>
            {user.phone}
          </Button>
        </View>
      )}
      {error ?? <Text>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: '10%',
    alignItems: 'center',
  },
});
