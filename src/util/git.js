import { outro, text } from '@clack/prompts';
import chalk from 'chalk';
import { execa } from 'execa';

export const getStatus = async () => {
  const { stdout: statusOutput } = await execa('git', [
    'status',
    '--porcelain'
  ]);
  return statusOutput;
};

export const addFilesToStaged = async (files) => {
  await execa('git', ['add', ...files]);
};

export const getChangedFiles = async () => {
  const { stdout } = await execa('git', ['status', '-s']);
  return stdout;
};

export const getGitRemoteUrl = async () => {
  const { stdout } = await execa('git', ['remote', 'get-url', 'origin']);
  return stdout;
};
export const gitCommit = async (message) => {
  const { stdout } = await execa('git', ['commit', '-m', message]);
  return stdout;
};

export const gitPush = async (origin) => {
  const { stdout } = await execa('git', ['push', '--verbose', origin]);
  return stdout;
};

export const getCommitSubject = async () => {
  return await text({
    message: 'Enter commit subject:',
    validate(value) {
      if (value.length === 0) {
        outro(`${chalk.red('✖')} ${'commit is required'}`);
        process.exit(1);
      }
    }
  });
};
