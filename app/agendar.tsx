import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import TimePickerCarousel from '@/components/TimePickerCarousel';
import { useRouter } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function agendar() {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const configurarNotificacoes = async () => {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Lembretes de hidratação',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#007aff',
      });

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert('Permissão negada', 'As notificações estão desativadas.');
        return;
      }
    };

    configurarNotificacoes();
  }, []);

  const handleNotify = async (selectedHour: number, selectedMinute: number) => {
    const notificacoes = await Notifications.getAllScheduledNotificationsAsync();

    const agora = new Date()
    const proximoHorario = new Date(
      agora.getFullYear(),
      agora.getMonth(),
      agora.getDate(),
      selectedHour, // hora
      selectedMinute   // minuto
    );
    console.log("proximoHorario: ", proximoHorario);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de beber água 💧',
        body: 'Bora se hidratar!',
      },
      trigger: proximoHorario as any,
    });

    console.log('✅ Notificações agendadas com sucesso!');
    router.push('/(tabs)/agendados')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>

      <TimePickerCarousel
        hour={selectedHour}
        minute={selectedMinute}
        setHour={setSelectedHour}
        setMinute={setSelectedMinute}
      />
      {(selectedHour !== null && selectedMinute !== null) && (
        <Text style={styles.horarioTexto}>
          Selecionado: {selectedHour.toString().padStart(2, '0')}:
          {selectedMinute.toString().padStart(2, '0')}
        </Text>
      )}

      <TouchableOpacity style={styles.button} onPress={() => handleNotify(selectedHour, selectedMinute)}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  horarioTexto: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
