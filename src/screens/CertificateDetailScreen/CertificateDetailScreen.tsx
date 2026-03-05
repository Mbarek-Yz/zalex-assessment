import React, { useState, useMemo, useCallback } from 'react';
import { Text, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '_navigation/AppNavigator';
import { translate } from '_i18n';
import { CERTIFICATE_DETAILS_SCREEN } from '_utils/screenNames';
import { CertificateStatus } from '_utils/enums';

import styles from './certificateDetailScreenStyles';

import { useAppDispatch, useAppSelector } from '_store/store';
import {
  updatePurpose,
  selectCertificateByReference,
} from '_store/certificate/certificateSlice';

import CertificateInfoCard from '_components/CertificateCardInfo/CertificateCardInfo';
import PurposeEditor from '_components/PurposeEditor/PurposeEditor';
import PdfSection from '_components/PdfSection/PdfSection';

const samplePdf = require('_assets/sample.pdf');

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof CERTIFICATE_DETAILS_SCREEN
>;

const CertificateDetailScreen: React.FC<Props> = ({ route }) => {
  const { reference } = route.params;

  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [purposeText, setPurposeText] = useState('');

  const selectCertificate = useMemo(
    () => selectCertificateByReference(reference),
    [reference],
  );

  const certificate = useAppSelector(selectCertificate);

  const status = certificate?.status?.toLowerCase();

  const isNew = status === CertificateStatus.NEW;
  const isDone = status === CertificateStatus.DONE;

  const handleSave = useCallback(() => {
    const trimmed = purposeText.trim();

    if (!trimmed) {
      Alert.alert(translate('certificate.alert_failed'));
      return;
    }

    dispatch(
      updatePurpose({
        reference,
        purpose: trimmed,
      }),
    );

    Alert.alert(
      translate('certificate.alert_submitted'),
      translate('certificate.alert_updated'),
      [{ text: 'OK', onPress: () => setIsEditing(false) }],
    );
  }, [dispatch, purposeText, reference]);

  if (!certificate) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {translate('certificate.certificate_details')}
      </Text>

      <CertificateInfoCard
        certificate={certificate}
        editable={isNew}
        onEditPress={() => setIsEditing(prev => !prev)}
      />

      {isEditing && isNew && (
        <PurposeEditor
          value={purposeText}
          onChangeText={setPurposeText}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <Text style={styles.sectionTitle}>
        {translate('certificate.certificate_pdf')}
      </Text>

      <PdfSection isDone={isDone} pdfSource={samplePdf} />
    </ScrollView>
  );
};

export default CertificateDetailScreen;
