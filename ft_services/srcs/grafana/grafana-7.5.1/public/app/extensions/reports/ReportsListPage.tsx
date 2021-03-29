import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { hot } from 'react-hot-loader';
import Page from 'app/core/components/Page/Page';
import EmptyListCTA from 'app/core/components/EmptyListCTA/EmptyListCTA';
import { ReportList } from './ReportsList';
import { NoRenderingInfoBox } from './NoRenderingInfoBox';
import { getNavModel } from 'app/core/selectors/navModel';
import { getReports, deleteReport } from './state/actions';
import { EnterpriseStoreState, Report } from '../types';
import config from 'app/core/config';
import { LinkButton } from '@grafana/ui';
import { isExpired } from '../utils';
import { UnavailableFeatureInfoBox } from './UnavailableFeatureInfoBox';

function mapStateToProps(state: EnterpriseStoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'reports-list'),
    reports: state.reports.reports,
    hasFetched: state.reports.hasFetchedList,
    searchQuery: state.reports.searchQuery,
    reportCount: state.reports.reportCount,
  };
}

const mapDispatchToProps = {
  getReports,
  deleteReport,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export class ReportsListPage extends PureComponent<Props> {
  componentDidMount(): void {
    this.props.getReports();
  }

  deleteReport = (report: Report) => {
    this.props.deleteReport(report.id);
  };

  renderList() {
    const { reports, reportCount } = this.props;
    const { rendererAvailable } = config;

    if (isExpired()) {
      return (
        <>
          <UnavailableFeatureInfoBox
            message="Creating new reports is not available with an expired license.
              Existing reports continue to be processed but you need to update your license to create a new one."
          />
          {reportCount > 0 && <ReportList reports={reports} deleteReport={this.deleteReport} />}
        </>
      );
    }

    return (
      <>
        {!rendererAvailable && <NoRenderingInfoBox variant="error" />}
        {reportCount > 0 ? (
          <>
            <div className="page-action-bar">
              <div className="gf-form gf-form--grow">
                <div className="page-action-bar__spacer" />
                <LinkButton variant="primary" href="reports/new" disabled={!rendererAvailable}>
                  New report
                </LinkButton>
              </div>
            </div>
            <ReportList reports={reports} deleteReport={this.deleteReport} />
          </>
        ) : (
          rendererAvailable && (
            <EmptyListCTA
              title="You haven't created any reports yet."
              buttonIcon="envelope"
              buttonLink="reports/new"
              buttonTitle=" New report"
              proTip=""
              proTipLink=""
              proTipLinkTitle=""
              proTipTarget="_blank"
            />
          )
        )}
      </>
    );
  }

  render() {
    const { hasFetched, navModel } = this.props;

    return (
      <Page navModel={navModel}>
        <Page.Contents isLoading={!hasFetched}>{this.renderList()}</Page.Contents>
      </Page>
    );
  }
}

export default hot(module)(connector(ReportsListPage));
