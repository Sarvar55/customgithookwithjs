import { outro } from '@clack/prompts';
import chalk from 'chalk';
import { Configuration, OpenAIApi } from 'openai';

const translateCommitMessage = async (commit) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
  );
  try {
    const message = `${`commit message: (${commit})`}  ${process.env.PROMPT}`;
    console.log(message);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 500,
      temperature: 0
    });
    console.log(response.data.choices);
    return response.data.choices[0].text.split(':')[1];
  } catch (error) {
    outro(`${chalk.red('✖')} ${error}`);
    process.exit(1);
  }
};

export { translateCommitMessage };
