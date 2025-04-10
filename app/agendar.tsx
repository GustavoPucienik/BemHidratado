import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import TimePickerCarousel from '@/components/TimePickerCarousel'; // seu componente customizado

const Agendar = () => {
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const agendarNotificacao = async () => {
    const now = new Date();
    const agendado = new Date();
    agendado.setHours(parseInt(selectedHour));
    agendado.setMinutes(parseInt(selectedMinute));
    agendado.setSeconds(0);

    if (agendado <= now) {
      agendado.setDate(agendado.getDate() + 1); // agenda para o próximo dia
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hora de se hidratar 💧",
        body: "Não se esqueça de beber água!",
      },
      trigger: {
        hour: agendado.getHours(),
        minute: agendado.getMinutes(),
        repeats: true,
      },
      
    });

    Alert.alert("Agendado!", `Notificação marcada para ${selectedHour}:${selectedMinute}`);

    // volta para tela de agendados
    router.push('/(tabs)/agendados');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Notificação</Text>

      <TimePickerCarousel
        hour={selectedHour}
        minute={selectedMinute}
        setHour={setSelectedHour}
        setMinute={setSelectedMinute}
      />

      <TouchableOpacity style={styles.button} onPress={agendarNotificacao}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 15, backgroundColor: '#fff', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Agendar;
