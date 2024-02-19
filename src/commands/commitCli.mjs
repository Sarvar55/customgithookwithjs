import { outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { customCliSelect, isConfirm } from '../util/util.mjs';
import {
  addFilesToStaged,
  getChangedFiles,
  getCommitSubject,
  getStatus,
  gitCommit
} from '../util/git.js';
import { commitTypesWithEmoji, commitTypes } from '../util/constants.mjs';
import { getConfigValue, config } from '../config/config-store.mjs';
import { translateCommitMessage } from '../api.mjs';

export const commit = async () => {
  const changedFiles = await getChangedFiles();

  if (changedFiles.length === 0) {
    outro(`${chalk.red('✖')}  commit için herhangi bir değişiklik yok.`);
    process.exit(1);
  }

  const emojiEnabled = await getConfigValue(config, 'emoji');

  const commitType = await customCliSelect(
    emojiEnabled ? commitTypesWithEmoji : commitTypes
  );
  const commitSubject = await getCommitSubject();
  const translatedCommitMessage = await translateCommitMessage(commitSubject);

  console.log(translatedCommitMessage);
  const message = `${commitType}: ${translatedCommitMessage}`;

  try {
    const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?');

    //merhab dunya

    if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
      outro(`${chalk.red('✖')} commit mesajı iptal edildi.`);
      process.exit(1);
    }

    const statusOutput = await getStatus();

    if (statusOutput.trim() === '') {
      outro(`${chalk.red('✖')} commit için herhangi bir değişiklik yok.`);
      process.exit(1);
    }

    await addFilesToStaged(changedFiles);

    const commitOutput = await gitCommit(message);
    outro(`${chalk.green('✔')} commit başarılı.`);
    outro(commitOutput);

    return true;
  } catch (err) {
    outro(`${chalk.red('✖')} ${err.message}`);
    process.exit(1);
  }
};
