import React from 'react';
import {
  View,
  TextInput,
  type StyleProp,
  type ViewStyle,
  Text,
} from 'react-native';

import styles from './customTextInput.styles';
import { colors } from '_utils/colors';
import CustomDivider from '_components/CustomDivider/CustomDivider';
import { HeightDimentions } from '_utils/dimensions';

interface CustomTextInputProps {
  text: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  label?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  onChangeText,
  text,
  placeholder,
  extraStyles,
  onBlur,
  label,
}) => {
  return (
    <>
      {!!label && (
        <View>
          <Text style={styles.label}>{label}</Text>
          <CustomDivider height={HeightDimentions.HEIGHT_DIVIDER_1} />
        </View>
      )}
      <View style={[styles.container, extraStyles]}>
        <TextInput
          placeholderTextColor={colors.GREY_LIGHT}
          value={text}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={styles.textInput}
          onBlur={onBlur}
        />
      </View>
    </>
  );
};

export default CustomTextInput;
