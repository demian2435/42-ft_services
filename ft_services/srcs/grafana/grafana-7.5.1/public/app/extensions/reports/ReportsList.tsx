import React, { FC } from 'react';
import _ from 'lodash';
import { DeleteButton } from '@grafana/ui';
import { Report, SchedulingFrequency, SchedulingOptions } from '../types';

interface Props {
  reports: Report[];
  deleteReport: (report: Report) => void;
}

function parseScheduleTime(schedule: SchedulingOptions) {
  let time = '';

  const minute = schedule.minute === 0 ? '00' : schedule.minute;

  switch (schedule.frequency) {
    case SchedulingFrequency.Monthly:
      time = `Monthly ${
        isNaN(parseInt(schedule.dayOfMonth!, 10)) ? `on ${schedule.dayOfMonth} day` : `on day ${schedule.dayOfMonth}`
      } at ${schedule.hour}:${minute}`;
      break;
    case SchedulingFrequency.Weekly:
      time = `Every ${_.capitalize(schedule.day)} at ${schedule.hour}:${minute}`;
      break;
    case SchedulingFrequency.Daily:
      time = `Daily at ${schedule.hour}:${minute}`;
      break;
    case SchedulingFrequency.Hourly:
      time = `Hourly at minute ${minute}`;
      break;
    case SchedulingFrequency.Never:
      time = `Never`;
      break;
  }

  return time;
}

export const ReportList: FC<Props> = ({ deleteReport, reports }) => {
  return (
    <table className="filter-table filter-table--hover form-inline">
      <thead>
        <tr>
          <th>Name</th>
          <th>Dashboard</th>
          <th>Schedule</th>
          <th style={{ width: '1%' }} />
        </tr>
      </thead>
      <tbody>
        {reports.map((report, index) => {
          const reportUrl = `reports/edit/${report.id}`;
          return (
            <tr key={`${report.id}-${index}`}>
              <td className="link-td">
                <a href={reportUrl}>{report.name}</a>
              </td>
              <td className="link-td">
                <a href={reportUrl}>{report.dashboardName}</a>
              </td>
              <td className="link-td">
                <a href={reportUrl}>{parseScheduleTime(report.schedule)}</a>
              </td>
              <td className="text-right">
                <DeleteButton size="sm" onConfirm={() => deleteReport(report)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
