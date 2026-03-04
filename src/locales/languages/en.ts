const en = {
  global: {
    cancel: 'Cancel',
    source: 'Source:',
    see_more: 'See More',
    see_less: 'See Less',
  },
  errors: {
    error: 'Error:',
    network: 'No internet connection. Please check your network.',
    timeout: 'Request timed out. Please try again.',
    server: 'Server error. Please try again later.',
    not_found: 'Resource not found.',
    unknown: 'Something went wrong. Please try again.',
  },
  certificate: {
    request_certificate: 'Request Certificate',
    fill_in: 'Fill in the details below to submit your request',
    address_placeholder: 'e.g. Embassy of Neptune',
    purpose_placeholder: 'Describe the purpose (min. 50 characters)',
    select_date: 'Select issue date',
    id_placeholder: 'Numeric ID only',
    submit_certificate: 'Submit certificate request',
    submit_btn: 'Submit Request',
    alert_submitted: '✅ Request Submitted',
    alert_success: 'Your certificate request has been submitted successfully.',
    alert_failed: 'Submission Failed',
  },
};

export default en;

export type TranslationsType = typeof en;
