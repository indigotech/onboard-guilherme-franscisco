import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { UserRoler } from '../components/serializes/user-roles';
import Input from '../components/utils/input';
import { Picker } from '@react-native-picker/picker';

const UserSignUpScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(UserRoler.user);
  return (
    <View>
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <Input changeInputHandler={(input: string) => setName(input)} input={name} inputLabel={'Nome'} />
        <Input changeInputHandler={(input: string) => setPhone(input)} input={phone} inputLabel={'Telefone'} />
        <Input
          changeInputHandler={(input: string) => setBirthDate(input)}
          input={birthDate}
          inputLabel={'Data de aniversário'}
        />
        <Input changeInputHandler={(input: string) => setEmail(input)} input={email} inputLabel={'Email'} />
        <Picker selectedValue={role} onValueChange={(itemValue: React.SetStateAction<UserRoler>) => setRole(itemValue)}>
          <Picker.Item label='Usuário' value={UserRoler.user} />
          <Picker.Item label='Administrador' value={UserRoler.admin} />
        </Picker>
      </KeyboardAvoidingView>
    </View>
  );
};
export default UserSignUpScreen;
