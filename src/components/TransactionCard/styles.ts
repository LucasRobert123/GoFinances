import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type AmountProps = {
  type: "positive" | "negative";
};

export const Container = styled.View`
  border-radius: 5px;
  padding: 17px 24px;
  margin-bottom: ${RFValue(16)}px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.shape};
  `}
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.regular};
  `}
`;

export const Amount = styled.Text<AmountProps>`
  font-size: ${RFValue(20)}px;
  margin-top: 2px;

  ${({ theme: { fonts, colors }, type }) => css`
    font-family: ${fonts.regular};
    color: ${type === "positive" ? colors.sucess : colors.attention};
  `}
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  ${({ theme: { colors } }) => css`
    color: ${colors.text};
  `}
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  margin-left: 17px;

  ${({ theme: { colors } }) => css`
    color: ${colors.text};
  `}
`;

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme: { colors } }) => css`
    color: ${colors.text};
  `}
`;
