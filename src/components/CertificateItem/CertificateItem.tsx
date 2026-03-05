import React from 'react';
import { Text, View } from 'react-native';
import { Certificate } from '_adapters/Certificate';
import styles from './certificateItemStyles';

interface CertificateItemProps {
  certificate: Certificate;
}

const CertificateItem: React.FC<CertificateItemProps> = ({ certificate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.reference}>{certificate.reference}</Text>
      <Text style={styles.address}>{certificate.address}</Text>
      <Text style={styles.status}>{certificate.status}</Text>
      {certificate.issued_on ? (
        <Text style={styles.issuedOn}>{certificate.issued_on}</Text>
      ) : null}
      {certificate.purpose ? (
        <Text style={styles.purpose} numberOfLines={1}>
          {certificate.purpose}
        </Text>
      ) : null}
    </View>
  );
};

export default React.memo(CertificateItem);
