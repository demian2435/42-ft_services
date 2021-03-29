import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { css } from 'emotion';
import { GrafanaTheme, SelectableValue, TimeRange, urlUtil } from '@grafana/data';
import {
  Button,
  Field,
  FieldSet,
  Form,
  HorizontalGroup,
  InlineField,
  Input,
  InputControl,
  Legend,
  LinkButton,
  ModalsController,
  stylesFactory,
  TextArea,
  Themeable,
  TimeRangeInput,
  withTheme,
} from '@grafana/ui';
import { DashboardPicker } from 'app/core/components/Select/DashboardPicker';
import Page from 'app/core/components/Page/Page';
import { getRouteParamsId } from 'app/core/selectors/location';
import { getNavModel } from 'app/core/selectors/navModel';
import config from 'app/core/config';
import { getVariables } from 'app/features/variables/state/selectors';
import { VariableHide, VariableModel } from 'app/features/variables/types';
import { variableAdapters } from 'app/features/variables/adapters';
import { cleanUpVariables } from 'app/features/variables/state/actions';
import { hasOptions } from 'app/features/variables/guard';
import { EnterpriseStoreState, ReportDTO, ReportFormData, ReportOptions } from '../types';
import { isExpired } from '../utils';
import { getRange, parseRange } from '../utils/time';
import { validateMultipleEmails } from '../utils/validators';
import { createReport, loadReport, sendTestEmail, updateReport, initVariables } from './state/actions';
import { getSchedule, variablesToCsv } from './utils';
import { clearReportState, updateReportProp } from './state/reducers';
import { ReportScheduling } from './ReportScheduling';
import { ReportOptionsPicker } from './ReportOptionsPicker';
import { SendTestEmailModal } from './SendTestEmailModal';
import { NoRenderingInfoBox } from './NoRenderingInfoBox';

interface OwnProps extends Themeable {}

const mapStateToProps = (state: EnterpriseStoreState) => {
  const reportId = getRouteParamsId(state.location) as number;
  return {
    navModel: getNavModel(state.navIndex, 'reports-list'),
    report: state.reports.report,
    isLoading: state.reports.isLoading,
    reportId,
    variables: getVariables(state),
  };
};

const mapActionsToProps = {
  updateReport,
  loadReport,
  createReport,
  clearReportState,
  updateReportProp,
  sendTestEmail,
  initVariables,
  cleanUpVariables,
};

const connector = connect(mapStateToProps, mapActionsToProps);
export type Props = ConnectedProps<typeof connector> & OwnProps;

export class ReportPage extends PureComponent<Props> {
  componentDidMount() {
    const { loadReport, reportId } = this.props;
    if (reportId) {
      loadReport(reportId);
    }
  }

  componentWillUnmount() {
    this.props.clearReportState();
    this.props.cleanUpVariables();
  }

  onDashboardChange = (dashboard: SelectableValue<number>) => {
    const { initVariables, report: reportProp } = this.props;

    if (dashboard?.uid) {
      const report = dashboard.id === reportProp.dashboardId ? reportProp : undefined;
      initVariables(dashboard.uid, report);
    }
  };

