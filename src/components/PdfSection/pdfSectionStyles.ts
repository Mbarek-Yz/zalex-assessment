import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';

const PDF_HEIGHT = 500;
const PDF_WIDTH = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  container: {
    height: PDF_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.PURE_WHITE,
  },
  pdf: {
    height: PDF_HEIGHT,
    width: PDF_WIDTH,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: FontSizes.FONT_SIZE_META_1,
    color: colors.SUBTITLE_GREY,
    textAlign: 'center',
  },
});

export default styles;
