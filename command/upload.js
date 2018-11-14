const execSync = require('child_process').execSync;
const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = () => {
    execSync(`git tag | grep '\w' | xargs git tag -d`);
    let appConf = JSON.parse(fs.readFileSync('../package.json'));
    let appVer = appConf.version;
    let appName = appConf.name;
    rl.question(chalk.green('自动小版本+1 (y/n)? '), answer => {
        console.log(answer);
    });
    rl.close();
};
