import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.BORDER_INPUT,
    backgroundColor: colors.PURE_WHITE,
  },
  sortButtonActive: {
    backgroundColor: colors.TITLE_DARK,
    borderColor: colors.TITLE_DARK,
  },
  sortButtonText: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.SUBTITLE_GREY,
  },
  sortButtonTextActive: {
    color: colors.PURE_WHITE,
    fontWeight: '600',
  },
});

export default styles;
