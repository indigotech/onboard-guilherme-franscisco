import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from '../components/utils/graphql-requests';

const UserListScreen = () => {
  const [offset, setOffset] = useState(0);

  const { loading, error, data, refetch } = useQuery(getUsers, {
    variables: { offset: offset },
    notifyOnNetworkStatusChange: true,
  });

  const [users, setUser] = useState(data?.users.nodes);

  const UpdateOffset = () => {
    const last = data.users.nodes.length - 1;

    if (data?.users.nodes[last].id < data?.users.count) {
      setOffset(offset + 10);
      refetch({
        offset: offset,
      });
      setUser([...users, ...data?.users.nodes]);
    }
  };

  const renderItem = (item: any) => {
    return (
      <>
        <Text style={styles.item}>{`Nome : ${item.name}`}</Text>
        <Text style={styles.item}>{`Email : ${item.email}`}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        onEndReached={UpdateOffset}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
      />
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
export default UserListScreen;
