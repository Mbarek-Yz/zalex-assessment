import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { translate } from '_i18n';
import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';

interface ErrorStateProps {
  error: string;
  showPrefix?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  showPrefix = true,
}) => (
  <View style={styles.centered}>
    <Text style={styles.errorText}>
      {showPrefix && `${translate('errors.error')} `}
      {error}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: colors.ERROR_RED,
    fontSize: FontSizes.FONT_SIZE_META_1,
    textAlign: 'center',
  },
});
