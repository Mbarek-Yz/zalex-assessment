import React from 'react';
import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '_utils/colors';
import { images } from '_utils/images';
import styles from './customSearchBar.styles';

interface CustomSearchBarProps {
  inputRef: React.RefObject<TextInput | null>;
  text: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  defaultValue?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
}

const CustomSearchBar = ({
  inputRef,
  text,
  onChangeText,
  placeholder,
  onFocus,
  onBlur,
  defaultValue,
  isFocused = false,
}: CustomSearchBarProps) => {
  const onClear = () => {
    onChangeText('');
  };

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <Image
        style={styles.loopIcon}
        resizeMode="contain"
        source={images.LOOP}
      />

      <TextInput
        ref={inputRef}
        style={styles.textInput}
        value={text}
        onChangeText={onChangeText}
        placeholderTextColor={colors.NEUTRAL_GREY}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <TouchableOpacity
        disabled={text?.length === 0}
        style={text?.length === 0 ? styles.zeroOpacity : {}}
        onPress={onClear}
      >
        <Image
          style={styles.closeIcon}
          resizeMode="contain"
          source={images.CLOSE}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchBar;
