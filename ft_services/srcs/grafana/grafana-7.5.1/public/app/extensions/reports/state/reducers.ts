import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { dateTime, TimeRange } from '@grafana/data';
import { Report, ReportsState, ReportTimeRange, SchedulingFrequency, FooterMode } from '../../types';

const getTimezone = () => {
  // Older browser does not the internationalization API
  if (!(window as any).Intl) {
    return '';
  }

  const dateFormat = (window as any).Intl.DateTimeFormat();
  if (!dateFormat.resolvedOptions) {
    return '';
  }

  const options = dateFormat.resolvedOptions();
  if (!options.timeZone) {
    return '';
  }

  return options.timeZone;
};

export const defaultTimeRange: TimeRange = {
  from: dateTime(null),
  to: dateTime(null),
  raw: { from: '', to: '' },
};

const blankReport: Report = {
  id: 0,
  name: '',
  recipients: '',
  replyTo: '',
  message:
    'Hi all, \n' +
    'please find enclosed a PDF status report. If you have any questions, feel free to get in touch with me!\n' +
    'Have a great day. \n' +
    'Best,',
  dashboardId: undefined,
  dashboardName: '',
  schedule: {
    frequency: SchedulingFrequency.Weekly,
    hour: 12,
    minute: 0,
    day: 'monday',
    dayOfMonth: '1',
    timeZone: getTimezone(),
  },
  options: {
    orientation: 'portrait',
    layout: 'simple',
    timeRange: defaultTimeRange.raw as ReportTimeRange,
  },
};

export const initialState: ReportsState = {
  reports: [] as Report[],
  report: blankReport,
  hasFetchedList: false,
  hasFetchedSingle: false,
  searchQuery: '',
  reportCount: 0,
  isLoading: true,
  settings: {
    branding: {
      reportLogoUrl: '',
      emailLogoUrl: '',
      emailFooterMode: FooterMode.SentBy,
      emailFooterText: '',
      emailFooterLink: '',
    },
  },
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reportsLoaded: (state: ReportsState, action: PayloadAction<Report[]>): ReportsState => ({
      ...state,
      reports: action.payload,
      reportCount: action.payload.length,
      hasFetchedList: true,
    }),
    reportLoaded: (state: ReportsState, action: PayloadAction<Report>): ReportsState => ({
      ...state,
      report: action.payload,
      hasFetchedSingle: true,
      isLoading: false,
    }),
    updateReportProp: (state: ReportsState, action: PayloadAction<Report>): ReportsState => ({
      ...state,
      report: action.payload,
    }),
    clearReportState: (state: ReportsState, action: PayloadAction<undefined>): ReportsState => ({
      ...state,
      report: blankReport,
    }),
    reportLoadingBegin: (state: ReportsState) => ({
      ...state,
      isLoading: true,
    }),
    reportLoadingEnd: (state: ReportsState) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const {
  clearReportState,
  reportLoaded,
  reportsLoaded,
  updateReportProp,
  reportLoadingBegin,
  reportLoadingEnd,
} = reportsSlice.actions;

export const reportsReducers = reportsSlice.reducer;

export default {
  reports: reportsReducers,
};
