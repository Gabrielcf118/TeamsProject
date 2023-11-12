import { View, Text, TextInputProps } from "react-native";
import React from "react";
import { Container } from "./styles";

export default function Input({ ...rest }: TextInputProps) {
  return <Container placeholderTextColor="#9999997a" {...rest} />;
}
