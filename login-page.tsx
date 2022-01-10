import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Input from './input';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { AsyncStorage } from 'react-native';
import { loginMutation } from './graphql-requests';
import { loginValidation } from './login-validations';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const [login] = useMutation(loginMutation);

  const loginRequest = async () => {
    try {
      const data = await login({ variables: { email: email, password: password } });
      await AsyncStorage.setItem('token', data.data.login.token);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePress = async () => {
    const [msg, valid] = loginValidation(email, password);
    setMessage(msg);
    if (valid) {
      loginRequest();
    }
    setShowMessage(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text>{'Bem-vindo(a) à Taqtile!'}</Text>
      </View>
      <Input changeInputHandler={(input: string) => setEmail(input)} input={email} inputLabel={'Email'} />
      <Input
        changeInputHandler={(input: string) => setPassword(input)}
        input={password}
        inputLabel={'Senha'}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{'Entrar'}</Text>
      </Pressable>
      {showMessage && <Text>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: '10%',
  },
  header: {
    paddingTop: '50%',
    alignItems: 'center',
  },
  button: {
    marginTop: '10%',
    backgroundColor: '#a835de',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '5%',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
  },
});

export default LoginPage;
