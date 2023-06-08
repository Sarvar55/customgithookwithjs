import { intro } from '@clack/prompts';
import { commit } from '../commands/commitCli.mjs';
import { push } from '../commands/pushCli.mjs';
import { getLocalBranches } from '../util/git.js';

export const cli = async () => {
  intro('Commit Message');

  const isCommited = await commit();

  if (isCommited) {
    (await getLocalBranches()).forEach((branch) => {
      console.log(branch);
    });
    await push();
  }
};
