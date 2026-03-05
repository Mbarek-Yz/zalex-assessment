import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useFetch from '_hooks/useFetch';
import useSortedCertificates from '_hooks/useSortedCertificates';
import useSearch from '_hooks/useSearch';
import useFilteredCertificates from '_hooks/useFilteredCertofocates';
import CertificateItem from '_components/CertificateItem/CertificateItem';
import CustomSearchBar from '_components/CustomSearchBar/CustomSearchBar';
import CustomButton from '_components/CustomButton/CustomButton';
import CustomDivider from '_components/CustomDivider/CustomDivider';
import SortButton from '_components/SortButton/SortButton';
import { ErrorState, LoadingState } from '_components/FeedbackStates';
import {
  Certificate,
  CertificateResponse,
  decodeCertificates,
} from '_adapters/Certificate';
import { BASE_URL, endpoints, SUBSCRIPTION_KEY } from '_config/api';
import { translate } from '_i18n';
import {
  selectAllCertificates,
  setCertificates,
} from '_store/certificate/certificateSlice';
import { SortField } from '_utils/enums';
import { useAppDispatch, useAppSelector } from '_store/store';
import { RootStackParamList } from '_navigation/AppNavigator';
import {
  CERTIFICATE_DETAILS_SCREEN,
  REQUEST_CERTIFICATE_SCREEN,
} from '_utils/screenNames';
import { HeightDimentions } from '_utils/dimensions';
import styles from './homeScreenStyles';

const API_URL = `${BASE_URL}/${endpoints.LIST}?subscription-key=${SUBSCRIPTION_KEY}`;

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const certificates = useAppSelector(selectAllCertificates);
  const searchInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { searchText, setSearchText, debouncedSearchText } = useSearch();

  const { data, isLoading, error, refreshData, isRefreshing, retry } = useFetch<
    Certificate,
    CertificateResponse[]
  >({
    baseUrl: API_URL,
    transform: response => decodeCertificates(response),
  });

  useEffect(() => {
    dispatch(setCertificates(data ?? []));
  }, [data, dispatch]);

  const filtered = useFilteredCertificates(certificates, debouncedSearchText);
  const { sorted, sortField, sortOrder, toggleSort } =
    useSortedCertificates(filtered);

  const navigateToRequestCertificate = useCallback(() => {
    navigation.navigate(REQUEST_CERTIFICATE_SCREEN);
  }, [navigation]);

  const onCertificatePress = useCallback(
    (item: Certificate) => {
      navigation.navigate(CERTIFICATE_DETAILS_SCREEN, {
        reference: item.reference,
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Certificate }) => (
      <TouchableOpacity onPress={() => onCertificatePress(item)}>
        <CertificateItem certificate={item} />
      </TouchableOpacity>
    ),
    [onCertificatePress],
  );

  const renderEmptyComponent = useCallback(
    () => (
      <Text style={styles.emptyText}>
        {translate('certificate.no_results')}
      </Text>
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: Certificate, index: number) =>
      item.reference
        ? `${item.reference}-${item.issued_on ?? index}`
        : `certificate-${index}`,
    [],
  );

  if (isLoading) {
    return <LoadingState message={translate('global.loading')} />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={retry} />;
  }

  return (
    <View style={styles.container}>
      <CustomButton
        title={translate('certificate.request_btn')}
        onPress={navigateToRequestCertificate}
        isOutlined
      />
      <CustomDivider height={HeightDimentions.HEIGHT_DIVIDER_3} />
      <CustomSearchBar
        inputRef={searchInputRef}
        text={searchText}
        onChangeText={setSearchText}
        placeholder={translate('certificate.search_placeholder')}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>{translate('certificate.sort_by')}</Text>
        <SortButton
          label={translate('certificate.label_issued_on')}
          field={SortField.ISSUED_ON}
          activeSortField={sortField}
          sortOrder={sortOrder}
          onPress={toggleSort}
        />
        <SortButton
          label={translate('certificate.label_status')}
          field={SortField.STATUS}
          activeSortField={sortField}
          sortOrder={sortOrder}
          onPress={toggleSort}
        />
      </View>

      <FlatList
        data={sorted}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        ListEmptyComponent={renderEmptyComponent}
        refreshing={isRefreshing}
        onRefresh={refreshData}
      />
    </View>
  );
};

export default HomeScreen;
