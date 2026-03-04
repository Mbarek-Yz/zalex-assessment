import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { SortField, SortOrder } from '_utils/enums';
import styles from './sortButtonStyles';

interface SortButtonProps {
  label: string;
  field: SortField;
  activeSortField: SortField;
  sortOrder: SortOrder;
  onPress: (field: SortField) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  label,
  field,
  activeSortField,
  sortOrder,
  onPress,
}) => {
  const isActive = activeSortField === field;
  const arrow = sortOrder === SortOrder.ASC ? '↑' : '↓';

  return (
    <TouchableOpacity
      style={[styles.sortButton, isActive && styles.sortButtonActive]}
      onPress={() => onPress(field)}
    >
      <Text
        style={[styles.sortButtonText, isActive && styles.sortButtonTextActive]}
      >
        {label} {isActive ? arrow : ''}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButton;
