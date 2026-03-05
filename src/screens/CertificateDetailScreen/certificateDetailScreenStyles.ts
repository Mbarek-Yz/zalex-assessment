import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_SCREEN,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: FontSizes.FONT_SIZE_TITLE,
    fontWeight: '700',
    color: colors.TITLE_DARK,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: FontSizes.FONT_SIZE_META_2,
    fontWeight: '600',
    color: colors.TITLE_DARK,
    marginBottom: 12,
    marginTop: 24,
  },
});

export default styles;
