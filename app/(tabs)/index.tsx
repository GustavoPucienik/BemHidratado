import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [quantidade, setQuantidade] = useState(0);

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
    const novaQuantidade = quantidade + 250;
    setQuantidade(novaQuantidade);
    await AsyncStorage.setItem('WaterConsumed', JSON.stringify(novaQuantidade));
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
  },button: {
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
