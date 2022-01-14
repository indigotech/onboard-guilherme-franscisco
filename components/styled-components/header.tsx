import styled from 'styled-components/native';
import { headerMarginBottom, headerMarginTop, headerTextSize, headerTextWeigth } from './constants';

export const Header = styled.Text`
  align-items: center;
  text-align: center;
  font-size: ${headerTextSize};
  font-weight: ${headerTextWeigth};
  margin-top: ${headerMarginTop};
  margin-bottom: ${headerMarginBottom};
`;
