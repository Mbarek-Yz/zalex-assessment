import React from 'react';
import {
  type DimensionValue,
  Text,
  TouchableOpacity,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import styles from './customButtonStyles';
import { colors } from '_utils/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  width?: DimensionValue;
  isOutlined?: boolean;
  isDisabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  width,
  isOutlined,
  isDisabled = false,
}) => {
  const containerStyle: StyleProp<ViewStyle> = isOutlined
    ? styles.outlinedContainer
    : styles.notOutlinedContainer;
  const titleStyle: StyleProp<TextStyle> = isOutlined
    ? { color: colors.BLACK }
    : { color: colors.WHITE };

  const disabledStyle: StyleProp<ViewStyle> = isDisabled
    ? { opacity: 0.5 }
    : {};

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        disabledStyle,
        {
          width,
        },
      ]}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
