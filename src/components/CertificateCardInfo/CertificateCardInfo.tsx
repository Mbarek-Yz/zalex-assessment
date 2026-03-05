import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DetailRow from '_components/DetailRow/DetailRow';
import styles from './certificateCardInfoStyles';
import { translate } from '_i18n';
import { Certificate } from '_adapters/Certificate';

interface CertificateInfoCardProps {
  certificate: Certificate;
  editable?: boolean;
  onEditPress?: () => void;
}

const CertificateInfoCard: React.FC<CertificateInfoCardProps> = ({
  certificate,
  editable = false,
  onEditPress,
}) => {
  const isDone = certificate.status?.toLowerCase() === 'done';

  return (
    <View style={styles.card}>
      <DetailRow
        label={translate('certificate.label_reference_no')}
        value={certificate.reference}
      />
      <DetailRow
        label={translate('certificate.label_address_to')}
        value={certificate.address ?? ''}
      />

      <View style={styles.purposeRow}>
        <View style={styles.purposeRowContent}>
          <Text style={styles.purposeLabel}>
            {translate('certificate.label_purpose')}
          </Text>
          <Text style={styles.purposeValue}>{certificate.purpose ?? ''}</Text>
        </View>

        {editable && (
          <TouchableOpacity
            onPress={onEditPress}
            style={styles.editIconButton}
            accessibilityRole="button"
            accessibilityLabel={translate('certificate.edit_purpose')}
          >
            <Text style={styles.editIcon}>✏️</Text>
          </TouchableOpacity>
        )}
      </View>

      <DetailRow
        label={translate('certificate.label_status')}
        value={certificate.status ?? ''}
      />

      {isDone && certificate.issued_on && (
        <DetailRow
          label={translate('certificate.label_issued_on')}
          value={certificate.issued_on}
        />
      )}
    </View>
  );
};

export default CertificateInfoCard;
