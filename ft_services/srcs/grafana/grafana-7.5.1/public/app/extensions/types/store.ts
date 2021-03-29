import { StoreState } from 'app/types';
import { DataSourcePermissionState } from './permissions';
import { ReportsState } from './reports';
import { MetaAnalyticsState } from './metaanalytics';

export interface EnterpriseStoreState extends StoreState {
  dataSourcePermission: DataSourcePermissionState;
  reports: ReportsState;
  metaAnalytics: MetaAnalyticsState;
}
