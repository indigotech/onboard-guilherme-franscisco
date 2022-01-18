import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  labelTextSize,
  labelTextWeigth,
  labelMarginBottom,
  fieldBorderWidth,
  fieldBorderColor,
  fieldBorderRaidus,
} from './constants';

interface InputProps {
  input: string;
  inputLabel: string;
  changeInputHandler: (text: string) => void;
  secureTextEntry?: boolean;
}

export const Input = (props: InputProps) => {
  return (
    <View>
      <InputLabel>{`${props.inputLabel}:`}</InputLabel>
      <InputText
        onChangeText={props.changeInputHandler}
        defaultValue={props.input}
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};
const InputLabel = styled.Text`
  align-items: flex-end;
  padding: 5%;
  font-size: ${labelTextSize};
  font-weight: ${labelTextWeigth};
  margin-bottom: ${labelMarginBottom};
`;

const InputText = styled.TextInput`
  padding-left: 10%;
  padding-top: 3%;
  border-color: ${fieldBorderColor};
  border-radius: ${fieldBorderRaidus};
  border-width: ${fieldBorderWidth};
`;
