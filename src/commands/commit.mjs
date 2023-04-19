import { getCommitMessage } from './index.mjs';
import { execa } from 'execa';
import { confirm, outro, isCancel } from '@clack/prompts';
import chalk from 'chalk';
export const commit = () => {
  getCommitMessage()
    .then(async (message) => {
      outro(`Commit message: ${message}`);

      const isConfermedCommit = await confirm({
        message: 'Confirm the commit message?'
      });

      if (isConfermedCommit && !isCancel(isConfermedCommit)) {
        const { stdout: statusOutput } = await execa('git', [
          'status',
          '--porcelain'
        ]);

        if (statusOutput.trim() !== '') {
          await execa('git', ['add', '.']);
          const { stdout: commitOutput } = await execa('git', [
            'commit',
            '-m',
            message
          ]);
          outro(`${chalk.green('✔')} successfully committed`);
          outro(commitOutput);
        } else {
          outro(`${chalk.red('✖')} No changes to commit.`);
        }
      } else {
        outro(`${chalk.red('✖')} commit message canceled`);
      }
    })
    .catch((err) => {
      outro(`${chalk.red('✖')} ${err.message}`);
      process.exit(1);
    });
};
