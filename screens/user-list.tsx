import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from '../components/utils/graphql-requests';

export const UserListScreen = () => {
  const [offset, setOffset] = useState(0);

  const [users, setUser] = useState([]);

  const onCompleted = (data: any) => {
    console.log(data);
    setUser((prev) => [...prev, ...data?.users.nodes] as any);
  };
  const { loading, error, data } = useQuery(getUsers, {
    variables: { offset: offset },
    notifyOnNetworkStatusChange: true,
    onCompleted: onCompleted,
  });

  const handleEndReached = () => {
    if (users.length + 10 < data?.users.count) {
      setOffset(offset + 10);
    }
  };

  const renderItem = (item: any) => {
    return (
      <>
        <Text style={styles.item}>{`Nome : ${item.item.name}`}</Text>
        <Text style={styles.item}>{`Email : ${item.item.email}`}</Text>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        onEndReached={handleEndReached}
        keyExtractor={(_item, index) => String(index)}
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
