import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BtnSecondaryProps {
  title: string;
  onPress: () => void;
}

export default function BtnSecondary({ title, onPress }: BtnSecondaryProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff3b30',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
