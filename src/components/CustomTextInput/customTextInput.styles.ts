import { colors } from '_utils/colors';
import { IS_IOS } from '_utils/constants';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: IS_IOS ? 16 : 0,
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.BLACK,
    borderRadius: 8
  },
  textInput: {
    fontSize: FontSizes.FONT_SIZE_BASE_2,
    color: colors.BLACK,
    width: '90%'
  },
  label: {
    fontSize: FontSizes.FONT_SIZE_META_2,
    color: colors.TEXT_DEFAULT
  },
  icon: {
    alignSelf: 'center'
  }
});
