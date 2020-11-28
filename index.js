const program = require('commander');
const { translateExcel } = require('./src');
const { DEFAULT_FROM_LANG, DEFAULT_TO_LANG } = require('./src/const');

// 从命令行参数中取 Excel 文件路径
program
  .option('-p, --path <type>', 'Excel file path', `${__dirname}/test.xlsx`)
  .option('-f, --from <type>', 'Original language', DEFAULT_FROM_LANG)
  .option('-t, --to <type>', 'Target language', DEFAULT_TO_LANG);
program.parse(process.argv);

const { path, from, to } = program;
console.log('path, from, to', path, from, to);
translateExcel(path, { from, to });
