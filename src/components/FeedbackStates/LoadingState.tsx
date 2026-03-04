import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { translate } from '_i18n';
import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = translate('gif.fetching_gifs'),
  size = 'large',
}) => (
  <View style={styles.centered}>
    <ActivityIndicator size={size} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: FontSizes.FONT_SIZE_META_1,
    color: colors.NEUTRAL_GREY,
  },
});
