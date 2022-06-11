import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import { Container, Icon, Title, Button } from "./styles";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

type Props = {
  title: string;
  type: "up" | "down";
  isActive: boolean;
} & RectButtonProps;

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: Props) {
  return (
    <Container isActive={isActive} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
