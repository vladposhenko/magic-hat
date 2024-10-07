import { Stack } from "expo-router";
import React from "react";

const TabLayout = () => {
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
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default TabLayout;
