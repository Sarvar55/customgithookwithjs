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
import { push } from './pushCli.mjs';

export const cli = async () => {
  intro('Commit Message');

  const emojiEnabled = await isConfirm(wantCommitMessage);

  const commitType = await select({
    message: 'Select commit type:',
    options: emojiEnabled ? commentTypesWithEmoji : commentTypes
  });

  const commitSubject = await getCommitSubject();

  const commitMessage = `${commitType}: ${commitSubject}`;

  const isCommited = await commit(commitMessage);

  if (isCommited) {
    push();
  }
};
