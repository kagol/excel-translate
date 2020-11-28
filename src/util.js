const translate = require('google-translate-api');

/**
 * 获取Excel文件第一列的所有英文内容
 * @param {*} sheetList JSON 格式的 Excel 文档
 * 输入
 * node-xlsx 库解析之后的 JSON 格式的 Excel 文档
 * 
 * 输出
 * 由每一个英文内容组成的数组
 */
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

/**
 * 翻译一段文本
 * @param {*} text 原始文本
 * @param {*} langConfig 语言转换参数，默认英译中
 */
function translateText(text, langConfig) {
  return new Promise((resolve) => {
    translate(text, langConfig).then(res => {
      resolve(res.text);
    });
  });
}

module.exports = {
  getCellList,
  translateText
};
