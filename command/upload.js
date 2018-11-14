const execSync = require('child_process').execSync;
const chalk = require('chalk');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const projectPath = process.cwd();

module.exports = () => {
    execSync(`git tag | grep '\w' | xargs git tag -d`);
    let appConf = JSON.parse(fs.readFileSync(`${projectPath}/package.json`));
    let appVer = appConf.version;
    let appName = appConf.name;

    rl.question(chalk.green('自动小版本+1 (y/n)? '), answer => {
        if (answer === 'y') {
            appVer = appVer.replace(/\.(\d+)$/g, function (match, $1) {
                return '.' + (+$1 + 1);
            });
            appConf.version = appVer;
            fs.writeFileSync(`${projectPath}/package.json`, JSON.stringify(appConf, null, 2), 'utf-8');
        }
        rl.close();
    });

    rl.on('close', () => {
        execSync(`git status`, (error, stdout, stderr) => {
            console.log(stdout);
        });

        execSync(`git add .`, (error, stdout, stderr) => {
            console.log(stdout);
        });

        execSync(`git commit -m ${appName} #v ${appVer}`, (error, stdout, stderr) => {
            console.log(stdout);
        });

        execSync(`git tag ${appName} #v ${appVer}`, (error, stdout, stderr) => {
            console.log(stdout);
        });

        execSync(`git push origin master`, (error, stdout, stderr) => {
            console.log(stdout);
        });

        process.exit(0);
    });
};
