import React from 'react';
import { css } from 'emotion';
import { InfoBox, Alert, stylesFactory, useTheme } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

export interface Props {
  variant?: 'info' | 'error';
}

const InfoMessage: React.FC = () => {
  return (
    <>
      <>To generate PDF reports, you must install the </>
      <a
        href="https://grafana.com/grafana/plugins/grafana-image-renderer"
        target="_blank"
        rel="noopener noreferrer"
        className="external-link"
      >
        Grafana Image Renderer
      </a>
      <> plugin.</>
    </>
  );
};

const actionMessage = 'Please contact your Grafana administrator to install the plugin.';

export const NoRenderingInfoBox: React.FC<Props> = ({ variant = 'info' }) => {
  const theme = useTheme();
  const styles = getInfoBoxStyles(theme);

  return variant === 'info' ? (
    <InfoBox className={styles.card}>
      <span>
        <InfoMessage />
        <> {actionMessage}</>
      </span>
    </InfoBox>
  ) : (
    <div className={styles.card}>
      <Alert title="" severity="error">
        <div className={styles.message}>
          <p>
            <InfoMessage />
          </p>
          <p>{actionMessage}</p>
        </div>
      </Alert>
    </div>
  );
};

const getInfoBoxStyles = stylesFactory((theme: GrafanaTheme) => ({
  card: css`
    max-width: ${theme.breakpoints.lg};
    margin-top: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.lg};
    align-self: center;
  `,
  message: css`
    margin-top: ${theme.spacing.md};
  `,
}));
