#!/usr/bin/env node

// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + "/../node_modules/";
const program = require("commander");

const { resolve } = require("path");
const res = command => resolve(__dirname, "../command/", command);

// init 命令
program
  .version(require("../package").version)
  // 定义使用方法 命令 + 参数
  .usage("<command> [项目名称]")
  // 定义一个命令 及其参数
  .command("init", "创建新项目")
  // 配置别名
  .alias("i")
  // 解析参数。
  .parse(process.argv);

//  命令 macaw init > 相当于运行命令 macaw-init 

// 没有参数则提示帮助信息
if (!program.args.length) {
  program.help();
}
