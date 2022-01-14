import React, { useRef } from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from '../components/utils/graphql-requests';
import { UserType } from '../components/interfaces/user-type';
import { Button, FAB } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Caption } from '../components/styled-components/caption';

const limit = 10;

export const UserListScreen = (props: { componentId: string }) => {
  const offsetRef = useRef(0);

  const [users, setUser] = React.useState<UserType[]>([]);

  const handleEndReached = () => {
    if (!loading && !error) {
      offsetRef.current += limit;
      refetch({ offset: offsetRef.current });
    }
  };

  const onCompleted = (newData: { users: { nodes: [UserType]; count: number } }) => {
    setUser((prev) => [...prev, ...newData?.users.nodes]);
  };

  const { loading, error, refetch } = useQuery(getUsers, {
    variables: { offset: offsetRef.current },
    notifyOnNetworkStatusChange: true,
    onCompleted: onCompleted,
  });

  const handleButtonPress = (id: string) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserDetails',
        passProps: {
          id: id,
        },
      },
    });
  };

  const renderItem = (item: { item: UserType }) => {
    return (
      <UserView>
        <UserData>{`Nome : ${item.item.name}`}</UserData>
        <UserData>{`Email : ${item.item.email}`}</UserData>
        <Button mode='outlined' onPress={() => handleButtonPress(item.item.id)}>
          Ver perfil
        </Button>
      </UserView>
    );
  };
  const handleFABPress = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'UserSignUpScreen',
            },
          },
        ],
      },
    });
  };

  return (
    <Container>
      <Fab small icon='plus' onPress={handleFABPress} />
      <FlatList data={users} onEndReached={handleEndReached} keyExtractor={(item) => item.id} renderItem={renderItem} />
      {error ?? <Caption>{error}</Caption>}
      {loading && <ActivityIndicator color='black' />}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 22px;
`;

const Fab = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const UserView = styled.View`
  border-style: solid;
  border-right-width: 0px;
  border-left-width: 0px;
  border-width: 3px;
  margin-bottom: 5px;
`;
const UserData = styled.Text`
  padding: 10px;
  font-size: 14px;
  height: 44px;
`;
