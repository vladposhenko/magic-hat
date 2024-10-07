import { Stack } from "expo-router";
import React from "react";

import { Text, TouchableOpacity } from "react-native";
import { useAppDispatch } from "@/hooks/redux";
import { resetAttempts } from "@/store/appReducer";
import { getCharacters } from "@/store/appActions";

const TabLayout = () => {
  const dispatch = useAppDispatch();

  const handleResetAttempts = () => {
    dispatch(resetAttempts());
    dispatch(getCharacters());
  };

  return (
    <Stack
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Home Screen",
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity onPress={handleResetAttempts}>
              <Text style={{ paddingRight: 15 }}>Reset</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
export default TabLayout