import React from "react";

import { View } from "react-native";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

type Category = {
  name: string;
  icon: string;
};

export type TransactionCardProps = {
  type: "positive" | "negative";
  title: string;
  amount: string;
  category: Category;
  date: string;
};

type Props = {
  data: TransactionCardProps;
};

export function TransactionCard({
  data: { title, amount, category, date, type },
}: Props) {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
