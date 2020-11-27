const fs = require('fs');
const xlsx = require('node-xlsx');
const translate = require('google-translate-api');

const path = `${__dirname}/test.xlsx`;
const sheetList = xlsx.parse(path);
const tasks = getCellList(sheetList).map((cellText) => translateText(cellText));

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
  const buffer = xlsx.build(sheetList);
  // 将缓存的数据写入到相应的 Excel 文件下
  fs.writeFile(path.replace(/\./, '-翻译版.'), buffer, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
});

function getCellList(sheetList) {
  const cellList = [];
  sheetList.forEach((sheet) => {
    sheet.data.slice(1).forEach((row) => {
      row.forEach((cell, cellIndex) => {
        if (cellIndex === 0) { // 第一列
          cellList.push(cell);
        }
      });
    });
  });
  return cellList;
}

function translateText(text) {
  return new Promise((resolve) => {
    translate(text, { from: 'en', to: 'zh-cn' }).then(res => {
      resolve(res.text);
    });
  });
}
