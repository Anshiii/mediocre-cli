const download = require("download-git-repo");
const path = require("path");
const ora = require('ora')

module.exports = function(target) {
  // 用于存放下载内容的临时路径
//   target = path.join(target || ".", ".download-temp");

  return new Promise((resolve, reject) => {
      const spinner = ora("正在下载模板，请稍等...").start();
        spinner.color = "yellow";
      download(
      "direct:https://github.com/Anshiii/mediocre-template.git",
      target,
      { clone: true },
      err => {
        if (err) {
          console.log("出错啦!!",err);
          spinner.fail();
          reject(err);
        } else {
          resolve(target);
          spinner.succeed("下载成功");
        }
      }
    );
  });
};
