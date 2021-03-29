import { Report, SchedulingData, SchedulingOptions } from '../types';
import { VariableModel } from 'app/features/variables/types';
import { hasOptions } from 'app/features/variables/guard';
import { variableAdapters } from 'app/features/variables/adapters';

/**
 * Move hour and minute from time to schedule
 * @param scheduleData
 */
export const getSchedule = (scheduleData = {} as SchedulingData): SchedulingOptions => {
  const { time, ...schedule } = scheduleData;
  return { ...schedule, ...time };
};

/**
 * Convert variable values to CSV and remove all empty keys before sending to backend
 * @param variables
 */
export const variablesToCsv = (variables?: VariableModel[]) => {
  if (!variables?.length) {
    return {};
  }

  return Object.fromEntries(
    variables.map((variable) => {
      const { getValueForUrl } = variableAdapters.get(variable.type);
      const value = getValueForUrl(variable);
      return [variable.name, Array.isArray(value) ? value.join(',') : value];
    })
  );
};

export const applyDefaultVariables = (variables: VariableModel[], reportVariables?: Report['templateVars']) => {
  if (!reportVariables || !Object.keys(reportVariables).length) {
    return variables;
  }

  return variables.map((variable) => {
    const reportVariable = reportVariables[variable.name];
    if (!reportVariable || !hasOptions(variable)) {
      return variable;
    }

    const split = reportVariable.split(',');
    const values = split
      .map((str) => variable.options.find((opt) => opt.value === str) || { text: str, value: str })
      .filter(Boolean);

    return {
      ...variable,
      current: { ...variable.current, text: values.map((val) => val?.text), value: values.map((val) => val?.value) },
      options: variable.options.map((option) => ({
        ...option,
        selected: typeof option.value === 'string' && split.includes(option.value),
      })),
    };
  });
};
