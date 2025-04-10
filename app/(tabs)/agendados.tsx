import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

const Agendados = () => {
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarNotificacoes = async () => {
      const notificacoesAgendadas = await Notifications.getAllScheduledNotificationsAsync();
      setNotificacoes(notificacoesAgendadas);
    };

    const unsubscribe = navigation.addListener('focus', carregarNotificacoes);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: { item: any }) => {
    const horario = new Date(item.trigger.value);
    return (
      <View style={styles.item}>
        <Text style={styles.text}>Notificação às {horario.getHours().toString().padStart(2, '0')}:{horario.getMinutes().toString().padStart(2, '0')}</Text>
        <Text style={styles.subtext}>{item.content.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações Agendadas</Text>

      {notificacoes.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Você ainda não agendou nenhuma notificação.</Text>
          <Text style={styles.emptySub}>Toque no botão abaixo para agendar uma!</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('agendar')}>
            <Text style={styles.buttonText}>Agendar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={notificacoes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity style={styles.buttonBottom} onPress={() => navigation.navigate('agendar')}>
            <Text style={styles.buttonText}>Agendar Nova</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  text: { fontSize: 18, fontWeight: 'bold' },
  subtext: { fontSize: 14, color: '#666', marginTop: 5 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  emptySub: { fontSize: 14, color: '#666', marginVertical: 10, textAlign: 'center' },
  button: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonBottom: {
    marginTop: 3,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default Agendados;
