import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Pdf from 'react-native-pdf';
import { RootStackParamList } from '_navigation/AppNavigator';
import { translate } from '_i18n';
import { CERTIFICATE_DETAILS_SCREEN } from '_utils/screenNames';
import styles from './certificateDetailScreenStyles';
import DetailRow from '_components/DetailRow/DetailRow';

const samplePdf = require('_assets/sample.pdf');

type Props = NativeStackScreenProps<
  RootStackParamList,
  typeof CERTIFICATE_DETAILS_SCREEN
>;

const CertificateDetailScreen: React.FC<Props> = ({ route }) => {
  const { certificate } = route.params;
  const isDone = certificate.status?.toLowerCase() === 'done';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>
        {translate('certificate.certificate_details')}{' '}
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
        <DetailRow
          label={translate('certificate.label_purpose')}
          value={certificate.purpose}
        />
        <DetailRow
          label={translate('certificate.label_status')}
          value={certificate.status}
        />
        {isDone && certificate.issued_on ? (
          <DetailRow
            label={translate('certificate.label_issued_on')}
            value={certificate.issued_on}
          />
        ) : null}
      </View>

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
