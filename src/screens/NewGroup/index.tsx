import { Alert, Keyboard } from "react-native";
import React, { useState } from "react";
import { Container, Content, Icon } from "./styles";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "../../storage/group/groupCreate";
import { AppError } from "../../utils/AppError";

export default function NewGroup() {
  const navigation = useNavigation();
  const [group, setGroup] = useState("");

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome do grupo");
      }
      await groupCreate(group);
      navigation.navigate("Players", { group });
      Keyboard.dismiss();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um grupo");
        console.log(error);
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Novo grupo"
          subtitle="Crie o grupo para adiconar as pessoas"
        />
        <Input onChangeText={setGroup} placeholder="Nome do grupo" />
        <Button style={{ marginTop: 20 }} title="Criar" onPress={handleNew} />
      </Content>
    </Container>
  );
}
