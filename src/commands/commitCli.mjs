import { execa } from 'execa';
import { confirm, outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
import { isConfirm } from '../util/confirim.mjs';
import { confirmCommitMessage } from '../constant/constant.mjs';
import {
  addFilesToStaged,
  getChangedFiles,
  getStatus,
  gitCommit
} from '../util/git.js';

export const commit = async (message) => {
  outro(`Commit message: ${message}`);

  const isConfermedCommit = await isConfirm(confirmCommitMessage);
  const statusOutput = await getStatus();

  if (isConfermedCommit && !isCancel(isConfermedCommit)) {
    if (statusOutput.trim() !== '') {
      try {
        const changedFiles = await getChangedFiles();

        if (changedFiles.length > 0) await addFilesToStaged(changedFiles);
        else {
          outro(`${chalk.red('✖')} No changes to commit.`);
          process.exit(1);
        }

        const commitOutput = await gitCommit(message);
        outro(`${chalk.green('✔')} successfully committed`);
        outro(commitOutput);
        return true;
      } catch (err) {
        outro(`${chalk.red('✖')} ${err.message}`);
        process.exit(1);
      }
    } else {
      outro(`${chalk.red('✖')} No changes to commit.`);
      return false;
    }
  } else {
    outro(`${chalk.red('✖')} commit message canceled`);
    return false;
  }
};
