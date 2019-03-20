#!/usr/bin/env node
// 这个开头的文件是。。？

const program = require("commander");
const path = require("path");
const fs = require("fs");
const download = require("../lib/download");
const glob = require("glob");
// 处理命令行交互的模块。
const inquirer = require("inquirer");

program.usage("<project-name>").parse(process.argv);

// 获取输入的项目名称,parse 后的参数可以 返回+挂载在this下啦？
let projectName = program.args[0];

if (!projectName) {
  return;
}

// cwd current work d?
let rootName = path.basename(process.cwd());
rootName = projectName;

function go(projectRoot) {
  // 下载完毕后转移模板文件到项目目录。

  if (projectRoot !== ".") {
    //   创建文件夹
    fs.mkdirSync(projectRoot);
  }
  
  return download(projectRoot)
    .then(target => {
      return {
        projectRoot,
        downloadTemp: target
      };
    })
    .catch(err => console.log(err));
  //处理子命令
  console.log(path.resolve(process.cwd(), path.join(".", rootName)));
}

async function validate() {
  // 验证当前目录是否存在文件，存在则检测当前文件名称
  const answers = await inquirer
    .prompt([
      {
        name: "withTS",
        message: "使用 ts 吗？",
        type: "confirm",
        default: true
      },
      {
        name: "buildInCurrent",
        message: "是否直接在当前目录下创建新项目",
        type: "confirm",
        default: true
      }
    ]);

  return answers.buildInCurrent ? "." : projectName;
}

validate().then(go);
