import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Type } from "./index";

type TypeProps = {
  type: Type;
};

export const Container = styled.View<TypeProps>`
  ${({ theme: { colors }, type }) => css`
    background-color: ${type === "total" ? colors.secondary : colors.shape};
  `}

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px ${RFValue(42)}px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-size: ${RFValue(14)}px;
  ${({ theme: { colors, fonts }, type }) => css`
    font-family: ${fonts.regular};
    color: ${type === "total" ? colors.shape : colors.text_dark};
  `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ type, theme: { colors } }) =>
    type === "up" &&
    css`
      color: ${colors.success};
    `}

  ${({ type, theme: { colors } }) =>
    type === "down" &&
    css`
      color: ${colors.attention};
    `}

  ${({ type, theme: { colors } }) =>
    type === "total" &&
    css`
      color: ${colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
  ${({ theme: { colors, fonts }, type }) => css`
    font-family: ${fonts.medium};
    color: ${type === "total" ? colors.shape : colors.text_dark};
  `}
  font-size: ${RFValue(32)}px;
  margin-top: 32px;
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-size: ${RFValue(12)}px;
  ${({ theme: { colors, fonts }, type }) => css`
    font-family: ${fonts.regular};
    color: ${type === "total" ? colors.shape : colors.text};
  `}
`;
