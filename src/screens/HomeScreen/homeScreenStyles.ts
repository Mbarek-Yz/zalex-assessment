import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_SCREEN,
    padding: 16,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  sortLabel: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.SUBTITLE_GREY,
    marginRight: 4,
  },
  list: {
    paddingVertical: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.SUBTITLE_GREY,
    fontSize: FontSizes.FONT_SIZE_META_0,
    marginTop: 40,
  },
  newRequestButton: {
    marginBottom: 12,
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.BORDER_INPUT,
  },
  newRequestButtonText: {
    color: colors.TITLE_DARK,
    fontSize: FontSizes.FONT_SIZE_META_0,
    fontWeight: '600',
  },
});

export default styles;
