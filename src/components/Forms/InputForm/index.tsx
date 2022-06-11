import React from "react";
import { Control, useController } from "react-hook-form";
import { TextInputProps } from "react-native";

import { Input } from "../Input";
import { Container, Error } from "./styles";

type Props = {
  control: Control;
  name: string;
  error: string;
} & TextInputProps;

export function InputForm({ control, name, error, ...rest }: Props) {
  const {
    field: { onChange, value },
  } = useController({ name, control });
  return (
    <Container>
      <Input onChangeText={onChange} value={value} {...rest} />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
