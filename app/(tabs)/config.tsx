import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import BtnSecondary from '@/components/Buttons/BtnSecondary';
import { useTheme } from '../contexts/ThemeContext';

const Config = () => {
  const { isDark, toggleTheme } = useTheme();
  const styles = getStyles(isDark);
  
  const limparLembretes = async () => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      Alert.alert('Sucesso', 'Todos os lembretes foram apagados.');
    } catch (error) {
      console.error('Erro ao limpar lembretes:', error);
      Alert.alert('Erro', 'Não foi possível apagar os lembretes.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <BtnPrimary
        title="Alternar tema"
        onPress={toggleTheme}
      />
      <BtnSecondary
        title="Limpar Lembretes"
        onPress={limparLembretes}
      />
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#3c3c3c' : '#ffffff',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 30,
      color: isDark ? '#fff' : '#000',
      marginBottom: 'auto',
    },
  });


export default Config;
