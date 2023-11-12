import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "../screens/Groups";
import Players from "../screens/Players";
import NewGroup from "../screens/NewGroup";

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Groups"
      >
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="New" component={NewGroup} />
        <Stack.Screen name="Players" component={Players} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
