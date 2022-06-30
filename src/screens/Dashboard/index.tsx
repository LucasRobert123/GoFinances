import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  TransactionsList,
  Title,
  LogoutButton,
} from "./styles";

type HighlightProps = {
  amount: string;
  lastTransaction: string;
};

type HighlightData = {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
};

export interface TransactionsListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionsListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const dataKey = "@gofinances:transactions";

  const getLastTransactionsDate = (
    data: TransactionsListProps[],
    type: "positive" | "negative"
  ) => {
    const lastTransactionsTime = data
      .filter((transaction) => transaction.type === type)
      .map((transaction) => new Date(transaction.date).getTime());

    if (lastTransactionsTime.length === 0) return;

    const lastTransactionDate = new Date(
      Math.max.apply(Math, lastTransactionsTime)
    );

    return `${lastTransactionDate.getDate()} de ${lastTransactionDate.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  const loadTransactions = async () => {
    const transactions: TransactionsListProps[] = JSON.parse(
      (await AsyncStorage.getItem(dataKey)) || "[]"
    );

    let entriesTotal = 0;
    let expensiveTotal = 0;
    const transactionsFormatted = transactions.map((transaction) => {
      if (transaction.type === "positive") {
        entriesTotal += Number(transaction.amount);
      } else if (transaction.type === "negative") {
        expensiveTotal += Number(transaction.amount);
      }

      const amount = Number(transaction.amount).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      const date = Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(new Date(transaction.date));

      return {
        ...transaction,
        amount,
        date,
      };
    });

    const total = entriesTotal - expensiveTotal;

    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionsDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpensives = getLastTransactionsDate(
      transactions,
      "negative"
    );

    const lastTransaction =
      lastTransactionsEntries || lastTransactionsExpensives;
    const totalInterval = `01 a ${lastTransaction}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionsEntries
          ? `Última entrada dia ${lastTransactionsEntries}`
          : "",
      },
      expensive: {
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: lastTransactionsExpensives
          ? `Última saída dia ${lastTransactionsExpensives}`
          : "",
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/50377159?v=4",
              }}
            />
            <User>
              <UserGreeting>Ola,</UserGreeting>
              <UserName>Lucas</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCards
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <HighlightCard
          type="up"
          title="Entradas"
          amount={highlightData.entries?.amount}
          lastTransaction={highlightData.entries?.lastTransaction}
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={highlightData.expensive?.amount}
          lastTransaction={highlightData.expensive?.lastTransaction}
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={highlightData.total?.amount}
          lastTransaction={highlightData.total?.lastTransaction}
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          renderItem={({ item }) => <TransactionCard data={item} />}
          keyExtractor={(item) => item.id}
        />
      </Transactions>
    </Container>
  );
}