  onOptionsChange = (options: Pick<ReportOptions, 'orientation' | 'layout'>) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, ...options },
    });
  };

  onTimeRangeChange = (timeRange: TimeRange) => {
    const { report, updateReportProp } = this.props;
    updateReportProp({
      ...report,
      options: { ...report.options, timeRange: parseRange(timeRange.raw) },
    });
  };

  /**
   * Get the report data before sending to the api
   * @param formData
   */
  getReportData(formData: ReportFormData): ReportDTO {
    const { report, variables } = this.props;
    const { options } = report;
    const { name, replyTo, recipients, message, dashboard } = formData;
    const schedule = getSchedule(formData.schedule);

    return {
      name,
      recipients,
      dashboardUid: dashboard.uid,
      dashboardId: dashboard.id,
      replyTo,
      message,
      schedule,
      options,
      templateVars: variablesToCsv(variables),
    };
  }

  submitForm = (formData: ReportFormData) => {
    const { createReport, updateReport, reportId } = this.props;
    const createOrUpdate = reportId ? updateReport : createReport;
    const reportData = this.getReportData(formData);
    const reportDto: ReportDTO = {
      id: reportId,
      ...reportData,
    };

    createOrUpdate(reportDto);
  };

  sendTestEmail = (formData: ReportFormData) => (email: string, useEmailsFromReport: boolean) => {
    const reportData = this.getReportData(formData);
    const recipients = useEmailsFromReport ? reportData.recipients : email;

    return sendTestEmail({ ...reportData, recipients });
  };

  getPreviewUrl(dashboardId: ReportFormData['dashboardId']) {
    const { report, variables } = this.props;
    const { name, options } = report;

    if (!dashboardId) {
      return undefined;
    }

    const { from, to } = getRange(options.timeRange).raw;

    const params: any = {
      title: name,
      from: from.valueOf(),
      to: to.valueOf(),
    };

    if (options.orientation) {
      params.orientation = options.orientation;
    }

    if (options.layout) {
      params.layout = options.layout;
    }

    if (variables?.length) {
      params.variables = JSON.stringify(variablesToCsv(variables));
    }

    return urlUtil.appendQueryToUrl(`api/reports/render/pdf/${dashboardId}`, urlUtil.toUrlParams(params));
  }

  render() {
    const { navModel, report, reportId, isLoading, theme, variables: propVariables } = this.props;
    const { message, name, recipients, replyTo, schedule, dashboardId, dashboardName, dashboardUid, options } = report;
    const timeRange = getRange(options.timeRange);
    const heading = reportId ? `Edit ${name}` : 'New report';
    const dashboardSelected = (dashboardId ?? 0) > 0;
    const currentDashboard = dashboardSelected
      ? { value: dashboardId, id: dashboardId, uid: dashboardUid, label: dashboardName }
      : undefined;
    const styles = getStyles(theme);
    const variables = propVariables.filter((variable) => variable.hide !== VariableHide.hideVariable);

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={Boolean(isLoading && reportId)}>
          {!config.rendererAvailable ? (
            <NoRenderingInfoBox variant="error" />
          ) : (
            <>
              <Legend className={styles.header}>{heading}</Legend>
              <Form onSubmit={this.submitForm} validateOn="onBlur">
                {({ register, errors, control, formState, getValues, watch }) => {
                  const watchDashboard = watch('dashboard');

                  return (
                    <>
                      <Field label="Report name" required invalid={!!errors.name} error="Name is required">
                        <Input
                          type="text"
                          id="name"
                          defaultValue={name}
                          name="name"
                          ref={register({ required: true })}
                          placeholder="System status report"
                        />
                      </Field>
                      <Field
                        label="Source dashboard"
                        required
                        invalid={!!errors.dashboard}
                        error="Dashboard is required"
                      >
                        <InputControl
                          name="dashboard"
                          control={control}
                          as={DashboardPicker}
                          onChange={([dashboard]: SelectableValue[]) => {
                            this.onDashboardChange(dashboard);
                            return dashboard;
                          }}
                          defaultValue={currentDashboard}
                          rules={{ required: true }}
                          isClearable
                        />
                      </Field>
                      {watchDashboard?.id !== undefined && Boolean(variables.length) && (
                        <Field label={'Template variables'}>
                          <>
                            {variables.map((variable) => {
                              const { picker: Picker, setValue } = variableAdapters.get(variable.type);
                              return (
                                <InlineField label={variable.name} key={variable.name} labelWidth={16}>
                                  <Picker
                                    onVariableChange={(updated: VariableModel) => {
                                      if (hasOptions(updated)) {
                                        setValue(updated, updated.current);
                                      }
                                    }}
                                    variable={variable}
                                  />
                                </InlineField>
                              );
                            })}
                          </>
                        </Field>
                      )}
                      <Field
                        label="Recipients"
                        required
                        invalid={!!errors.recipients}
                        error={errors.recipients?.message}
                      >
                        <TextArea
                          id="recipients"
                          name="recipients"
                          ref={register({
                            required: 'Recipients are required',
                            validate: (val) => validateMultipleEmails(val) || 'Invalid email',
                          })}
                          placeholder="name@company.com;another.name@company.com"
                          defaultValue={recipients}
                        />
                      </Field>
                      <Field label="Reply to">
                        <Input
                          id="replyTo"
                          name="replyTo"
                          ref={register}
                          placeholder="your.address@company.com - optional"
                          type="email"
                          defaultValue={replyTo}
                        />
                      </Field>
                      <Field label="Message">
                        <TextArea
                          id="message"
                          name="message"
                          placeholder={message}
                          rows={10}
                          ref={register}
                          defaultValue={message}
                        />
                      </Field>

                      <Field
                        label="Time range"
                        description="Generate report with the data from specified time range. If custom time range is empty the time range from the report's dashboard is used."
                      >
                        <TimeRangeInput value={timeRange} onChange={this.onTimeRangeChange} clearable />
                      </Field>

                      <ReportScheduling control={control} watch={watch} schedulingOptions={schedule} />

                      <FieldSet label="PDF Styling">
                        <ReportOptionsPicker options={options} onChange={this.onOptionsChange} />
                      </FieldSet>

                      <HorizontalGroup spacing="md">
                        <Button type="submit" size="md" variant="primary">
                          Save
                        </Button>

                        <LinkButton
                          href={this.getPreviewUrl(watchDashboard?.id)}
                          size="xs"
                          target="_blank"
                          rel="noreferrer noopener"
                          variant="secondary"
                          disabled={!formState.isValid || isExpired()}
                        >
                          Preview PDF
                        </LinkButton>
                        <ModalsController>
                          {({ showModal, hideModal }) => (
                            <Button
                              disabled={!formState.isValid || isExpired()}
                              size="xs"
                              variant="secondary"
                              onClick={(e) => {
                                e.preventDefault();
                                showModal(SendTestEmailModal, {
                                  onDismiss: hideModal,
                                  onSendTestEmail: this.sendTestEmail(getValues({ nest: true })),
                                  emails: getValues().recipients,
                                });
                              }}
                            >
                              Send test email
                            </Button>
                          )}
                        </ModalsController>
                      </HorizontalGroup>
                    </>
                  );
                }}
              </Form>
            </>
          )}
        </Page.Contents>
      </Page>
    );
  }
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    header: css`
      font-size: ${theme.typography.heading.h2};
    `,
  };
});

export default connector(withTheme(ReportPage));
