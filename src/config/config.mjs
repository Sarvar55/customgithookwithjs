import { command } from 'cleye';
export const installCommand = command(
  {
    // Command name
    name: 'i',
    parameters: ['<package name>']
  },
  async (argv) => {
    // $ npm install lodash
    console.log('jknsfkjsnfnsdfjksnkdfjn');
    argv._.packageName; // => "lodash" (string)
  }
);
