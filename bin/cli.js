const program = require('commander');

program
    .version('1.0.0');

program
    .usage('<command>');

program
    .command('upload')
    .description('upload')
    .alias('u')
    .action(require('../command/upload'));

program.parse(process.argv);
