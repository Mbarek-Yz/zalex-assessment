const en = {
  global: {
    cancel: 'Cancel',
    source: 'Source:',
    see_more: 'See More',
    see_less: 'See Less',
    loading: 'Loading...',
    fetching: 'Fetching data...',
    retry: 'Retry',
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
    // Screen
    request_certificate: 'Request Certificate',
    fill_in: 'Fill in the details below to submit your request',
    sort_by: 'Sort by',
    no_results: 'No results found',
    certificate_details: 'Certificate Details',
    edit_purpose: 'Edit purpose',
    // Field labels
    label_address_to: 'Address To',
    label_purpose: 'Purpose',
    label_issued_on: 'Issued On',
    label_employee_id: 'Employee ID',
    label_reference_no: 'Reference No.',
    label_status: 'Status',
    // Placeholders
    address_placeholder: 'e.g. Embassy of Neptune',
    purpose_placeholder: 'Describe the purpose (min. 50 characters)',
    select_date: 'Select issue date',
    id_placeholder: 'Numeric ID only',
    // Submit
    submit_certificate: 'Submit certificate request',
    submit_btn: 'Submit Request',
    request_btn: 'Request new certificate',
    save_btn: 'Edit',
    // Alerts
    alert_submitted: '✅ Request Submitted',
    alert_success: 'Your certificate request has been submitted successfully.',
    alert_failed: 'Submission Failed',
    alert_updated: 'Your certificate request has been updated successfully',
    // Detail
    certificate_pdf: 'Certificate PDF',
    certificate_not_issued: 'Certificate is yet to be issued.',
    // Date placeholder
    select_future_date: 'Select a future date',
    search_placeholder: 'Search...',
  },
};

export default en;
export type TranslationsType = typeof en;
