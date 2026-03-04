import { colors } from '_utils/colors';
import { FontSizes } from '_utils/fonts';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.BACKGROUND_SCREEN },
  content: { padding: 20, paddingBottom: 40 },
  screenTitle: {
    fontSize: FontSizes.FONT_SIZE_TITLE,
    fontWeight: '700',
    color: colors.TITLE_DARK,
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.SUBTITLE_GREY,
    marginBottom: 28,
  },
  fieldWrapper: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.LABEL_DARK,
    marginBottom: 6,
  },
  multiline: { height: 100, alignItems: 'flex-start' },
  errorText: {
    marginTop: 4,
    fontSize: FontSizes.FONT_SIZE_LABEL,
    color: colors.ERROR_RED,
    fontWeight: '500',
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: colors.BORDER_INPUT,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.PURE_WHITE,
  },
  dateText: { fontSize: FontSizes.FONT_SIZE_META_0, color: colors.TEXT_DARK },
  datePlaceholder: {
    fontSize: FontSizes.FONT_SIZE_META_0,
    color: colors.PLACEHOLDER_GREY,
  },
  submitButton: {
    marginTop: 12,
    backgroundColor: colors.SUBMIT_DARK,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: {
    color: colors.PURE_WHITE,
    fontSize: FontSizes.FONT_SIZE_META_1,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default styles;
