import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

interface InputProps {
  input: string;
  inputLabel: string;
  changeInputHandler: (text: string) => void;
  secureTextEntry?: boolean;
}

export const Input = (props: InputProps) => {
  return (
    <View>
      <Text style={styles.inputLabel}>{`${props.inputLabel}:`}</Text>
      <TextInput
        style={styles.inputText}
        onChangeText={props.changeInputHandler}
        defaultValue={props.input}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    alignItems: 'flex-end',
    padding: '5%',
  },
  inputText: {
    paddingLeft: '10%',
    paddingTop: '5%',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
  },
});
