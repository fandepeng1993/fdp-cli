#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const inquirer = require('inquirer');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
// https://github.com:bear-new/latest-webpack-cli#master
const templateURL = 'https://github.com:fandepeng1993/fdp-react-ts-template#master';
const antdProURL = 'https://github.com:fridfan/fdp-react-antdpro-ts-template#master';
const jsxTmpURL = 'https://github.com:fandepeng1993/fdp-react-jsx-standard-template#master';

program.version('1.0.0', '-v, --version')
  .command('init <name>')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer.prompt([
        {
          name: 'description',
          message: '请输入项目描述'
        },
        {
          name: 'author',
          message: '请输入作者名称'
        },
        {
          type: 'list',
          message: '请选择一项模版:',
          name: 'project',
          choices: [
            {name: 'react-ts-template(ant3.x版本)', value: templateURL},
            {name: 'react-antdpro-ts-template(antdpro版本)', value: antdProURL},
            {name: 'fdp-react-jsx-standard-template', value: jsxTmpURL}
          ]
        }
      ]).then((answers) => {
        const spinner = ora('正在下载模板...');
        spinner.start();
        download(answers.project, name, {clone: true}, (err) => {
          if (err) {
            spinner.fail();
            console.log(symbols.error, chalk.red(err));
          } else {
            spinner.succeed();
            const fileName = `${name}/package.json`;
            const meta = {
              name,
              description: answers.description,
              author: answers.author
            };
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
            }
            console.log(symbols.success, chalk.green('项目初始化完成'));
            console.log(symbols.info, chalk.green(`启动项目命令：cd ${name},npm install,npm run start`));
          }
        });
      });
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(symbols.error, chalk.red('项目已存在同名'));
    }
  });
program.parse(process.argv);