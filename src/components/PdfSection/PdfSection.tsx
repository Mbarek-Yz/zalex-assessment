import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Pdf, { Source } from 'react-native-pdf';

import styles from './pdfSectionStyles';
import { translate } from '_i18n';
import { LoadingState } from '_components/FeedbackStates';

interface PdfSectionProps {
  isDone: boolean;
  pdfSource: Source;
}

const PdfSection: React.FC<PdfSectionProps> = ({ isDone, pdfSource }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);

  return (
    <View style={styles.container}>
      {!isDone ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            {translate('certificate.certificate_not_issued')}
          </Text>
        </View>
      ) : (
        <>
          {isLoading && !pdfError && <LoadingState />}

          {pdfError ? (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                {translate('errors.pdf_load_error') ||
                  'Unable to load document'}
              </Text>
            </View>
          ) : (
            <Pdf
              source={pdfSource}
              style={styles.pdf}
              enablePaging
              enableAnnotationRendering
              onLoadComplete={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setPdfError(true);
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default PdfSection;
