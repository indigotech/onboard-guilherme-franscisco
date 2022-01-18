import styled from 'styled-components/native';
import { captionTextSize, captionTextWeigth, captionColor, marginTop } from './constants';

export const Caption = styled.Text`
  font-size: ${captionTextSize};
  font-weight: ${captionTextWeigth};
  color: ${captionColor};
  margin-top: ${marginTop};
`;
