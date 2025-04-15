import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useTheme } from './contexts/ThemeContext';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { useFocusEffect, useRouter } from 'expo-router';


const Scheduleds = () => {
  const { isDark } = useTheme();
  const styles = getStyles(isDark);
  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const carregarNotificacoes = async () => {
        const notificacoesAgendadas = await Notifications.getAllScheduledNotificationsAsync();
        console.log(notificacoesAgendadas)
        setNotificacoes(notificacoesAgendadas);
      };
  
      carregarNotificacoes();
    }, [])
  );
  

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
          
          <BtnPrimary
            title='Agendar nova'
            onPress={() => router.push('scheduleSingle')}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={notificacoes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
          <BtnPrimary
            title='Agendar nova'
            onPress={() => router.push('scheduleSingle')}
          />
        </>
      )}
    </View>
  );
};

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#3c3c3c' : '#ffffff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      color: isDark ? '#ffffff' : '#000000',
    },
    item: {
      padding: 15,
      borderBottomWidth: 1,
      borderColor: isDark ? '#444' : '#ddd',
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#ffffff' : '#000000',
    },
    subtext: {
      fontSize: 14,
      color: isDark ? '#aaaaaa' : '#666666',
      marginTop: 5,
    },
    emptyBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: isDark ? '#ffffff' : '#000000',
      marginTop: 10,
    },
    emptySub: {
      fontSize: 14,
      color: isDark ? '#aaaaaa' : '#666666',
      marginVertical: 10,
      textAlign: 'center',
    },
    button: {
      marginTop: 'auto',
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
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default Scheduleds;
