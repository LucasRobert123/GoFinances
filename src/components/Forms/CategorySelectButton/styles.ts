import styled, { css } from "styled-components/native";
import { TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton).attrs(
  () =>
    ({
      activeOpacity: 0.7,
    } as TouchableOpacityProps)
)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.shape};
  `}

  padding:18px 16px;
`;

export const Category = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.regular};
  `}
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  ${({ theme: { colors } }) => css`
    color: ${colors.text};
  `}
`;
