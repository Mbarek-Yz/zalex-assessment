import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
  },
  notOutlinedContainer: {
    backgroundColor: colors.BLACK,
  },
  outlinedContainer: {
    borderWidth: 0.2,
    borderColor: colors.NEUTRAL_GREY,
    backgroundColor: colors.WHITE,
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: FontSizes.FONT_SIZE_META_1,
    fontWeight: '500',
  },
});
