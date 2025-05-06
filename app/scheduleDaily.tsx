import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TextInput } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AgendarDiario() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [repeticoes, setRepeticoes] = useState('30'); // Padrão: 30 dias
  const router = useRouter();

  useEffect(() => {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Lembretes diários',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default',
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#007aff',
    });
  }, []);

  const handleTimeChange = (_: any, date?: Date) => {
    setShowTimePicker(false);
    if (date) setSelectedTime(date);
  };

  const handleDailyNotify = async () => {
    const quantidadeDias = parseInt(repeticoes);
    if (isNaN(quantidadeDias) || quantidadeDias <= 0) {
      Alert.alert('Erro', 'Por favor, insira um número válido de dias.');
      return;
    }

    const notificacoes: Date[] = [];

    const hora = selectedTime.getHours();
    const minuto = selectedTime.getMinutes();

    const hoje = new Date();
    for (let i = 0; i < quantidadeDias; i++) {
      const dia = new Date(hoje);
      dia.setDate(hoje.getDate() + i);
      dia.setHours(hora);
      dia.setMinutes(minuto);
      dia.setSeconds(0);
      notificacoes.push(dia);
    }

    for (let i = 0; i < notificacoes.length; i++) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hora de beber água 💧',
          body: `Lembrete diário (${i + 1}/${quantidadeDias})`,
        },
        trigger: notificacoes[i] as any,
      });
    }

    Alert.alert('Notificações agendadas!', `Serão enviadas por ${quantidadeDias} dias.`);
    router.push('/(tabs)/schedule');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamento Diário</Text>

      <View style={styles.timeBox}>
        <Text style={styles.infoText}>
          Notificar todos os dias às:{' '}
          {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}

        <BtnPrimary title="Selecionar hora" onPress={() => setShowTimePicker(true)} />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={repeticoes}
          onChangeText={setRepeticoes}
          placeholder="Número de dias"
        />
      </View>

      <BtnPrimary title="Agendar notificação diária" onPress={handleDailyNotify} />
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1c1c1e' : '#f0faff',
      padding: 20,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ? '#ffffff' : '#007aff',
    },
    timeBox: {
      backgroundColor: isDark ? '#2c2c2e' : '#e6f0ff',
      borderRadius: 20,
      padding: 20,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: isDark ? '#3a3a3a' : '#cce0ff',
    },
    infoText: {
      fontSize: 16,
      color: isDark ? '#dddddd' : '#005bbb',
      textAlign: 'center',
      marginBottom: 16,
    },
    input: {
      marginTop: 12,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#3c3c3c' : '#fff',
      color: isDark ? '#fff' : '#000',
    },
  });
