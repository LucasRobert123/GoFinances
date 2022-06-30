import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  BorderlessButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
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

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 24px;
`;

export const MonthSelectButton = styled(BorderlessButton)``;

export const MonthSelectIcon = styled(Feather)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
