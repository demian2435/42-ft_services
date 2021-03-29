import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { hot } from 'react-hot-loader';
import { useAsync } from 'react-use';
import { NavModel } from '@grafana/data';
import { Button, Form } from '@grafana/ui';
import { getBackendSrv } from '@grafana/runtime';
import config from 'app/core/config';
import { getNavModel } from 'app/core/selectors/navModel';
import { updateLocation } from 'app/core/actions';
import Page from 'app/core/components/Page/Page';
import { ErrorPage } from 'app/core/components/ErrorPage/ErrorPage';
import { EnterpriseStoreState, ReportsSettings } from '../types';
import ReportBranding from './ReportBranding';
import { NoRenderingInfoBox } from './NoRenderingInfoBox';

interface OwnProps {}

interface ConnectedProps {
  navModel: NavModel;
}

interface DispatchProps {
  updateLocation: typeof updateLocation;
}

export type Props = DispatchProps & ConnectedProps & OwnProps;

export const ReportsSettingsPage = ({ navModel, updateLocation }: Props) => {
  const { value: settings, loading, error } = useAsync(async () => {
    return getBackendSrv().get('/api/reports/settings');
  });

  const submitForm = (settingsData: ReportsSettings) => {
    getBackendSrv()
      .post('/api/reports/settings', settingsData)
      .then(() => updateLocation({ path: '/reports' }));
  };

  if (error) {
    return <ErrorPage navModel={navModel} />;
  }

  return (
    <Page navModel={navModel}>
      <Page.Contents isLoading={loading}>
        {!config.rendererAvailable ? (
          <NoRenderingInfoBox variant="error" />
        ) : (
          <Form onSubmit={submitForm} validateOn="onBlur">
            {(formProps) => {
              return (
                <>
                  <ReportBranding settings={settings} {...formProps} />
                  <Button type="submit" size="md" variant="primary">
                    Save
                  </Button>
                </>
              );
            }}
          </Form>
        )}
      </Page.Contents>
    </Page>
  );
};

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, EnterpriseStoreState> = (state) => {
  return {
    navModel: getNavModel(state.navIndex, 'reports-settings'),
  };
};

const mapActionsToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  updateLocation,
};

export default hot(module)(connect(mapStateToProps, mapActionsToProps)(ReportsSettingsPage));
