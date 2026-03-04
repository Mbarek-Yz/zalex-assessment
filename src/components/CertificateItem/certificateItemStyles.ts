import { StyleSheet } from 'react-native';
import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 10,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  reference: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    fontWeight: '700',
    color: colors.TITLE_DARK,
    marginBottom: 4,
  },
  address: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.LABEL_DARK,
    marginBottom: 2,
  },
  status: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.SUBTITLE_GREY,
    marginBottom: 2,
  },
  issuedOn: {
    fontSize: FontSizes.FONT_SIZE_LABEL,
    color: colors.PLACEHOLDER_GREY,
  },
  purpose: {
    fontSize: FontSizes.FONT_SIZE_LABEL,
    color: colors.PLACEHOLDER_GREY,
    marginTop: 4,
  },
});

export default styles;
