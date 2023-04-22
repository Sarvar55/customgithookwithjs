import { intro } from '@clack/prompts';
import { commit } from '../commands/commitCli.mjs';
import { push } from '../commands/pushCli.mjs';

export const cli = async() => {
    intro('Commit Message');

    const isCommited = await commit();

    if (isCommited) {
        await push();
    }
};