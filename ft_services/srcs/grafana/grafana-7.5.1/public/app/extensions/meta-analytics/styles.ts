import { css } from 'emotion';
import { stylesFactory } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export interface InsightsStyles {
  tabContent: string;
  tabsBar: string;
  graphContainer: string;
  userBoxesContainer: string;
  userBox: string;
  userName: string;
  tableContainer: string;
  tableHeader: string;
  userIcon: string;
}

export const getInsightsStyles = stylesFactory(
  (theme: GrafanaTheme): InsightsStyles => {
    const containerBg = theme.colors.bg2;

    return {
      tabContent: css`
        height: 100%;
      `,
      tabsBar: css`
        padding-left: ${theme.spacing.md};
        margin: ${theme.spacing.lg} -${theme.spacing.sm} -${theme.spacing.lg} -${theme.spacing.lg};
      `,
      graphContainer: css`
        margin-top: ${theme.spacing.md};
        background-color: ${containerBg};
      `,
      userBoxesContainer: css`
        display: flex;
        margin-top: ${theme.spacing.lg};

        > div + div {
          margin-left: ${theme.spacing.md};
        }
      `,
      userBox: css`
        padding: ${theme.spacing.md};
        flex: 1;
        text-align: center;
        background-color: ${containerBg};
        border-radius: 3px;

        button,
        img {
          margin: 0 0 ${theme.spacing.sm} 0;
        }
      `,
      userName: css`
        font-weight: ${theme.typography.weight.bold};
      `,
      tableContainer: css`
        margin-top: ${theme.spacing.lg};
        background-color: ${containerBg};
        padding-bottom: ${theme.spacing.sm};
        border-radius: 3px;

        [role='cell']:first-child > div {
          padding: 4px;
        }
        [role='columnheader']:first-child {
          height: 33px;
        }
        [role='row']:not(:only-child):nth-child(odd) {
          background-color: ${theme.colors.bg1};
        }
      `,
      tableHeader: css`
        padding: 0 ${theme.spacing.md} ${theme.spacing.xs} ${theme.spacing.md};
        display: flex;
        justify-content: space-between;
        align-items: center;

        h4 {
          margin-bottom: 0px;
          padding: ${theme.spacing.lg} 0;
        }
      `,
      userIcon: css`
        margin: 0 0;
        width: 26px;
        height: 26px;
      `,
    };
  }
);
