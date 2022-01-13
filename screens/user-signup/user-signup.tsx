import React, { useState } from 'react';
import { ActivityIndicator, Button, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { UserRoler } from '../../components/serializes/user-roles';
import { Input } from '../../components/utils/input';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '@apollo/client';
import { createUser } from '../../components/utils/graphql-requests';
import { signUpValidations } from './user-signup-validations';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Navigation } from 'react-native-navigation';

export const UserSignUpScreen = (props: { componentId: string }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showBirthDate, setShowBirthDate] = useState('');

  const [email, setEmail] = useState('');
  const [role, setRole] = useState(UserRoler.user);

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [show, setShow] = useState(false);

  const [signUp, { loading }] = useMutation(createUser);

  const changeNavigation = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserListScreen',
      },
    });
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
      changeNavigation();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handlePress = async () => {
    const [msg, valid] = signUpValidations(name, phone, birthDate, email);
    setMessage(msg);
    if (valid) {
      signUpRequest();
    }
    setShowMessage(true);
  };

  const onChangeHandler = (event: Event, selectedDate: Date | undefined) => {
    if (selectedDate !== undefined) {
      setBirthDate(selectedDate);
      setShowBirthDate(selectedDate.toLocaleDateString().split('T')[0]);
    }
    setShow(Platform.OS === 'ios');
  };

  return (
    <View style={styles.wrapper}>
      <Input changeInputHandler={(input: string) => setName(input)} input={name} inputLabel={'Nome'} />
      <Input changeInputHandler={(input: string) => setPhone(input)} input={phone} inputLabel={'Telefone'} />

      <View>
        <Text>{`Data de aniversário: ${showBirthDate}`}</Text>
        {Platform.OS === 'android' && <Button title='Selecionar data de aniversário' onPress={() => setShow(true)} />}
      </View>
      {(show || Platform.OS === 'ios') && (
        <DateTimePicker
          testID='dateTimePicker'
          value={new Date()}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={onChangeHandler}
        />
      )}

      <Input changeInputHandler={(input: string) => setEmail(input)} input={email} inputLabel={'Email'} />

      <Picker selectedValue={role} onValueChange={(itemValue: React.SetStateAction<UserRoler>) => setRole(itemValue)}>
        <Picker.Item label='Usuário' value={UserRoler.user} />
        <Picker.Item label='Administrador' value={UserRoler.admin} />
      </Picker>

      <Pressable style={styles.button} onPress={handlePress} disabled={loading}>
        {loading && <ActivityIndicator />}
        <Text style={styles.buttonText}>{loading ? 'Carregando' : 'Cadastrar'}</Text>
      </Pressable>
      {showMessage && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: '10%',
  },
  button: {
    padding: '5%',
    paddingLeft: '10%',
    marginTop: '10%',
    backgroundColor: '#a835de',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});