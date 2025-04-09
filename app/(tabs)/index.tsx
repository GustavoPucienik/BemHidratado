import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [quantidade, setQuantidade] = useState(0);

  const beberAgua = async () => {
    setQuantidade(prev => prev + 250);
    await AsyncStorage.setItem('WaterConsumed', JSON.stringify(quantidade));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Bem Hidratado</Text>
      <Text style={styles.subtext}>Quantidade de água hoje:</Text>
      <Text style={styles.counter}>{quantidade}ml</Text>

      <Button title="Beber Água" onPress={beberAgua} />
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
  },
});
