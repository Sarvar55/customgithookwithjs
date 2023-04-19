import {
  intro,
  select,
  outro,
  spinner,
  isCancel,
  confirm
} from '@clack/prompts';
import { commentTypesWithEmoji, commentTypes } from '../util/CommentType.mjs';
import chalk from 'chalk';
import { isConfirm } from '../util/confirim.mjs';
import { wantCommitMessage } from '../constant/constant.mjs';
import { getCommitSubject, getGitRemoteUrl, gitPush } from '../util/git.js';
import { commit } from './commit.mjs';

export const cli = async () => {
  intro('Commit Message');

  const emojiEnabled = isConfirm(wantCommitMessage);

  const commitType = await select({
    message: 'Select commit type:',
    options: emojiEnabled ? commentTypesWithEmoji : commentTypes
  });

  const commitSubject = await getCommitSubject();

  const commitMessage = `${commitType}: ${commitSubject}`;

  const isCommited = await commit(commitMessage);

  if (isCommited) {
    const isPushConfirmed = isConfirm('Do you want to run `git push`?');

    if (isPushConfirmed && !isCancel(isPushConfirmed)) {
      const pushProgress = spinner();
      pushProgress.start('push işlemi gerceklesiyor');
      const origin = await getGitRemoteUrl();
      const stdout = await gitPush(origin);

      pushProgress.stop(
        `${chalk.green('✔')} successfully pushed all commits to ${origin}`
      );
      if (stdout) outro(stdout);
    }
  }
};
