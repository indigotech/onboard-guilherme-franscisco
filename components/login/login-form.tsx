import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Input } from '../styled-components/input';
import { useMutation } from '@apollo/client';
import { AsyncStorage } from 'react-native';
import { loginMutation } from '../utils/graphql-requests';
import { Navigation } from 'react-native-navigation';
import { loginValidation } from './login-validations';
import styled from 'styled-components/native';
import { Button, ButtonText } from '../styled-components/button';
import { Header } from '../styled-components/header';
import { Caption } from '../styled-components/caption';

export const LoginForms = (props: { componentId: string }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useMutation(loginMutation);

  const changeNavigation = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserListScreen',
      },
    });
  };

  const loginRequest = async () => {
    try {
      setIsLoading(true);
      const data = await login({ variables: { email: email, password: password } });
      await AsyncStorage.setItem('token', data.data.login.token);
      changeNavigation();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
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
    <Wrapper>
      <Header>{'Bem-vindo(a) à Taqtile!'}</Header>
      <Input changeInputHandler={(input: string) => setEmail(input)} input={email} inputLabel={'Email'} />
      <Input
        changeInputHandler={(input: string) => setPassword(input)}
        input={password}
        inputLabel={'Senha'}
        secureTextEntry={true}
      />
      <Button onPress={handlePress} disabled={isLoading}>
        {isLoading && <ActivityIndicator />}
        <ButtonText>{isLoading ? 'Carregando' : 'Entrar'}</ButtonText>
      </Button>
      {showMessage && <Caption>{message}</Caption>}
    </Wrapper>
  );
};
const Wrapper = styled.View`
  padding-top: 30%;
  padding-left: 10%;
  padding-right: 10%;
`;
