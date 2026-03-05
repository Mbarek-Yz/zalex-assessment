import React from 'react';
import { View } from 'react-native';

import CustomTextInput from '_components/CustomTextInput/CustomTextInput';
import CustomButton from '_components/CustomButton/CustomButton';
import CustomDivider from '_components/CustomDivider/CustomDivider';

import { translate } from '_i18n';
import { HeightDimentions } from '_utils/dimensions';
import styles from './purposeEditorStyles';

interface PurposeEditorProps {
  value: string;
  onChangeText: (text: string) => void;
  onSave: () => void;
  onCancel?: () => void;
}

const PurposeEditor: React.FC<PurposeEditorProps> = ({
  value,
  onChangeText,
  onSave,
  onCancel,
}) => {
  return (
    <View style={styles.editCard}>
      <CustomTextInput
        label={translate('certificate.label_purpose')}
        text={value}
        onChangeText={onChangeText}
        placeholder={translate('certificate.purpose_placeholder')}
        extraStyles={styles.purposeInput}
      />

      <CustomDivider height={HeightDimentions.HEIGHT_DIVIDER_2} />

      <CustomButton
        title={translate('certificate.save_btn')}
        onPress={onSave}
      />

      {onCancel && (
        <>
          <CustomDivider height={HeightDimentions.HEIGHT_DIVIDER_2} />
          <CustomButton
            title={translate('global.cancel')}
            onPress={onCancel}
            isOutlined
          />
        </>
      )}
    </View>
  );
};

export default PurposeEditor;
