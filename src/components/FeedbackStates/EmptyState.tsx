import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <View style={styles.centered}>
    <Text style={styles.emptyText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    color: colors.NEUTRAL_GREY,
    textAlign: 'center',
  },
});
