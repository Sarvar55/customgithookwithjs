import { intro, confirm, select, text, outro } from '@clack/prompts';
import { commentTypesWithEmoji, commentTypes } from '../util/CommentType.mjs';
import chalk from 'chalk';

export const getCommitMessage = async () => {
  intro('Commit Message');

  const shouldContinue = await confirm({
    message: 'Do you want to continue?'
  });

  if (!shouldContinue) {
    outro(`${chalk.red('✖')} ${' The commit operation has been cancelled.'}`);
    process.exit(1);
  }

  const emojiEnabled = await confirm({
    message: 'Do you want to add emoji to commit message?'
  });

  const commitType = await select({
    message: 'Select commit type:',
    options: emojiEnabled ? commentTypesWithEmoji : commentTypes
  });

  const commitSubject = await text({
    message: 'Enter commit subject:',
    validate(value) {
      if (value.length === 0) {
        outro(`${chalk.red('✖')} ${'commit is required'}`);
        process.exit(1);
      }
    }
  });

  const commitMessage = `${commitType}: ${commitSubject}`;
  return commitMessage;
};
