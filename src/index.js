const fs = require('fs');
const xlsx = require('node-xlsx');
const { getCellList, translateText } = require('./util');

/**
 * 将 Excel 文件中第一列的英文，翻译成中文，并显示在第二列对应的位置
 * @param {*} path Excel 文件的路径
 * 输入
 * Excel 文件的路径
 * 
 * 输出
 * 翻译之后的 Excel，在同一目录，文件名为：原文件名-翻译版.xlsx
 */
function translateExcel(path, langConfig) {
  const sheetList = xlsx.parse(path);
  const tasks = getCellList(sheetList).map((cellText) => translateText(cellText, langConfig));

  Promise.all(tasks)
  .then((values) => {
    console.log('values:', values);
    sheetList.forEach((sheet) => {
      sheet.data.slice(1).forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (cellIndex === 0) { // 第一列
            sheet.data[rowIndex+1][cellIndex+1] = values[rowIndex];
          }
        });
      });
    });
  })
  .then(() => {
    fs.writeFile(path.replace(/\./, '-翻译版.'), xlsx.build(sheetList), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}

module.exports = {
  translateExcel
};
