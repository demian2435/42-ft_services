import { getBackendSrv } from '@grafana/runtime';
import { updateLocation } from 'app/core/actions';
import config from 'app/core/config';
import { ThunkResult } from 'app/types';
import { Report, ReportDTO } from '../../types';
import { reportLoaded, reportsLoaded, reportLoadingBegin, reportLoadingEnd } from './reducers';
import { backendSrv } from 'app/core/services/backend_srv';
import { DashboardModel } from 'app/features/dashboard/state';
import { cleanUpVariables, initVariablesTransaction } from 'app/features/variables/state/actions';
import { applyDefaultVariables } from '../utils';

export function getReports(): ThunkResult<void> {
  return async (dispatch) => {
    const reports = await getBackendSrv().get('/api/reports');
    dispatch(reportsLoaded(reports));
  };
}

export function initVariables(dashboardUid: string, report?: Report): ThunkResult<void> {
  return async (dispatch) => {
    if (!config.featureToggles.reportVariables) {
      return;
    }
    const resp = await backendSrv.getDashboardByUid(dashboardUid);
    const dashboard = new DashboardModel(resp.dashboard, resp.meta);
    const list = applyDefaultVariables(dashboard.templating.list, report?.templateVars);
    dispatch(cleanUpVariables());
    dispatch(initVariablesTransaction(resp.dashboard.uid, { ...dashboard, templating: { list } } as DashboardModel));
  };
}

export function loadReport(id: number): ThunkResult<void> {
  return async (dispatch) => {
    dispatch(reportLoadingBegin());
    try {
      const report = await getBackendSrv().get(`/api/reports/${id}`);
      if (report?.dashboardUid) {
        dispatch(initVariables(report.dashboardUid, report));
      }
      dispatch(reportLoaded(report));
    } catch (e) {
      dispatch(reportLoadingEnd());
    }
  };
}

export function sendTestEmail(report: ReportDTO): Promise<any> {
  return getBackendSrv().post(`/api/reports/test-email/`, report);
}

export function deleteReport(id: number): ThunkResult<void> {
  return async (dispatch) => {
    await getBackendSrv().delete(`/api/reports/${id}`);
    dispatch(getReports());
  };
}

export function createReport(report: ReportDTO): ThunkResult<void> {
  return async (dispatch) => {
    try {
      await getBackendSrv().post('/api/reports', report);
    } catch (error) {
      throw error;
    }
    dispatch(getReports());
    dispatch(updateLocation({ path: '/reports' }));
  };
}

export function updateReport(report: ReportDTO): ThunkResult<void> {
  return async (dispatch) => {
    await getBackendSrv().put(`/api/reports/${report.id}`, report);
    dispatch(getReports());
    dispatch(updateLocation({ path: '/reports' }));
  };
}
