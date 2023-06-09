import { isCancel, outro, spinner } from '@clack/prompts';
import { customCliSelect, isConfirm } from '../util/util.mjs';
import { getGitRemoteUrl, getLocalBranches, gitPush } from '../util/git.js';
import chalk from 'chalk';

export const push = async () => {
  const isPushConfirmed = await isConfirm('Do you want to run `git push`?');
  try {
    if (isPushConfirmed && !isCancel(isPushConfirmed)) {
      const pushProgress = spinner();

      pushProgress.start('push işlemi gerceklesiyor');

      const origin = await getGitRemoteUrl();
      const stdout = await gitPush(origin, selectedBranch);

      pushProgress.stop(
        `${chalk.green('✔')} successfully pushed all commits to ${origin}`
      );

      if (stdout) outro(stdout);
    } else {
      outro(`${chalk.red('✖')} push  canceled`);
    }
  } catch (error) {
    outro(`${chalk.red('✖')} push error: ${error.message}`);
    process.exit(1);
  }
};
