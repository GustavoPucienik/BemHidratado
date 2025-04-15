import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '../contexts/ThemeContext'; // Certifique-se do caminho correto

export default function TabLayout() {
  const { isDark } = useTheme();
  const activeColor = isDark ? '#fff' : '#fff';
  const inactiveColor = isDark ? '#888' : '#ccc';
  const backgroundColor = isDark ? '#111' : '#0aaaff';
  const tabBorderTopColor = isDark ? '#fff' : '#000';


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
          borderTopColor: tabBorderTopColor,
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
        name="schedule"
        options={{
          title: 'Agendar',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="notif.fill" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="gears.fill" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
