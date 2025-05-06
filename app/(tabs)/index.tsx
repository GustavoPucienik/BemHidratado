import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { useTheme } from '../contexts/ThemeContext';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // mostra a notificação no app
    shouldPlaySound: true, // toca som (se configurado)
    shouldSetBadge: false, // ícone com número, só iOS
  }),
});



export default function HomeScreen() {
  const [quantidade, setQuantidade] = useState(0);
  const { isDark } = useTheme();
  const styles = getStyles(isDark);

    const verificarDataECarregar = async () => {
      const dataHoje = new Date().toDateString(); // exemplo: "Sun Apr 14 2025"
      const dataSalva = await AsyncStorage.getItem('DataUltimaHidratacao');
      const quantidadeSalva = await AsyncStorage.getItem('WaterConsumed');
  
      if (dataSalva !== dataHoje) {
        // Novo dia, zera a quantidade
        setQuantidade(0);
        await AsyncStorage.setItem('WaterConsumed', '0');
        await AsyncStorage.setItem('DataUltimaHidratacao', dataHoje);
      } else if (quantidadeSalva !== null) {
        // Mesmo dia, carrega a quantidade normalmente
        setQuantidade(JSON.parse(quantidadeSalva));
      }
    };

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

    verificarDataECarregar();

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Bem Hidratado</Text>
      <Text style={styles.subtext}>Quantidade de água hoje:</Text>
      <Text style={styles.counter}>
        {quantidade >= 1000
          ? `${(quantidade / 1000).toFixed(2)} litros`
          : `${quantidade}ml`}
      </Text>

      <BtnPrimary
        title="Beber água"
        onPress={beberAgua}
      />
    </View>
  );
}


// estilos reativos
const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#3c3c3c' : '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subtext: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 20,
    },
    counter: {
      color: isDark ? '#ffffff' : '#000000',
      fontSize: 48,
      fontWeight: 'bold',
      marginVertical: 20,
    },
  });