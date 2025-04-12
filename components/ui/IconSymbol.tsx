import FontAwesome from '@expo/vector-icons/FontAwesome'; // <-- troca aqui
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Atualiza o MAPPING com nomes válidos do FontAwesome: https://icons.expo.fyi/FontAwesome
const MAPPING = {
  'gears.fill': 'cogs',           // ou 'gear'
  'drop.fill': 'tint',
  'notif.fill': 'bell',
  'alarm.fill': 'clock-o',        // ou outro semelhante
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof FontAwesome>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return <FontAwesome color={color} size={size} name={MAPPING[name]} style={style} />;
}
