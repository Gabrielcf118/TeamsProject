import { View, Text, FlatList, Alert, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import Header from "../../components/Header";
import Highlight from "../../components/Highlight";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";
import Filter from "../../components/Filter";
import PlayerCard from "../../components/PlayerCard";
import ListEmpty from "../../components/ListEmpty";
import Button from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "../../utils/AppError";
import { playerAddByGroup } from "../../storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "../../storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "../../storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/group/groupRemoveByName";
import Loading from "../../components/Loading";

type RouteParams = {
  group: string;
};

export default function Players() {
  const navigation = useNavigation();

  const [isloading, setIsLoading] = useState(true);
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      setNewPlayerName("");
      Keyboard.dismiss();
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova Pessoa", "Não foi possivel adicionar.");
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao carregar jogadores",
        "Não foi possivel carregar os jogadores."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemovePlayers(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Não foi possivel remover a pessoa.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("Groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Grupo", "Não foi possivel remover o grupo.");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover Grupo", "Deseja Remover o Grupo?", [
      { text: "Não", style: "cancel" },
      { text: "Remover", onPress: () => groupRemove() },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      {isloading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayers(item.name)}
            />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
        />
      )}
      <Button
        title="Remover times"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
}
