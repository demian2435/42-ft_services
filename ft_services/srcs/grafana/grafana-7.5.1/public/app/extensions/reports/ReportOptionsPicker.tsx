import React, { FC } from 'react';
import { Field, RadioButtonGroup } from '@grafana/ui';
import { RadioButtonSize } from '@grafana/ui/src/components/Forms/RadioButtonGroup/RadioButton';
import { ReportOptions, ReportOrientation, ReportLayout, reportOrientations, reportLayouts } from '../types';

type Options = Pick<ReportOptions, 'orientation' | 'layout'>;
interface Props {
  options: Options;
  onChange: (options: Options) => void;
  size?: RadioButtonSize;
}

export const ReportOptionsPicker: FC<Props> = ({
  onChange,
  options = { orientation: 'portrait', layout: 'simple' },
  size = 'md',
}) => {
  const orientation = options.orientation || 'portrait';
  const layout = options.layout || 'simple';

  const onOrientationChange = (newOrientation?: ReportOrientation) => {
    const newOptions: Options = {
      ...options,
      orientation: newOrientation!,
    };
    onChange(newOptions);
  };

  const onLayoutChange = (newLayout?: ReportLayout) => {
    const newOptions: Options = {
      ...options,
      layout: newLayout!,
    };
    onChange(newOptions);
  };

  const selectedOrientation = reportOrientations.find((l) => l.value === orientation);
  const selectedLayout = reportLayouts.find((l) => l.value === layout);

  return (
    <>
      <Field label="Orientation">
        <RadioButtonGroup
          onChange={onOrientationChange}
          options={reportOrientations}
          value={selectedOrientation?.value}
          size={size}
        />
      </Field>
      <Field
        label="Layout"
        description="Simple - Shows one panel per row on the page. Grid - Shows panels in the positions they appear on the dashboard."
      >
        <RadioButtonGroup onChange={onLayoutChange} options={reportLayouts} value={selectedLayout?.value} size={size} />
      </Field>
    </>
  );
};
