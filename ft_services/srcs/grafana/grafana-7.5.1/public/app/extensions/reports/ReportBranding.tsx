import React, { FC } from 'react';
import { Input, Field, FormAPI, RadioButtonGroup, FieldSet, InputControl } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { FooterMode, ReportsSettings } from '../types';
import { ImagePreview } from './ImagePreview';
import { defaultEmailLogo, defaultReportLogo } from './constants';
import { isValidImageExt } from '../utils/validators';

interface Props extends FormAPI<ReportsSettings> {
  settings: ReportsSettings;
}

const footerModeOptions: SelectableValue[] = [
  { label: 'Sent By', value: FooterMode.SentBy },
  { label: 'None', value: FooterMode.None },
];

const validateImg = (val: string) => {
  return isValidImageExt(val) || 'Invalid image extension. Supported formats: png, jpg, gif.';
};

const ReportBranding: FC<Props> = ({ settings, register, control, watch, errors }) => {
  const { reportLogoUrl, emailLogoUrl, emailFooterMode, emailFooterText, emailFooterLink } = settings.branding;
  const watchReportLogo = watch('branding.reportLogoUrl', reportLogoUrl);
  const watchEmailLogo = watch('branding.emailLogoUrl', emailLogoUrl);
  const watchFooterMode = watch('branding.emailFooterMode', emailFooterMode || FooterMode.SentBy);

  return (
    <>
      <FieldSet label="Report branding">
        <Field
          label="Company logo URL"
          description="The logo will be displayed in the document footer. Supported formats: png, jpg, gif."
          invalid={!!errors.branding?.reportLogoUrl}
          error={errors.branding?.reportLogoUrl?.message}
        >
          <Input
            aria-label="Report logo"
            id="reportLogo"
            defaultValue={reportLogoUrl}
            name="branding.reportLogoUrl"
            ref={register({
              validate: validateImg,
            })}
            placeholder="http://your.site/logo.png"
            type="url"
          />
        </Field>
        <ImagePreview url={(watchReportLogo || defaultReportLogo) as string} width="60px" />
      </FieldSet>

      <FieldSet label="Email branding">
        <Field
          label="Company logo URL"
          description="The logo will be displayed in the email header. Supported formats: png, jpg, gif."
          invalid={!!errors.branding?.emailLogoUrl}
          error={errors.branding?.emailLogoUrl?.message}
        >
          <Input
            aria-label="Email logo"
            id="emailLogo"
            defaultValue={emailLogoUrl}
            name="branding.emailLogoUrl"
            ref={register({
              validate: validateImg,
            })}
            placeholder="http://your.site/logo.png"
            type="url"
          />
        </Field>
        <ImagePreview url={(watchEmailLogo || defaultEmailLogo) as string} />
        <Field label="Email footer">
          <InputControl
            defaultValue={emailFooterMode || FooterMode.SentBy}
            name="branding.emailFooterMode"
            as={RadioButtonGroup}
            options={footerModeOptions}
            control={control}
          />
        </Field>
        {watchFooterMode === FooterMode.SentBy && (
          <>
            <Field label="Footer link text">
              <Input
                id="emailFooterText"
                defaultValue={emailFooterText}
                name="branding.emailFooterText"
                ref={register}
                placeholder="Grafana"
                type="text"
              />
            </Field>
            <Field label="Footer link URL">
              <Input
                id="emailFooterLink"
                defaultValue={emailFooterLink}
                name="branding.emailFooterLink"
                ref={register}
                placeholder="http://your.site"
                type="url"
              />
            </Field>
          </>
        )}
      </FieldSet>
    </>
  );
};

export default ReportBranding;
