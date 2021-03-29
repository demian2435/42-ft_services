import React, { PureComponent } from 'react';
import { urlUtil } from '@grafana/data';
import { ModalTabContent, Button, LinkButton, RadioButtonGroup, Field } from '@grafana/ui';
import { ShareModalTabProps } from 'app/features/dashboard/components/ShareModal';
import { NoRenderingInfoBox } from './NoRenderingInfoBox';
import { ReportOrientation, ReportLayout, reportOrientations, reportLayouts } from '../types';
import config from 'app/core/config';
import { isExpired } from '../utils';
import { UnavailableFeatureInfoBox } from './UnavailableFeatureInfoBox';

type Props = ShareModalTabProps;

interface State {
  pdfUrl: string;
  orientation?: ReportOrientation;
  layout?: ReportLayout;
}

export class SharePDF extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pdfUrl: '',
      orientation: 'portrait',
      layout: 'simple',
    };
  }

  componentDidMount() {
    this.buildPdfLink();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { orientation, layout } = this.state;
    if (prevState.orientation !== orientation || prevState.layout !== layout) {
      this.buildPdfLink();
    }
  }

  buildPdfLink() {
    const { dashboard } = this.props;
    const { orientation, layout } = this.state;

    let rootPath = window.location.origin + config.appSubUrl;
    if (rootPath.endsWith('/')) {
      rootPath.slice(0, -1);
    }
    let pdfUrl = `${rootPath}/api/reports/render/pdf/${dashboard.id}`;

    const params = { orientation, layout };
    pdfUrl = urlUtil.appendQueryToUrl(pdfUrl, urlUtil.toUrlParams(params));

    this.setState({ pdfUrl });
  }

  onOrientationChange = (orientation?: ReportOrientation) => {
    this.setState({ orientation });
  };

  onLayoutChange = (layout?: ReportLayout) => {
    this.setState({ layout });
  };

  render() {
    const { onDismiss } = this.props;
    const { pdfUrl, orientation, layout } = this.state;

    if (!config.rendererAvailable) {
      return <NoRenderingInfoBox />;
    }

    if (isExpired()) {
      return (
        <UnavailableFeatureInfoBox
          message="Rendering dashboard as a PDF document is not available with an expired license.
            You need to update your license to enable this feature."
        />
      );
    }

    return (
      <ModalTabContent icon="file-alt">
        <p className="share-modal-info-text">Render dashboard as a PDF document.</p>
        <Field label="Orientation">
          <RadioButtonGroup options={reportOrientations} value={orientation} onChange={this.onOrientationChange} />
        </Field>
        <Field label="Layout">
          <RadioButtonGroup options={reportLayouts} value={layout} onChange={this.onLayoutChange} />
        </Field>
        <div className="gf-form-button-row">
          <LinkButton variant="primary" href={pdfUrl} target="_blank" rel="noreferrer noopener">
            Save as PDF
          </LinkButton>
          <Button variant="secondary" onClick={onDismiss}>
            Cancel
          </Button>
        </div>
      </ModalTabContent>
    );
  }
}
