/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Input from './input';
import { StyleSheet } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [misspelling, setMisspelling] = useState(false);
  const [message, setMessage] = useState('');

  const handlePress = () => {
    if (email === '' || password === '') {
      setMessage('Preencha a senha e/ou email');
      setMisspelling(true);
    } else if (!email.match(`.*@.*\\.com`)) {
      setMessage('Insira um email válido');
      setMisspelling(true);
    } else if (password.length < 7) {
      setMessage('Insira uma senha com pelo menos 7 caracteres');
      setMisspelling(true);
    } else if (password.match('[A-Z]') == null || password.match('[a-z]') == null) {
      setMessage('Sua senha deve ser composta por caractere minúsculo e maiúsculo');
      setMisspelling(true);
    } else {
      setMisspelling(false);
      setMessage('');
    }
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
      {misspelling && <Text>{message}</Text>}
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

export default App;
