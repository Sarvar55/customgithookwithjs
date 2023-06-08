import { intro } from '@clack/prompts';
import { commit } from '../commands/commitCli.mjs';
import { push } from '../commands/pushCli.mjs';
import { getLocalBranches } from '../util/git.js';

export const cli = async () => {
  intro('Commit Message');

  const isCommited = await commit();

  if (isCommited) {
    getLocalBranches()
      .then((branches) => {
        console.log('Local Branches:', branches);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    await push();
  }
};
