import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import {
  BorderlessButton,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { TransactionsListProps } from ".";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;

  margin-top: ${getStatusBarHeight()}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 24px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;
export const User = styled.View`
  margin-left: 17px;
`;
export const UserGreeting = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    color: ${colors.shape};
    font-family: ${fonts.regular};
  `}
  font-size: ${RFValue(18)}px;
`;
export const UserName = styled.Text`
  ${({ theme: { colors, fonts } }) => css`
    color: ${colors.shape};
    font-family: ${fonts.bold};
  `}
  font-size: ${RFValue(18)}px;
`;

export const LogoutButton = styled(BorderlessButton)``;
export const Icon = styled(Feather)`
  ${({ theme: { colors } }) => css`
    color: ${colors.secondary};
  `}
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs(() => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
}))`
  width: 100%;

  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  margin-bottom: 16px;

  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.regular};
  `}
`;

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<TransactionsListProps>
  ) => FlatList<TransactionsListProps>
).attrs(() => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() },
}))``;
