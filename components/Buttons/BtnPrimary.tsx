import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BtnPrimaryProps {
  title: string;
  onPress: () => void;
}

export default function BtnPrimary({ title, onPress }: BtnPrimaryProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0aaaff',
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
