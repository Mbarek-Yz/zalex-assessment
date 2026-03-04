import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Text, View, TextInput } from 'react-native';

import useFetch from '_hooks/useFetch';
import useSortedCertificates from '_hooks/useSortedCertificates';
import useSearch from '_hooks/useSearch';
import CertificateItem from '_components/CertificateItem/CertificateItem';
import CustomSearchBar from '_components/CustomSearchBar/CustomSearchBar';
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
import styles from './homeScreenStyles';
import useFilteredCertificates from '_hooks/useFilteredCertofocates';

const API_URL = `${BASE_URL}/${endpoints.LIST}?subscription-key=${SUBSCRIPTION_KEY}`;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const certificates = useAppSelector(selectAllCertificates);
  const searchInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const { searchText, setSearchText, debouncedSearchText } = useSearch();

  const { data, isLoading, error } = useFetch<
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

  const renderItem = useCallback(
    ({ item }: { item: Certificate }) => <CertificateItem certificate={item} />,
    [],
  );

  const renderFooterComponent = () => {
    return (
      <Text style={styles.emptyText}>
        {translate('certificate.no_results')}
      </Text>
    );
  };

  const keyExtractor = useCallback((item: Certificate) => item.reference, []);

  if (isLoading) {
    return <LoadingState message={translate('global.loading')} />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <View style={styles.container}>
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
        ListEmptyComponent={renderFooterComponent}
      />
    </View>
  );
};

export default HomeScreen;
