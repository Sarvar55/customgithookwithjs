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
  const { stdout } = await execa('git', ['add', ...files]);
  return stdout;
};

export const getLocalBranches = async () => {
  try {
    const gitDirectory = await gitDir();

    const { stdout: branchOutput } = await execa('git', ['branch'], {
      cwd: gitDirectory
    });

    const branches = branchOutput
      .split('\n')
      .map((branch) => branch.trim())
      .filter((branch) => !!branch);

    return branches;
  } catch (error) {
    console.error('Error retrieving local branches:', error);
    return [];
  }
};

export const getChangedFiles = async () => {
  const { stdout: modified } = await execa('git', [
    'ls-files',
    '--modified',
    '--others',
    '--exclude-standard'
  ]);
  if (!modified) return [];

  return [...modified.split('\n')].sort();
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
