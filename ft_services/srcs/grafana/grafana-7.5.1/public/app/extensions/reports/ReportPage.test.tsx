import React from 'react';
import { NavModel } from '@grafana/data';
import { getTheme } from '@grafana/ui';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ReportPage, Props } from './ReportPage';
import { initialState, updateReportProp, clearReportState } from './state/reducers';
import { mockToolkitActionCreator, mockToolkitActionCreatorWithoutPayload } from '../../../test/core/redux/mocks';
import { SchedulingFrequency, ReportOrientation, ReportLayout } from '../types';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('app/core/services/backend_srv', () => {
  return {
    backendSrv: {
      search: async () => Promise.resolve([]),
    },
  };
});

jest.mock('app/core/config', () => {
  return {
    ...(jest.requireActual('app/core/config') as any),
    buildInfo: {},
    licenseInfo: {},
    rendererAvailable: true,
  };
});

const blankReport = initialState.report;
const testReport = {
  ...blankReport,
  name: 'Test report',
  dashboardId: 1,
  dashboardName: 'Test dashboard',
  recipients: 'test@me.com',
};

const setup = (propOverrides?: Partial<Props>) => {
  const props: Props = {
    report: blankReport,
    navModel: { node: {}, main: {} } as NavModel,
    reportId: 0,
    isLoading: false,
    theme: getTheme(),
    variables: [],

    createReport: jest.fn(),
    updateReport: jest.fn(),
    loadReport: jest.fn(),
    sendTestEmail: jest.fn(),
    clearReportState: mockToolkitActionCreatorWithoutPayload(clearReportState),
    updateReportProp: mockToolkitActionCreator(updateReportProp),
    initVariables: jest.fn(),
    cleanUpVariables: jest.fn(),
  };

  Object.assign(props, propOverrides);

  render(<ReportPage {...props} />);
};

const mockCreate = jest.fn();

describe('ReportPage', () => {
  it('should render New report page when reportId is undefined', async () => {
    setup();
    const header = await screen.findByText('New report');

    expect(header).toBeInTheDocument();
  });

  it("should trigger 'create' prop on save when New report page is rendered ", async () => {
    setup({ createReport: mockCreate, report: testReport });

    fireEvent.submit(screen.getByText('Save'));

    await waitFor(() => expect(mockCreate).toHaveBeenCalledTimes(1));
  });

  it('should render Edit [reportName] page when reportId is present', async () => {
    const mockLoad = jest.fn();
    setup({ loadReport: mockLoad, report: { ...testReport, id: 1 }, reportId: 1 });
    expect(await screen.findByText('Edit Test report')).toBeInTheDocument();

    // Should also call loadReport on mount
    expect(mockLoad).toHaveBeenCalledTimes(1);
  });

  it("should trigger 'update' prop on save when New report page is rendered ", async () => {
    const mockUpdate = jest.fn();
    setup({ updateReport: mockUpdate, report: { ...testReport, id: 1 }, reportId: 1 });
    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockUpdate).toHaveBeenCalledTimes(1));
  });

  it('should validate the form on submit', async () => {
    setup({ createReport: mockCreate });

    fireEvent.submit(screen.getByText('Save'));

    expect(await screen.findAllByRole('alert')).toHaveLength(3);
    expect(mockCreate).not.toBeCalled();

    expect(await screen.findByText('Name is required')).toBeInTheDocument();
    expect(screen.getByText('Dashboard is required')).toBeInTheDocument();
    expect(screen.getByText('Recipients are required')).toBeInTheDocument();
  });

  it('should correctly set the form values for Edit page', async () => {
    const report = {
      id: 20,
      userId: 1,
      orgId: 1,
      dashboardId: 37,
      dashboardName: 'Datasource tests - Elasticsearch comparison',
      name: 'Test Report',
      recipients: 'me@test.com',
      replyTo: '',
      message:
        'Hi all, \nplease find enclosed a PDF status report. If you have any questions, feel free to get in touch with me!\nHave a great day. \nBest,',
      schedule: {
        frequency: SchedulingFrequency.Weekly,
        day: 'monday',
        hour: 12,
        minute: 0,
        timeZone: 'Europe/Helsinki',
      },
      options: {
        landscape: true,
        timeRange: { from: '', to: '' },
        orientation: 'portrait' as ReportOrientation,
        layout: 'simple' as ReportLayout,
        branding: {
          reportLogoUrl: '',
          emailLogoUrl: '',
          emailFooterMode: 'sent-by',
          emailFooterText: '',
          emailFooterLink: '',
        },
      },
    };

    setup({ report, reportId: report.id });

    await waitFor(() => screen.getByDisplayValue('Test Report'));

    // In this case 'name' option is an accessible name: https://act-rules.github.io/rules/e086e5#accessible-name,
    // e.i. input's label, not the 'name' attribute. For this to work id prop needs to be passed to the input
    expect(screen.getByRole('textbox', { name: /report name/i })).toHaveAttribute('value', report.name);
    expect((screen.getByRole('textbox', { name: /recipients/i }) as HTMLTextAreaElement).value).toBe(report.recipients);
    expect(screen.getByRole('textbox', { name: /reply to/i })).toHaveAttribute('value', report.replyTo);
    expect((screen.getByRole('textbox', { name: /message/i }) as HTMLTextAreaElement).value).toBe(report.message);
    expect(screen.getByText(report.dashboardName)).toBeInTheDocument();
    expect(screen.getByText('Select time range')).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /weekly/i })).toBeChecked();
    expect(screen.getByText(/monday/i)).toBeInTheDocument();
    expect(screen.getByText(/europe\/helsinki/i)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /portrait/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /simple/i })).toBeChecked();
  });

  it('should validate recipients', async () => {
    setup({ createReport: mockCreate });
    fireEvent.input(await screen.findByRole('textbox', { name: /report name/i }), { target: { value: 'Test report' } });
    fireEvent.input(screen.getByRole('textbox', { name: /recipients/i }), { target: { value: 'textme.com' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Save' }));
    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockCreate).not.toBeCalled();
    expect((screen.getByRole('textbox', { name: /report name/i }) as HTMLInputElement).value).toBe('Test report');
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    expect(screen.getByText(/dashboard is required/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
