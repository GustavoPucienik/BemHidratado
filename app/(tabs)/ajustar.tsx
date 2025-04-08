import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // mostra a notificação no app
    shouldPlaySound: true, // toca som (se configurado)
    shouldSetBadge: false, // ícone com número, só iOS
  }),
});


export default function Ajustes() {
  const [intervalo, setIntervalo] = useState<number>(60);
  const [lembreteAtivo, setLembreteAtivo] = useState(false);
  const [valorSalvo, setValorSalvo] = useState<number | null>(null);


  useEffect(() => {
    const carregarDados = async () => {
      // Solicitar permissão
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

      // Verificação normal
      const salvo = await AsyncStorage.getItem('waterTime');
      if (salvo) {
        setIntervalo(JSON.parse(salvo));
        setValorSalvo(JSON.parse(salvo));
      }

      const notificacoes = await Notifications.getAllScheduledNotificationsAsync();
      setLembreteAtivo(notificacoes.length > 0);
    };

    carregarDados();
    console.log(valorSalvo)
    console.log(intervalo)
  }, []);

  useEffect(() => {
   async function loopingNotif() {
    if(lembreteAtivo === true){
      const quantidade = 10;
  
      const agora = new Date();
    
      for (let i = 1; i <= quantidade; i++) {
        const proxima = new Date(agora.getTime() + i * intervalo * 60 * 1000);
        proxima.setSeconds(0); // deixa redondinho
    
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Hora de beber água 💧',
            body: 'Bora se hidratar!',
          },
          trigger: proxima as any,
        });
      }
    }
   }
   loopingNotif();
  },[lembreteAtivo])

  const atualizarLembrete = async () => {
    const proxima = new Date(Date.now() + intervalo * 60 * 1000);
    proxima.setSeconds(0);
  
    await Notifications.cancelAllScheduledNotificationsAsync();
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Hora de beber água 💧',
        body: 'Bora se hidratar!',
      },
      trigger: proxima as any,
    });
  
    await AsyncStorage.setItem('waterTime', JSON.stringify(intervalo));
    setValorSalvo(intervalo);
    Alert.alert('Lembrete atualizado', `Agora será a cada ${intervalo} minutos.`);
  };
  


  const ativarLembrete = async () => {
    console.log("Ativar lembrete iniciado")
    setLembreteAtivo(true);
    await AsyncStorage.setItem('waterTime', JSON.stringify(intervalo));
    setValorSalvo(intervalo);
    Alert.alert('Lembrete ativado', `Você será lembrado a cada ${intervalo} minutos.`);
  };
  
  
  

  const desativarLembrete = async () => {
    console.log("Desativar lembrete iniciado")
    await Notifications.cancelAllScheduledNotificationsAsync();
    AsyncStorage.removeItem('waterTime')
    setValorSalvo(null);
    setLembreteAtivo(false);
    Alert.alert('Lembrete desativado', 'Você não receberá mais notificações.');
  };

  const alternarLembrete = () => {
    if (lembreteAtivo) {
      desativarLembrete();
    } else {
      ativarLembrete();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: lembreteAtivo ? 'green' : 'red' }]}>
          {lembreteAtivo ? '✅ Lembrete está ativo' : '❌ Lembrete desativado'}
        </Text>
      </View>

      <Text style={styles.title}>Lembretes</Text>

      <Text style={styles.label}>Intervalo entre lembretes {`${valorSalvo? valorSalvo +" minutos": ""}`}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={intervalo}
          onValueChange={(itemValue) => setIntervalo(itemValue)}
          style={styles.picker}
          dropdownIconColor="#333"
        >
          <Picker.Item label="1 minuto" value={1} />
          <Picker.Item label="30 minutos" value={30} />
          <Picker.Item label="1 hora" value={60} />
          <Picker.Item label="1 hora e 30 min." value={90} />
          <Picker.Item label="2 horas" value={120} />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={alternarLembrete}>
        <Text style={styles.buttonText}>
          {lembreteAtivo ? 'Desativar lembrete' : 'Ativar lembrete'}
        </Text>
      </TouchableOpacity>
      {lembreteAtivo && intervalo != valorSalvo && (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#34c759', marginTop: 16 }]} onPress={atualizarLembrete}>
          <Text style={styles.buttonText}>
            Salvar novo intervalo
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 24,
    justifyContent: 'center',
  },
  statusContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
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
});
