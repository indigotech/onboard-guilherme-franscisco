import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Input from './input';
import { StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AsyncStorage } from 'react-native';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const loginMutation = gql`
    mutation Login($email: String!, $password: String!) {
      login(data: { email: $email, password: $password }) {
        token
      }
    }
  `;
  const [login] = useMutation(loginMutation);

  const handlePress = () => {
    if (email === '' || password === '') {
      setMessage('Preencha a senha e/ou email');
    } else if (!email.match(`.*@.*\\.com.*`)) {
      setMessage('Insira um email válido');
    } else if (password.length < 7) {
      setMessage('Insira uma senha com pelo menos 7 caracteres');
    } else {
      login({ variables: { email: email, password: password } })
        .then(async (data: any) => {
          try {
            await AsyncStorage.setItem('token', data.data.login.token);
            setMessage('Login feito com sucesso');
          } catch (error) {
            setMessage(error.message);
          }
        })
        .catch((e: Error) => {
          setMessage(e.message);
        });
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
