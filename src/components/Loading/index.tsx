import { View, Text } from "react-native";
import React from "react";
import { Container, LoadIndicator } from "./styles";

export default function Loading() {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  );
}
