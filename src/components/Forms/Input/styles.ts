import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.TextInput`
  width: 100%;
  padding: 16px 18px;

  font-size: ${RFValue(14)}px;

  border-radius: 5px;
  margin-bottom: 8px;

  ${({ theme: { colors, fonts } }) => css`
    background-color: ${colors.shape};
    font-family: ${fonts.regular};
    color: ${colors.text};
  `}
`;
