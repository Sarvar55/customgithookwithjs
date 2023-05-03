// import { cli, command } from 'cleye';
// import { installCommand } from './src/config/config.mjs';
// import { existsSync, writeFileSync, readFileSync } from 'fs';
import { cli } from './src/cli/index.mjs';
// const argv = cli({
//   name: 'helpcommit',
//   parameters: ['<setEmoji>']
// });

// const stringToBoolean = (stringValue) => {
//   switch (stringValue && stringValue.toLowerCase().trim()) {
//     case 'true':
//     case 'yes':
//     case '1':
//       return true;

//     case 'false':
//     case 'no':
//     case '0':
//     case null:
//     case undefined:
//       return false;

//     default:
//       return JSON.parse(stringValue);
//   }
// };

// const settingEmoji = argv._.setEmoji;

// if (settingEmoji) {
//   const string = new String(settingEmoji);
//   const parts = string.split('=');
//   if (parts[1] && typeof stringToBoolean(parts[1]) === 'boolean')
//     writeFileSync('index.txt', settingEmoji, 'utf-8');
// }

// console.log(settingEmoji);

cli();
