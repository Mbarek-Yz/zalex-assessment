import React from 'react';
import {
  type FlexAlignType,
  View,
  type StyleProp,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';

interface CustomDividerProps {
  height?: DimensionValue;
  width?: DimensionValue;
  backgroundColor?: string;
  alignSelf?: FlexAlignType | 'auto' | undefined;
  style?: StyleProp<ViewStyle>;
}

const CustomDivider: React.FC<CustomDividerProps> = ({
  backgroundColor = 'transparent',
  height,
  width = '100%',
  alignSelf,
  style,
}) => {
  return (
    <View
      style={[
        {
          backgroundColor,
          height,
          width,
          alignSelf,
        },
        style,
      ]}
    />
  );
};

export default CustomDivider;
