import { intro, select } from '@clack/prompts';
import { commentTypesWithEmoji, commentTypes } from '../util/CommentType.mjs';
import { isConfirm } from '../util/confirim.mjs';
import { getCommitSubject } from '../util/git.js';
import { commit } from './commitCli.mjs';
import { push } from './pushCli.mjs';

export const cli = async () => {
  intro('Commit Message');

  const emojiEnabled = await isConfirm(
    'Do you want to add emoji to commit message?'
  );

  const commitType = await select({
    message: 'Select commit type:',
    options: emojiEnabled ? commentTypesWithEmoji : commentTypes
  });

  const commitSubject = await getCommitSubject();

  const commitMessage = `${commitType}: ${commitSubject}`;

  const isCommited = await commit(commitMessage);

  if (isCommited) {
    await push();
  }
};
