import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';

export default function Agendar() {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const router = useRouter();

  const options = [
    { title: 'Ver agendados', rota: 'scheduleds' },
    { title: 'Agendar uma vez', rota: 'scheduleSingle' },
    { title: 'Agendar diariamente', rota: 'scheduleDaily' },
    { title: 'Agendar em ciclos', rota: '/scheduleDaily' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o agendamento</Text>
      {options.map((opcao, index) => (
        <View 
          style={styles.opcao}
          key={index}>
          <BtnPrimary
            title={opcao.title}
            onPress={() => router.push(opcao.rota)}
          />
        </View>
      ))}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 2,
      backgroundColor: isDark ? '#3c3c3c' : '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
      color: isDark ? '#fff' : '#000',
    },
    opcao: {
      width: 290,
      borderRadius: 10,
      marginBottom: 10,
    },
  });
