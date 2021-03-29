import { addRouteRegistrationHandler } from 'app/routes/registry';
import LicensePage from './licensing/LicensePage';
import ReportsList from './reports/ReportsListPage';
import ReportsSettings from './reports/ReportsSettingsPage';
import ReportPage from './reports/ReportPage';
import reportsReducers from './reports/state/reducers';
import { initReporting } from './reports';
import DataSourcePermissions from './permissions/DataSourcePermissions';
import { addRootReducer } from 'app/store/configureStore';
import dataSourcePermissionReducers from './permissions/state/reducers';
import { initWhitelabeling } from './whitelabeling';
import { config } from 'app/core/config';
import { initLicenseWarnings } from './licensing';
import { initMetaAnalytics } from './meta-analytics';
import { isExpired } from './utils';
import DataSourceInsights from './meta-analytics/DataSourceInsights/DataSourceInsights';
import metaAnalyticsReducers from './meta-analytics/state/reducers';

function initEnterprise() {
  addRootReducer({ ...dataSourcePermissionReducers, ...reportsReducers, ...metaAnalyticsReducers });

  initWhitelabeling();
  initLicenseWarnings();
  initReporting();

  addRouteRegistrationHandler(($routeProvider) => {
    initMetaAnalytics();

    $routeProvider
      .when('/datasources/edit/:id/permissions', {
        template: '<react-container />',
        resolve: {
          component: () => DataSourcePermissions,
        },
      })
      .when('/reports', {
        template: '<react-container />',
        resolve: {
          component: () => ReportsList,
        },
      })
      .when('/reports/edit/:id', {
        template: '<react-container />',
        resolve: {
          component: () => ReportPage,
        },
      })
      .when('/reports/settings', {
        template: '<react-container />',
        resolve: {
          component: () => ReportsSettings,
        },
      });

    if (!isExpired()) {
      $routeProvider.when('/reports/new', {
        template: '<react-container />',
        resolve: {
          component: () => ReportPage,
        },
      });
    }

    $routeProvider.when('/datasources/edit/:id/insights', {
      template: '<react-container />',
      resolve: {
        component: () => DataSourceInsights,
      },
    });
  });
}

// initUnlicensed initialized features which are defined in Enterprise but
// should be available when running without a license.
function initUnlicensed() {
  addRouteRegistrationHandler(($routeProvider) => {
    $routeProvider.when('/admin/licensing', {
      template: '<react-container />',
      // Do not reload the page when query params change
      reloadOnSearch: false,
      resolve: {
        roles: () => ['Admin'],
        component: () => LicensePage,
      },
    });
  });
}

initUnlicensed();
if (config.licenseInfo.hasLicense) {
  initEnterprise();
}
