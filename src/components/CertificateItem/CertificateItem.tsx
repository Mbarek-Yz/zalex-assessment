import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Certificate } from '_adapters/Certificate';
import { RootStackParamList } from '_navigation/AppNavigator';
import styles from './certificateItemStyles';
import { CERTIFICATE_DETAILS_SCREEN, HOME_SCREEN } from '_utils/screenNames';

interface CertificateItemProps {
  certificate: Certificate;
}

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof HOME_SCREEN
>;

const CertificateItem: React.FC<CertificateItemProps> = ({ certificate }) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate(CERTIFICATE_DETAILS_SCREEN, { certificate })
      }
    >
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
    </TouchableOpacity>
  );
};

export default CertificateItem;
