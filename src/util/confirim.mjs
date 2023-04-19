import { confirm } from '@clack/prompts';

export const isConfirm = async (message) => {
  return await confirm({
    message: message
  });
};
