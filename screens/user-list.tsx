import React, { useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from '../components/utils/graphql-requests';
import { UserType } from '../components/interfaces/user-type';
import { Button, FAB } from 'react-native-paper';
import { Navigation } from 'react-native-navigation';

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
      <View style={styles.user}>
        <Text style={styles.item}>{`Nome : ${item.item.name}`}</Text>
        <Text style={styles.item}>{`Email : ${item.item.email}`}</Text>
        <Button mode='outlined' onPress={() => handleButtonPress(item.item.id)}>
          {'Ver perfil'}
        </Button>
      </View>
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
    <View style={styles.container}>
      <FAB style={styles.fab} small icon='plus' onPress={handleFABPress} />
      <FlatList data={users} onEndReached={handleEndReached} keyExtractor={(item) => item.id} renderItem={renderItem} />
      {error ?? <Text>{error}</Text>}
      {loading && <ActivityIndicator color='black' />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 14,
    height: 44,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  user: {
    borderStyle: 'solid',
    borderWidth: 3,
    marginBottom: 5,
  },
});
