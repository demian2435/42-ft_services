import React, { FC } from 'react';
import {
  TimeOfDayPicker,
  TimeZonePicker,
  Select,
  RadioButtonGroup,
  Field,
  HorizontalGroup,
  FieldSet,
  InputControl,
  FormAPI,
} from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import { daysOfWeek, daysOfMonth, SchedulingFrequency, SchedulingOptions, ReportFormData } from '../types';

interface Props extends Omit<FormAPI<ReportFormData>, 'register' | 'errors' | 'formState' | 'getValues'> {
  schedulingOptions: SchedulingOptions;
}

const frequencyOptions: SelectableValue[] = [
  { label: 'Monthly', value: SchedulingFrequency.Monthly },
  { label: 'Weekly', value: SchedulingFrequency.Weekly },
  { label: 'Daily', value: SchedulingFrequency.Daily },
  { label: 'Hourly', value: SchedulingFrequency.Hourly },
  { label: 'Never', value: SchedulingFrequency.Never },
];

export const ReportScheduling: FC<Props> = ({ schedulingOptions, control, watch }) => {
  const { frequency, hour, minute, timeZone } = schedulingOptions;
  const watchFrequency = watch('schedule.frequency', frequency);

  const selectedDayOfWeek = daysOfWeek.find((day) => schedulingOptions.day === day.value);
  const selectedDayOfMonth = daysOfMonth.find((day) => schedulingOptions.dayOfMonth === day.value);

  return (
    <FieldSet label="Scheduling">
      <Field label="Frequency">
        <InputControl
          defaultValue={frequency}
          name="schedule.frequency"
          as={RadioButtonGroup}
          fullWidth
          options={frequencyOptions}
          control={control}
        />
      </Field>
      {watchFrequency === SchedulingFrequency.Monthly && (
        <Field
          label="Day in month"
          description="If you set 29-31, the report will not be sent every month. Choose 'Last' to send the report on the last day of every month."
        >
          <InputControl
            name="schedule.dayOfMonth"
            as={Select}
            control={control}
            options={daysOfMonth}
            defaultValue={selectedDayOfMonth?.value}
            onChange={([selected]) => selected.value}
          />
        </Field>
      )}
      {watchFrequency === SchedulingFrequency.Weekly && (
        <Field label="Day">
          <InputControl
            name="schedule.day"
            defaultValue={selectedDayOfWeek?.value}
            as={Select}
            options={daysOfWeek}
            control={control}
            onChange={([selected]) => selected.value}
          />
        </Field>
      )}
      <HorizontalGroup justify="space-between" width={'100%'}>
        {[SchedulingFrequency.Weekly, SchedulingFrequency.Monthly, SchedulingFrequency.Daily].includes(
          watchFrequency as SchedulingFrequency
        ) && (
          <Field label="Time">
            <InputControl
              name="schedule.time"
              as={TimeOfDayPicker}
              minuteStep={10}
              defaultValue={{ hour, minute }}
              control={control}
              onChange={([selected]) => ({
                hour: selected.hour(),
                minute: selected.minute(),
              })}
            />
          </Field>
        )}

        {watchFrequency === SchedulingFrequency.Hourly && (
          <Field label="At minute">
            <InputControl
              showHour={false}
              name="schedule.time"
              as={TimeOfDayPicker}
              minuteStep={10}
              defaultValue={{ hour, minute }}
              control={control}
              onChange={([selected]) => ({
                hour: selected.hour(),
                minute: selected.minute(),
              })}
            />
          </Field>
        )}
        {watchFrequency !== SchedulingFrequency.Never && (
          <Field label="Time zone">
            <InputControl
              name="schedule.timeZone"
              as={TimeZonePicker}
              defaultValue={timeZone}
              control={control}
              width={30}
              onChange={([selected]) => selected}
            />
          </Field>
        )}
      </HorizontalGroup>
    </FieldSet>
  );
};
