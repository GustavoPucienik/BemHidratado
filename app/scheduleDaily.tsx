import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@/app/contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { router } from 'expo-router';

export default function scheduleDaily () {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Notificação Diária</Text>

      <Text style={styles.label}>Escolha o horário:</Text>

      <BtnPrimary
        title={`Horário selecionado:  (alterar)`}
        onPress={null}
      />

      <BtnPrimary
        title="Agendar Notificação Diária"
        onPress={null}
      />
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: isDark ? '#3c3c3c' : '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: isDark ? '#ffffff' : '#000000',
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: isDark ? '#ffffff' : '#000000',
    },
  });
