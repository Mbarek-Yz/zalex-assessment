import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CustomTextInput from '_components/CustomTextInput/CustomTextInput';
import usePost from '_hooks/usePost';
import {
  RequestCertificateData,
  RequestCertificateInput,
  requestCertificateSchema,
} from '_validation/requestSchema';
import styles from './requestCertificateScreenStyles';
import { translate } from '_i18n';
import { BASE_URL, endpoints, SUBSCRIPTION_KEY } from '_config/api';
import CustomButton from '_components/CustomButton/CustomButton';

const API_URL = `${BASE_URL}/${endpoints.CERTIFICATE}?subscription-key=${SUBSCRIPTION_KEY}`;

interface CertificateResponseBody {
  responce: string;
}

type CertificateRequestBody = Omit<RequestCertificateData, 'issued_on'> & {
  issued_on: string;
};

const RequestCertificateScreen: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestCertificateInput, any, RequestCertificateData>({
    resolver: zodResolver(requestCertificateSchema),
    defaultValues: {
      address_to: '',
      purpose: '',
      issued_on: undefined,
      employee_id: '',
    },
  });

  const { mutate, isLoading } = usePost<
    CertificateRequestBody,
    CertificateResponseBody
  >({
    baseUrl: API_URL,
    onSuccess: data => {
      if (data.responce === 'Ok') {
        Alert.alert(
          translate('certificate.alert_submitted'),
          translate('certificate.alert_success'),
          [{ text: 'OK', onPress: () => reset() }],
        );
      }
    },
    onError: err => {
      Alert.alert(translate('certificate.alert_failed'), err);
    },
  });

  const onSubmit = async (data: RequestCertificateData) => {
    const formattedDate = `${
      data.issued_on.getMonth() + 1
    }/${data.issued_on.getDate()}/${data.issued_on.getFullYear()}`;

    await mutate({
      address_to: data.address_to,
      purpose: data.purpose,
      issued_on: formattedDate,
      employee_id: data.employee_id,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.screenTitle}>
          {translate('certificate.request_certificate')}
        </Text>
        <Text style={styles.screenSubtitle}>
          {translate('certificate.fill_in')}
        </Text>

        <View style={styles.fieldWrapper}>
          <Controller
            control={control}
            name="address_to"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomTextInput
                label={translate('certificate.label_address_to')}
                text={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={translate('certificate.address_placeholder')}
              />
            )}
          />
          {errors.address_to && (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {errors.address_to.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldWrapper}>
          <Controller
            control={control}
            name="purpose"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomTextInput
                label={translate('certificate.label_purpose')}
                text={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={translate('certificate.purpose_placeholder')}
                extraStyles={styles.multiline}
              />
            )}
          />
          {errors.purpose && (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {errors.purpose.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldWrapper}>
          <Text style={styles.label}>
            {translate('certificate.label_issued_on')}
          </Text>
          <Controller
            control={control}
            name="issued_on"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                  accessibilityRole="button"
                  accessibilityLabel={translate('certificate.select_date')}
                >
                  <Text
                    style={
                      value instanceof Date
                        ? styles.dateText
                        : styles.datePlaceholder
                    }
                  >
                    {value instanceof Date
                      ? value.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : translate('certificate.select_future_date')}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={value instanceof Date ? value : new Date()}
                    mode="date"
                    minimumDate={new Date(Date.now() + 86400000)}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={(_, selected) => {
                      setShowDatePicker(false);
                      if (selected) onChange(selected);
                    }}
                  />
                )}
              </>
            )}
          />
          {errors.issued_on && (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {errors.issued_on.message}
            </Text>
          )}
        </View>

        <View style={styles.fieldWrapper}>
          <Controller
            control={control}
            name="employee_id"
            render={({ field: { onChange, value, onBlur } }) => (
              <CustomTextInput
                label={translate('certificate.label_employee_id')}
                text={value}
                onChangeText={t => onChange(t.replace(/\D/g, ''))}
                onBlur={onBlur}
                placeholder={translate('certificate.id_placeholder')}
              />
            )}
          />
          {errors.employee_id && (
            <Text style={styles.errorText} accessibilityLiveRegion="polite">
              {errors.employee_id.message}
            </Text>
          )}
        </View>

        {isLoading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <CustomButton
            title={translate('certificate.submit_btn')}
            onPress={handleSubmit(onSubmit)}
            isDisabled={isLoading}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RequestCertificateScreen;
