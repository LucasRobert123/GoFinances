import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from "victory-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { addMonths, subMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { HistoryCard } from "../../components/HistoryCard";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import { categories } from "../../utils/categories";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../hooks/auth";

type TransactionData = {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
};

type CategoryData = {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
};

export function Resume() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { colors, fonts } = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleDateChange = (action: "next" | "prev") => {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    let totalByCategory = [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acc: number, expensive: TransactionData) => {
        return acc + Number(expensive.amount);
      },
      0
    );

    categories.forEach((category) => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: useBottomTabBarHeight(),
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              colorScale={totalByCategories.map((t) => t.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontFamily: fonts.bold,
                  fill: colors.shape,
                },
              }}
              labelRadius={50}
              x="percent"
              y="total"
            />
          </ChartContainer>
          {totalByCategories.map((category) => (
            <HistoryCard
              key={category.key}
              title={category.name}
              amount={category.totalFormatted}
              color={category.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
