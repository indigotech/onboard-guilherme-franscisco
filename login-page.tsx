import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Input from './input';
import { StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { AsyncStorage } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mispelling, setMispelling] = useState(false);
  const [message, setMessage] = useState('');

  const loginMutation = gql`
    mutation Login($email: String!, $password: String!) {
      login(data: { email: $email, password: $password }) {
        token
      }
    }
  `;
  const [login] = useMutation(loginMutation);

  const OnPressHandler = () => {
    if (email === '' || password === '') {
      setMessage('Preencha a senha e/ou email');
    } else if (!email.match(`.*@.*\\.com`)) {
      setMessage('Insira um email válido');
    } else if (password.length < 7) {
      setMessage('Insira uma senha com pelo menos 7 caracteres');
      setMispelling(true);
    } else if (password.match('[A-Z]') == null || password.match('[a-z]') == null) {
      setMessage('Sua senha deve ser composta por caractere minúsculo e maiúsculo');
      setMispelling(true);
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
          setMispelling(true);
          setMessage(e.message);
        });
    }
    setMispelling(true);
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
      <Pressable style={styles.button} onPress={OnPressHandler}>
        <Text style={styles.buttonText}>{'Entrar'}</Text>
      </Pressable>
      {mispelling && <Text>{message}</Text>}
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

export default Login;
