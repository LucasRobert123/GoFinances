import React from "react";
import {
  GestureHandlerRootView,
  RectButtonProps,
} from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";

import { Button, ImageContainer, Text } from "./styles";

type Props = RectButtonProps & {
  title: string;
  svg: React.FC<SvgProps>;
};

export function SignInSocialButton({ svg: Svg, title, ...rest }: Props) {
  return (
    <GestureHandlerRootView>
      <Button {...rest}>
        <ImageContainer>
          <Svg />
        </ImageContainer>

        <Text>{title}</Text>
      </Button>
    </GestureHandlerRootView>
  );
}
