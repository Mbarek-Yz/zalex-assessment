import { StyleSheet } from 'react-native';
import { colors } from '_utils/colors';

const styles = StyleSheet.create({
  editCard: {
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },

  purposeInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },

  buttonSpacing: {
    marginTop: 12,
  },
});

export default styles;
