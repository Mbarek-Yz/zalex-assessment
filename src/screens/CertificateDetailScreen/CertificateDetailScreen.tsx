import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Pdf from 'react-native-pdf';

import { RootStackParamList } from '_navigation/AppNavigator';
import { translate } from '_i18n';
import { CERTIFICATE_DETAILS_SCREEN } from '_utils/screenNames';
import styles from './certificateDetailScreenStyles';
import DetailRow from '_components/DetailRow/DetailRow';
import CustomTextInput from '_components/CustomTextInput/CustomTextInput';
import CustomButton from '_components/CustomButton/CustomButton';
import { useAppDispatch, useAppSelector } from '_store/store';
import {
  updatePurpose,
  selectCertificateByReference,
} from '_store/certificate/certificateSlice';

const samplePdf = require('_assets/sample.pdf');

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof CERTIFICATE_DETAILS_SCREEN
>;

const CertificateDetailScreen: React.FC<Props> = ({ route }) => {
  const { reference } = route.params;
  const dispatch = useAppDispatch();

  const selectCertificate = useMemo(
    () => selectCertificateByReference(reference),
    [reference],
  );

  const certificate = useAppSelector(selectCertificate);

  const isNew = certificate?.status?.toLowerCase() === 'new';
  const isDone = certificate?.status?.toLowerCase() === 'done';

  const [isEditing, setIsEditing] = useState(false);
  const [purposeText, setPurposeText] = useState(certificate?.purpose || '');

  const handleSave = () => {
    const trimmed = purposeText.trim();

    if (!trimmed) {
      Alert.alert(
        translate('certificate.alert_failed'),
        translate('certificate.purpose_empty'),
      );
      return;
    }

    dispatch(updatePurpose({ reference, purpose: trimmed }));

    Alert.alert(
      translate('certificate.alert_updated'),
      translate('certificate.alert_update_success'),
      [{ text: 'OK', onPress: () => setIsEditing(false) }],
    );
  };

  if (!certificate) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {translate('certificate.certificate_details')}
      </Text>

      <View style={styles.card}>
        <DetailRow
          label={translate('certificate.label_reference_no')}
          value={certificate.reference}
        />
        <DetailRow
          label={translate('certificate.label_address_to')}
          value={certificate.address}
        />

        <View style={styles.purposeRow}>
          <View style={styles.purposeRowContent}>
            <Text style={styles.purposeLabel}>
              {translate('certificate.label_purpose')}
            </Text>
            <Text style={styles.purposeValue}>{certificate.purpose}</Text>
          </View>
          {isNew && (
            <TouchableOpacity
              onPress={() => setIsEditing(prev => !prev)}
              style={styles.editIconButton}
              accessibilityRole="button"
              accessibilityLabel={translate('certificate.edit_purpose')}
            >
              <Text style={styles.editIcon}>{isEditing ? '✕' : '✏️'}</Text>
            </TouchableOpacity>
          )}
        </View>

        <DetailRow
          label={translate('certificate.label_status')}
          value={certificate.status}
        />
        {isDone && certificate.issued_on && (
          <DetailRow
            label={translate('certificate.label_issued_on')}
            value={certificate.issued_on}
          />
        )}
      </View>

      {isEditing && isNew && (
        <View style={styles.editCard}>
          <CustomTextInput
            label={translate('certificate.label_purpose')}
            text={purposeText}
            onChangeText={setPurposeText}
            placeholder={translate('certificate.purpose_placeholder')}
            extraStyles={styles.purposeInput}
          />
          <CustomButton
            title={translate('certificate.save_btn')}
            onPress={handleSave}
            extraStyle={styles.saveButton}
            extraTitleStyle={styles.saveButtonText}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>
        {translate('certificate.certificate_pdf')}
      </Text>

      <View style={styles.pdfContainer}>
        {isDone ? (
          <Pdf
            source={samplePdf}
            style={styles.pdf}
            enablePaging
            enableAnnotationRendering
            onError={e => console.log('PDF error:', e)}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>
              {translate('certificate.certificate_not_issued')}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CertificateDetailScreen;
