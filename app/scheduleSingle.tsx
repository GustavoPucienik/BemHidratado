import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import TimePickerCarousel from '@/components/TimePickerCarousel';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function agendarTime() {
  const { isDark, toggleTheme } = useTheme();
  const styles = getStyles(isDark);
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
    
    // Se o horário já passou hoje, agende para amanhã
    if(agora > proximoHorario ){
      proximoHorario.setDate(proximoHorario.getDate() + 1);
    }
    console.log("proximoHorario: ", proximoHorario);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de beber água 💧',
        body: 'Bora se hidratar!',
      },
      trigger: proximoHorario as any,
    });

    console.log('✅ Notificações agendadas com sucesso!');
    router.push('/(tabs)/schedule')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar notificação</Text>

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

      <BtnPrimary
        onPress={() => handleNotify(selectedHour, selectedMinute)}
        title="Agendar">
      </BtnPrimary>

    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#3c3c3c' : '#ffffff',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ? '#ffffff' : '#000000',
    },
    horarioTexto: {
      marginTop: 20,
      fontSize: 16,
      color: isDark ? '#dddddd' : '#333333',
    },
  });