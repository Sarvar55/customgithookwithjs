import { isCancel, outro, spinner } from '@clack/prompts';
import { isConfirm } from '../util/confirim.mjs';
import { getGitRemoteUrl, gitPush } from '../util/git.js';
import chalk from 'chalk';

export const push = async () => {
  const isPushConfirmed = await isConfirm('Do you want to run `git push`?');
  if (isPushConfirmed && !isCancel(isPushConfirmed)) {
    const pushProgress = spinner();
    pushProgress.start('push işlemi gerceklesiyor');
    const origin = await getGitRemoteUrl();
    const stdout = await gitPush(origin);
    pushProgress.stop(
      `${chalk.green('✔')} successfully pushed all commits to ${origin}`
    );
    if (stdout) outro(stdout);
  } else {
    outro(`${chalk.red('✖')} push  canceled`);
  }
};
