import { outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { isConfirm } from '../util/confirim.mjs';
import {
  addFilesToStaged,
  getChangedFiles,
  getStatus,
  gitCommit
} from '../util/git.js';

export const commit = async (message) => {
  try {
    const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?');

    if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
      outro(`${chalk.red('✖')} commit mesajı iptal edildi.`);
      process.exit(1);
    }

    const statusOutput = await getStatus();
    const changedFiles = await getChangedFiles();

    if (statusOutput.trim() === '' || changedFiles.length === 0) {
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
