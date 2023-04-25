import { outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { isConfirm } from '../util/confirim.mjs';
import {
  addFilesToStaged,
  getChangedFiles,
  getCommitSubject,
  getStatus,
  gitCommit
} from '../util/git.js';
import { commitTypesWithEmoji, commitTypes } from '../util/CommitType.mjs';
import cliSelect from 'cli-select';

export const commit = async () => {
  const changedFiles = await getChangedFiles();

  console.log(changedFiles);
  if (changedFiles.length === 0) {
    outro(`${chalk.red('✖')} commit mesajı iptal edildi.`);
    process.exit(1);
  }

  const emojiEnabled = await isConfirm(
    'Do you want to add emoji to commit message?'
  );

  const { value: commitType } = await cliSelect({
    values: emojiEnabled ? commitTypesWithEmoji : commitTypes,
    valueRenderer: (value, selected) => {
      if (selected) {
        return chalk.underline(value);
      }
      return value;
    }
  });

  const commitSubject = await getCommitSubject();

  const message = `${commitType}: ${commitSubject}`;

  try {
    const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?');

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
