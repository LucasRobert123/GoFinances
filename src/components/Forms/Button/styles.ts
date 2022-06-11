import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  border-radius: 5px;
  padding: 18px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.secondary};
  `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  text-align: center;

  ${({ theme: { colors, fonts } }) => css`
    font-family: ${fonts.medium};
    color: ${colors.shape};
  `}
`;
