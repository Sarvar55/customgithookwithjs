import { confirm } from '@clack/prompts';
import chalk from 'chalk';
import cliSelect from 'cli-select';

const isConfirm = async (message) => {
  return await confirm({
    message: message
  });
};

const customCliSelect = async (values) => {
  const { value } = await cliSelect({
    values: values,
    valueRenderer: (value, selected) => {
      if (selected) {
        return chalk.underline(value);
      }
      return value;
    }
  });
  return value;
};

export { isConfirm, customCliSelect };
