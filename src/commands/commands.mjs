import { command } from 'cleye';
import {
  config,
  deleteConfigValue,
  setConfigValue
} from '../config/config-store.mjs';
import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';

const emojiCommand = command(
  {
    name: 'config',
    parameters: ['<mode>', '<key=value>']
  },
  (argv) => {
    intro('githook');
    try {
      const { mode, keyValue } = argv._;
      const key = keyValue.split('=')[0];
      if (mode === 'set') setConfigValue(config, key, true);
      else if (mode === 'delete') setConfigValue(config, key, false);
    } catch (error) {
      outro(`${chalk.red('✖')} ${error}`);
      process.exit(1);
    }
  }
);

const openaiApiKeyCommand = command(
  {
    name: 'openai',

    parameters: ['<mode>', '<key=value>']
  },
  (argv) => {
    intro('githook');
    try {
      const { mode, keyValue } = argv._;
      console.log(keyValue);
      const key = keyValue.split('=')[0];
      const value = keyValue.split('=')[1];
      if (mode === 'set') {
        setConfigValue(config, key, value);
      } else if (mode === 'delete') {
        deleteConfigValue(config, key);
      }
    } catch (error) {
      outro(`${chalk.red('✖')} ${error}`);
      process.exit(1);
    }
  }
);
export { emojiCommand, openaiApiKeyCommand };
