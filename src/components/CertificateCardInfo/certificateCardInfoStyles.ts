import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  row: {
    paddingVertical: 12,
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
  purposeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.BORDER_INPUT,
  },
  purposeRowContent: {
    flex: 1,
  },
  purposeLabel: {
    fontSize: FontSizes.FONT_SIZE_LABEL,
    color: colors.SUBTITLE_GREY,
    marginBottom: 2,
    fontWeight: '500',
  },
  purposeValue: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    color: colors.TEXT_DARK,
  },
  editIconButton: {
    paddingLeft: 14,
  },

  editIcon: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.SUBTITLE_GREY,
  },
});

export default styles;
