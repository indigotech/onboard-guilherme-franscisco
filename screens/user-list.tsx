import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from '../components/utils/graphql-requests';
import { UserType } from '../components/interfaces/user-type';

export const UserListScreen = () => {
  const [offset, setOffset] = useState(0);

  const [users, setUser] = React.useState<UserType[]>([]);

  const limit = 10;

  const onCompleted = (data: { users: { nodes: [UserType]; count: number } }) => {
    setUser((prev) => [...prev, ...data?.users.nodes]);
  };
  const { loading, error, data } = useQuery(getUsers, {
    variables: { offset: offset },
    notifyOnNetworkStatusChange: true,
    onCompleted: onCompleted,
  });

  const handleEndReached = () => {
    if (data !== undefined && users.length + limit < data.users.count) {
      setOffset(offset + limit);
    }
  };

  const renderItem = (item: { item: UserType }) => {
    return (
      <>
        <Text style={styles.item}>{`Nome : ${item.item.name}`}</Text>
        <Text style={styles.item}>{`Email : ${item.item.email}`}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
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
});
