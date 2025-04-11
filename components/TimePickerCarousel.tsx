import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  hour: number;
  minute: number;
  setHour: (val: number) => void;
  setMinute: (val: number) => void;
}

const generateNumbers = (max: number) =>
  Array.from({ length: max }, (_, i) => i.toString().padStart(2, 0));

const TimePickerCarousel: React.FC<Props> = ({ hour, minute, setHour, setMinute }) => {
  const hours = generateNumbers(24);
  const minutes = generateNumbers(60);

  const renderItem = (item: string, selected: string, setSelected: (val: string) => void) => (
    <TouchableOpacity onPress={() => setSelected(item)} style={styles.item}>
      <Text style={[styles.text, selected === item && styles.selectedText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.pickerContainer}>
      <FlatList
        data={hours}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderItem(item, hour, setHour)}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
      <Text style={styles.separator}>:</Text>
      <FlatList
        data={minutes}
        keyExtractor={(item) => item}
        renderItem={({ item }) => renderItem(item, minute, setMinute)}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
  },
  list: {
    height: 200,
    width: 60,
  },
  item: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEE',
    borderRadius: 10,
    marginVertical: 4,
  },
  text: {
    fontSize: 22,
    color: '#555',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  separator: {
    fontSize: 30,
    marginHorizontal: 10,
    color: '#000',
  },
});

export default TimePickerCarousel;
