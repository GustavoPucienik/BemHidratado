import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

const Config = () => {
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

      <TouchableOpacity style={styles.button} onPress={limparLembretes}>
        <Text style={styles.buttonText}>Limpar Lembretes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  button: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Config;
