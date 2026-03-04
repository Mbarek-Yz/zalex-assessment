import { StyleSheet } from 'react-native';

import { colors } from '_utils/colors';
import { IS_IOS } from '_utils/constants';
import { FontSizes } from '_utils/fonts';
import {
  SEARCH_BAR_HORIZONTAL_PADDING,
  SEARCH_ICONS_DIMENTION,
} from '_utils/dimensions';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: SEARCH_BAR_HORIZONTAL_PADDING,
    paddingVertical: IS_IOS ? 14 : 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  focusedContainer: {
    borderColor: colors.ORANGE,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  zeroOpacity: { opacity: 0 },
  closeIcon: {
    width: SEARCH_ICONS_DIMENTION,
    height: SEARCH_ICONS_DIMENTION,
    tintColor: colors.NEUTRAL_GREY,
  },
  textInput: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    flex: 1,
    textAlignVertical: 'center',
    color: colors.BLACK,
  },
  loopIcon: {
    width: SEARCH_ICONS_DIMENTION,
    height: SEARCH_ICONS_DIMENTION,
    tintColor: colors.NEUTRAL_GREY,
  },
});
