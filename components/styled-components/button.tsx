import styled from 'styled-components/native';
import { buttonBackgroundColor, buttonHeight, buttonTextColor, buttonTextSize, buttontTextWeigth } from './constants';

export const Button = styled.Pressable`
  margin-top: 10%;
  background-color: ${buttonBackgroundColor};
  align-items: center;
  justify-content: center;
  padding-vertical: 5%;
  border-radius: 10px;
  height: ${buttonHeight};
`;

export const ButtonText = styled.Text`
  color: ${buttonTextColor};
  font-size: ${buttonTextSize};
  font-weight: ${buttontTextWeigth};
`;
