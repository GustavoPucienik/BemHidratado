import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';
  const activeColor = isDark ? '#111' : '#fff';
  const inactiveColor = isDark ? '#888' : '#ccc';
  const backgroundColor = isDark ? '#111' : '#0aaaff';
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 1,
          borderTopColor: isDark ? '#333' : '#000',
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 10 : 8,
          paddingTop: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="drop.fill" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ajustar"
        options={{
          title: 'Ajustes',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="notif.fill" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
