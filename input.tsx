import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { StyleSheet } from 'react-native';

interface InputProps {
  input: string;
  inputLabel: string;
  changeInputHandler: (text: string) => void;
}

const Input = (props: InputProps) => {
  return (
    <View>
      <Text style={styles.inputLabel}>{props.inputLabel}</Text>
      <TextInput style={styles.inputText} onChangeText={props.changeInputHandler} defaultValue={props.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    alignItems: 'flex-end',
    padding: '5%',
  },
  inputText: {
    paddingTop: '10%',
    paddingLeft: '10%',
    borderColor: 'gray',
    borderRadius: 20,
    paddingRight: '50%',
    borderWidth: 1,
  },
});

export default Input;
