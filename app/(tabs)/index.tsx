import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // mostra a notificação no app
    shouldPlaySound: true, // toca som (se configurado)
    shouldSetBadge: false, // ícone com número, só iOS
  }),
});



export default function HomeScreen() {
  const [quantidade, setQuantidade] = useState(0);

    useEffect(() => {
      const configurarNotificacoes = async () => {
        // Criar canal de notificação (requerido no Android)
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Lembretes de hidratação',
          importance: Notifications.AndroidImportance.HIGH,
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#007aff',
        });
    
        // Permissões
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
    

  // Carregar valor salvo ao abrir o app
  useEffect(() => {
    const carregarQuantidade = async () => {
      const valorSalvo = await AsyncStorage.getItem('WaterConsumed');
      if (valorSalvo !== null) {
        setQuantidade(JSON.parse(valorSalvo));
      }
    };

    carregarQuantidade();
  }, []);

  // Atualizar e salvar a nova quantidade
  const beberAgua = async () => {
    console.log("beber agua iniciando")
    const novaQuantidade = quantidade + 250;
    setQuantidade(novaQuantidade);
    console.log(novaQuantidade + "ml")
    await AsyncStorage.setItem('WaterConsumed', JSON.stringify(novaQuantidade));
  };

  const handleNotify = async (e:number) => {
      const notificacoes = await Notifications.getAllScheduledNotificationsAsync();
    
      if (notificacoes.length > 0) {
        console.log("⚠️ Já existem notificações agendadas. Nada será criado.");
        return;
      }

      const agora = new Date();
    
        const proximoHorario = new Date(agora.getTime() + e * 1 * 1000);
        console.log("proximoHorario: ")
        console.log(proximoHorario)
    
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Hora de beber água 💧',
            body: 'Bora se hidratar!',
          },
          trigger: proximoHorario as any,
        });
    
      console.log('✅ Notificações agendadas com sucesso!');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Bem Hidratado</Text>
      <Text style={styles.subtext}>Quantidade de água hoje:</Text>
      <Text style={styles.counter}>{quantidade}ml</Text>
      <TouchableOpacity style={styles.button} onPress={beberAgua}>
        <Text style={styles.buttonText}>
          Beber água
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleNotify(10)}>
        <Text style={styles.buttonText}>
          Testar notificação 10 segundos
        </Text>
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtext: {
    fontSize: 20,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 20,
  }, button: {
    backgroundColor: '#007aff',
    padding: 14,
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
