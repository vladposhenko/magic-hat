import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Text, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '@/hooks/redux';
import { resetAttempts } from '@/store/appReducer';
import { getCharacters } from '@/store/appActions';


const TabLayout = () => {
  const dispatch = useAppDispatch()
  const handleResetAttempts = () => {
    dispatch(resetAttempts())
    dispatch(getCharacters())
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'Home Screen',
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={handleResetAttempts}>
              <Text style={{ paddingRight: 15 }}>Reset</Text>
            </TouchableOpacity> 
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ), 
        }}
      />
      <Tabs.Screen
        name="appList"
        options={{
          title: 'List',
          headerTitle: 'List Screen',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleResetAttempts}>
              <Text style={{ paddingRight: 15 }}>Reset</Text>
            </TouchableOpacity> 
          ),
        }}
      />
    </Tabs>
  );
}
export default TabLayout
