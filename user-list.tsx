import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@apollo/client';
import { getUsers } from './graphql-requests';

export const UserListScreen = () => {
  const { loading, error, data } = useQuery(getUsers);

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
      {loading ? <ActivityIndicator /> : <FlatList data={data?.users.nodes} renderItem={renderItem} />}
      {error ?? <Text>{error}</Text>}
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
