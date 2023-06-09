import { command } from 'cleye';
import { config, setConfigValue } from '../config/config-store.mjs';
import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';

export const emojiCommand = command(
  {
    name: 'config',
    parameters: ['<mode>', '<key=value>']
  },
  (argv) => {
    intro('githook');
    try {
      const { mode, keyValue } = argv._;
      const key = keyValue.split('=')[0];
      const value = keyValue.split('=')[1];
      if (mode === 'set') setConfigValue(config, key, true);
      else if (mode === 'delete') setConfigValue(config, key, false);
    } catch (error) {
      outro(`${chalk.red('✖')} ${error.message}`);
      process.exit(1);
    }
  }
);
