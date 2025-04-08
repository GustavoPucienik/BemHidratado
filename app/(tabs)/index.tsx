import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [copos, setCopos] = useState(0);

  const beberAgua = () => {
    setCopos(prev => prev + 250);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Bem Hidratado</Text>
      <Text style={styles.subtext}>Copos de água hoje:</Text>
      <Text style={styles.counter}>{copos}ml</Text>

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
