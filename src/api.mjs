import { outro } from '@clack/prompts';
import chalk from 'chalk';
import { Configuration, OpenAIApi } from 'openai';
import {
  config,
  deleteConfigValue,
  getConfigValue
} from './config/config-store.mjs';

const translateCommitMessage = async (message) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
  );

  //   const token = await getConfigValue(config, 'token');

  //   console.log(token);
  try {
    const message = `${'commit message: (${message})'}  ${process.env.PROMPT}`;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 500,
      temperature: 0
    });
    return response.data.choices[0].message;
  } catch (error) {
    outro(`${chalk.red('✖')} ${error}`);
    process.exit(1);
  }
};

export { translateCommitMessage };
