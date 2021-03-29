import React from 'react';
import ReactDOM from 'react-dom';
import store from 'app/core/store';
import { config } from 'app/core/config';
import { contextSrv } from 'app/core/services/context_srv';
import { dateTime } from '@grafana/data';
import { IsInvalid, HasExpired, ExpiresSoon, TokenExpiresSoon, MaxUsersReached } from './LicenseWarning';
import { OrgRole } from 'app/types';
import { refreshLicenseStats, ActiveUserStats } from './state/api';
import { isExpired, isInvalid } from '../utils';

const DISMISS_WARNING_FOR_DAYS = 5;
/* The auto dismiss cannot be too low as it will also trigger the snooze */
const WARNING_CLOSE_TIMEOUT_SEC = 3600;
const LICENSE_WARNING_DISMISS_UNTIL_KEY = 'grafana.licence.warning.dismissUntil';

let warningContainer: HTMLElement | null = null;

interface LicensingSettings {
  activeAdminsAndEditors?: number;
  activeViewers?: number;
  includedAdmins?: number;
  includedViewers?: number;
  slug?: string;
  licenseExpiry?: number;
  licenseExpiryWarnDays?: number;
  tokenExpiry?: number;
  tokenExpiryWarnDays?: number;
  usageBilling?: boolean;
}

export function initLicenseWarnings() {
  setTimeout(renderLicenseWarning, 1000);
}

export function onCloseWarning() {
  const dismissTill = dateTime().add(DISMISS_WARNING_FOR_DAYS, 'd').valueOf();
  store.set(LICENSE_WARNING_DISMISS_UNTIL_KEY, dismissTill);
  if (warningContainer && warningContainer.parentNode) {
    warningContainer.parentNode.removeChild(warningContainer);
  }
}

export async function onRefreshWarning() {
  const activeUserStats: ActiveUserStats | null = await refreshLicenseStats().catch((err) => null);
  const settings = (config as any).licensing as LicensingSettings;

  if (activeUserStats) {
    settings.activeAdminsAndEditors = activeUserStats.active_admins_and_editors;
    settings.activeViewers = activeUserStats.active_viewers;
  }

  renderLicenseWarning();
}

export function renderLicenseWarning() {
  warningContainer = warningContainer || document.createElement('div');

  if (isRenderingPanel() || isLicenseAdminPage()) {
    if (warningContainer.parentNode) {
      warningContainer.parentNode.removeChild(warningContainer);
    }
    return;
  }

  const dismissUntil = store.get(LICENSE_WARNING_DISMISS_UNTIL_KEY);
  const hasDismissed = dismissUntil && dismissUntil > dateTime().valueOf();
  const isAdmin = contextSrv.hasRole(OrgRole.Admin);
  const showExpireSoon = isAdmin && willExpireSoon() && !hasDismissed;
  const showTokenExpireSoon = isAdmin && tokenWillExpireSoon() && !hasDismissed;

  const settings = (config as any).licensing as LicensingSettings;
  const maxAdminsReached = numberOfActiveUsersReached(settings.includedAdmins, settings.activeAdminsAndEditors);
  const maxViewersReached = numberOfActiveUsersReached(settings.includedViewers, settings.activeViewers);
  const usageBillingDisabled = isUsageBillingDisabled();

  const isAdminOrServerAdmin = isAdmin || contextSrv.isGrafanaAdmin;
  const showMaxUsersReached = usageBillingDisabled && (maxAdminsReached || maxViewersReached) && isAdminOrServerAdmin;

  if (isInvalid()) {
    ReactDOM.render(<IsInvalid isGrafanaAdmin={contextSrv.isGrafanaAdmin} />, warningContainer);
  } else if (isExpired()) {
    ReactDOM.render(<HasExpired isGrafanaAdmin={contextSrv.isGrafanaAdmin} />, warningContainer);
  } else if (showMaxUsersReached) {
    ReactDOM.render(
      <MaxUsersReached
        activeUsers={maxAdminsReached ? settings.activeAdminsAndEditors! : settings.activeViewers!}
        maxUsers={maxAdminsReached ? settings.includedAdmins! : settings.includedViewers!}
        type={maxAdminsReached ? 'admins / editors' : 'viewers'}
        slug={settings.slug}
        onRefreshWarning={isAdmin ? onRefreshWarning : undefined}
      />,
      warningContainer
    );
  } else if (showExpireSoon) {
    const expiresIn = willExpireInDays();
    ReactDOM.render(
      <ExpiresSoon days={expiresIn} onCloseWarning={onCloseWarning} isGrafanaAdmin={contextSrv.isGrafanaAdmin} />,
      warningContainer
    );

    // auto hide expire warning in case it's a TV monitor with admin permissions
    setTimeout(onCloseWarning, 1000 * WARNING_CLOSE_TIMEOUT_SEC);
  } else if (showTokenExpireSoon) {
    const expiresIn = tokenWillExpireInDays();
    ReactDOM.render(
      <TokenExpiresSoon days={expiresIn} onCloseWarning={onCloseWarning} isGrafanaAdmin={contextSrv.isGrafanaAdmin} />,
      warningContainer
    );

    // auto hide expire warning in case it's a TV monitor with admin permissions
    setTimeout(onCloseWarning, 1000 * WARNING_CLOSE_TIMEOUT_SEC);
  } else {
    if (warningContainer.parentNode) {
      warningContainer.parentNode.removeChild(warningContainer);
    }

    return;
  }

  getMainView().appendChild(warningContainer);
}

function getMainView(): Element {
  return document.getElementsByClassName('main-view')[0];
}

export function willExpireSoon(): boolean {
  const { licenseExpiry, licenseExpiryWarnDays = 30 } = (config as any).licensing;
  return licenseExpiry > 0 && dateTime(licenseExpiry * 1000) < dateTime().add(licenseExpiryWarnDays, 'd');
}

export function willExpireInDays(): number {
  const { licenseExpiry } = (config as any).licensing;
  return Math.ceil((licenseExpiry - dateTime().unix()) / 3600 / 24);
}

function tokenWillExpireSoon(): boolean {
  const { tokenExpiry, tokenExpiryWarnDays = 3 } = (config as any).licensing;
  return tokenExpiry > 0 && dateTime(tokenExpiry * 1000) < dateTime().add(tokenExpiryWarnDays, 'd');
}

function tokenWillExpireInDays(): number {
  const { tokenExpiry } = (config as any).licensing;
  return Math.ceil((tokenExpiry - dateTime().unix()) / 3600 / 24);
}

export function numberOfActiveUsersReached(includedUsers?: number, activeUsers?: number): boolean {
  if (includedUsers === undefined || activeUsers === undefined) {
    return false;
  }
  return includedUsers !== -1 && activeUsers > includedUsers;
}

function isUsageBillingDisabled(): boolean {
  const settings = (config as any).licensing as LicensingSettings;
  return !settings.usageBilling;
}

function isSoloPanel(): boolean {
  const soloPanelPattern = /\/d-solo\//;
  const path = window.location.pathname;
  return soloPanelPattern.test(path);
}

function isRenderingPanel(): boolean {
  return isSoloPanel();
}

function isLicenseAdminPage(): boolean {
  const pattern = /\/admin\/licensing$/;
  const path = window.location.pathname;
  return pattern.test(path);
}
