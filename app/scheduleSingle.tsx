import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import TimePickerCarousel from '@/components/TimePickerCarousel';
import { useRouter } from 'expo-router';
import { useTheme } from './contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AgendarTime() {
  const { isDark, toggleTheme } = useTheme();
  const styles = getStyles(isDark); 
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateMode, setDateMode] = useState('date')
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

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const showMode = (mode:string) => {
    setDateMode(mode)
    setShowDatePicker(true)
  }

  const handleNotify = async (selectedDate: Date) => {
    
    const agora = new Date();
    const proximoHorario = new Date(selectedDate);
    
    // Se o horário já passou hoje, agende para amanhã
    if(agora > proximoHorario ){
      Alert.alert("Quase lá","Você selecionou uma data anterior a agora!", 
        [
          {text: "Desistir", onPress: () => router.push("/")},
          {text:"Escolher novamente"},
        ]);
      return;
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

      <View style={styles.dateTime}>
        <Text style={styles.horarioTexto}>
          Notificação será em: {selectedDate.toLocaleString()}
        </Text>

        {showDatePicker && (<DateTimePicker
        value={selectedDate}
        mode={dateMode}
        display="default"
        onChange={handleDateChange}
        />)}

        <View style={styles.btnGroup}>
          <BtnPrimary 
          title='Selecionar data'
          onPress={() => showMode('date')}
          />
          <BtnPrimary 
          title='Selecionar hora'
          onPress={() => showMode('time')}
          />
        </View>

      </View>

      <BtnPrimary
        onPress={() => handleNotify(selectedDate)}
        title="Agendar"
        //style={{ marginTop: 'auto' }}
      />

    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1c1c1e' : '#f0faff',
      padding: 20,
      paddingTop: 30,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20,
      color: isDark ? '#ffffff' : '#007aff',
    },
    dateTime: {
      backgroundColor: isDark ? '#2c2c2e' : '#e6f0ff', // azul bem clarinho
      borderRadius: 20,
      paddingVertical: 24,
      paddingHorizontal: 18,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: isDark ? '#3a3a3a' : '#cce0ff', // só contorno leve
    },
    btnGroup:{
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    horarioTexto: {
      fontSize: 16,
      color: isDark ? '#dddddd' : '#005bbb', // azul mais forte
      marginBottom: 16,
      textAlign: 'center',
    },
  });
