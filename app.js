import { cli } from './src/cli/index.mjs';

// import Configstore from 'configstore';
// import yargs from 'yargs';
cli();
// const config = new Configstore();
// console.log('sdjkfkjsnksnkgn');
// console.log(config.get('emoji'));

// import { hideBin } from 'yargs/helpers';

// yargs(hideBin(process.argv))
//   .command(
//     'set-emoji [flag]',
//     'set emoji',
//     (yargs) => {
//       return yargs.positional('flag', {
//         default: false
//       });
//     },
//     (argv) => {
//       if (argv.verbose) console.info(`start server on :${argv.port}`);
//       const config = new Configstore();
//       config.set('emoji', argv.flag);
//     }
//   )
//   .option('verbose', {
//     alias: 'v',
//     type: 'boolean',
//     description: 'Run with verbose logging'
//   })
//   .parse();
