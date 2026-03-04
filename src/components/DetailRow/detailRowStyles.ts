import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER_INPUT,
  },
  label: {
    fontSize: FontSizes.FONT_SIZE_LABEL,
    color: colors.SUBTITLE_GREY,
    marginBottom: 2,
    fontWeight: '500',
  },
  value: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    color: colors.TEXT_DARK,
  },
});

export default styles;
