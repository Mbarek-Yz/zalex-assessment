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
  card: {
    backgroundColor: colors.PURE_WHITE,
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
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
  pdfContainer: {
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.PURE_WHITE,
    elevation: 2,
  },
  pdf: {
    flex: 1,
    width: '100%',
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
