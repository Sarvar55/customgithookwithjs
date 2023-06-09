import { cli } from 'cleye';
import { emojiCommand } from '../commands/commands.mjs';

export const argv = cli({
  version: '1.0.0',
  commands: [emojiCommand]
});
