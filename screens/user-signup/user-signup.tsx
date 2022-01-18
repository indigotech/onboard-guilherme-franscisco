import React, { useState } from 'react';
import { ActivityIndicator, Button, Platform, Text, View } from 'react-native';
import { UserRoler } from '../../components/serializes/user-roles';
import { Input } from '../../components/styled-components/input';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '@apollo/client';
import { createUser } from '../../components/utils/graphql-requests';
import { signUpValidations } from './user-signup-validations';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Navigation } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Caption } from '../../components/styled-components/caption';

export const UserSignUpScreen = (props: { componentId: string }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showBirthDate, setShowBirthDate] = useState('');

  const [email, setEmail] = useState('');
  const [role, setRole] = useState(UserRoler.user);
  const [messageValidation, setMessageValidation] = useState('');
  const [showMessageValidation, setShowMessageValidation] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const [signUp, { loading }] = useMutation(createUser);

  const dismissModal = () => {
    Navigation.dismissModal(props.componentId);
  };

  const signUpRequest = async () => {
    try {
      await signUp({
        variables: {
          name: name,
          phone: phone,
          birthDate: birthDate.toISOString().split('T')[0],
          email: email,
          role: UserRoler[role],
        },
      });
      dismissModal();
    } catch (err) {
      setMessageValidation(err.message);
    }
  };

  const handlePress = async () => {
    const [msg, valid] = signUpValidations(name, phone, birthDate, email);
    setMessageValidation(msg);
    if (valid) {
      signUpRequest();
    }
    setShowMessageValidation(true);
  };

  const handleDatePickerChange = (event: Event, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      setBirthDate(selectedDate);
      setShowBirthDate(selectedDate.toLocaleDateString().split('T')[0]);
    }
    setShowDatePicker(Platform.OS === 'ios');
  };

  return (
    <Wrapper>
      <Input changeInputHandler={(input: string) => setName(input)} input={name} inputLabel={'Nome'} />
      <Input changeInputHandler={(input: string) => setPhone(input)} input={phone} inputLabel={'Telefone'} />

      <View>
        <Text>{`Data de aniversário: ${showBirthDate}`}</Text>
        {Platform.OS === 'android' && (
          <Button title='Selecionar data de aniversário' onPress={() => setShowDatePicker(true)} />
        )}
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID='dateTimePicker'
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={handleDatePickerChange}
        />
      )}

      <Input changeInputHandler={(input) => setEmail(input)} input={email} inputLabel={'Email'} />

      <Picker selectedValue={role} onValueChange={(itemValue: React.SetStateAction<UserRoler>) => setRole(itemValue)}>
        <Picker.Item label='Usuário' value={UserRoler.user} />
        <Picker.Item label='Administrador' value={UserRoler.admin} />
      </Picker>

      <Pressable onPress={handlePress} disabled={loading}>
        {loading && <ActivityIndicator />}
        <PressableText>{loading ? 'Carregando' : 'Cadastrar'}</PressableText>
      </Pressable>
      {showMessageValidation && <Caption>{messageValidation}</Caption>}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  padding: 10%;
`;

const Pressable = styled.Pressable`
  padding: 5%;
  padding-left: 10%;
  margin-top: 10%;
  background-color: #a835de;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const PressableText = styled.Text`
  color: white;
`;
