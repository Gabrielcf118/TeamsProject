import { View, Text, FlatList, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import GroudCard from "../../components/GroupCard";
import ListEmpty from "../../components/ListEmpty";
import Button from "../../components/Button";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupsGetAll } from "../../storage/group/groupsGetAll";
import Loading from "../../components/Loading";

export default function Groups() {
  const navigation = useNavigation();

  const [isloading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  async function handleNewGroups() {
    navigation.navigate("New");
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await groupsGetAll();

      setGroups(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível carregar os grupos");
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroups(group: string) {
    navigation.navigate("Players", { group });
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com o seu grupo!" />

      {isloading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroudCard onPress={() => handleOpenGroups(item)} title={item} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
        />
      )}

      <Button title="Criar novo grupo" onPress={handleNewGroups} />
    </Container>
  );
}
