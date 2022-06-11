import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;

  padding-bottom: 19px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.primary};
  `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;

  ${({ theme: { colors, fonts } }) => css`
    color: ${colors.shape};
    font-family: ${fonts.regular};
  `}
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;

  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;
