#!/usr/bin/env node

/**
 * @file bin/index.js
 * @author llisonly
 */

const program = require('commander');

// 定义当前版本
program
    .version('1.0.0');

// 定义使用方法
program
    .usage('<command>');

/***** 常用命令 *****/
program
    .command('item_init')
    .description('create item config file')
    .alias('i')
    .action(() => {
        console.log('item_init');
    });

program
    .command('item_add')
    .description('item add')
    .alias('a')
    .action(require('../command/add'));

program
    .command('upload')
    .description('upload')
    .alias('u')
    .action(require('../command/upload'));

program.parse(process.argv);
