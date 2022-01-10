/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const UserListScreen = () => {
  const getUsers = gql`
    query {
      users {
        nodes {
          id
          name
          email
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(getUsers);
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.users.nodes}
        renderItem={({ item }) => (
          <>
            <Text style={styles.item}>{`Nome : ${item.name}`}</Text>
            <Text style={styles.item}>{`Email : ${item.email}`}</Text>
          </>
        )}
      />
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
