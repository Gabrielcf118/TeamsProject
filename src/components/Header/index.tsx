import { View, Text } from "react-native";
import React from "react";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon color="#fff" />
        </BackButton>
      )}

      <Logo source={require("../../assets/logo.png")} />
    </Container>
  );
}
