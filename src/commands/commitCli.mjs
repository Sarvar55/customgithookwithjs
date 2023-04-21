import { outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { isConfirm } from '../util/confirim.mjs';
import {
  addFilesToStaged,
  getChangedFiles,
  getStatus,
  gitCommit
} from '../util/git.js';

export async function commit(message) {
  try {
    const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?');
    const statusOutput = await getStatus();

    if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
      outro(`${chalk.red('✖')} commit mesajı iptal edildi.`);
      return false;
    }

    if (statusOutput.trim() === '') {
      outro(`${chalk.red('✖')} commit için herhangi bir değişiklik yok.`);
      return false;
    }

    const changedFiles = await getChangedFiles();
    if (changedFiles.length === 0) {
      outro(`${chalk.red('✖')} commit için herhangi bir değişiklik yok.`);
      return false;
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
}
