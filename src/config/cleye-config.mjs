import { cli } from 'cleye';
import { flags } from '../util/flags.mjs';
import { config, setConfigValue } from './config-store.mjs';

export const argv = cli({
  version: '1.0.0',
  flags
});

const setEmoji = argv.flags.saveEmoji;
const deleteEmoji = argv.flags.deleteEmoji;

if (setEmoji && !deleteEmoji) {
  setConfigValue(config, 'emoji', true);
} else if (deleteEmoji && !setEmoji) {
  setConfigValue(config, 'emoji', false);
}
