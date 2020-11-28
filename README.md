# excel-translate

批量翻译 Excel 文档

## 使用场景

用于将一个 Excel 文档第一列（A列）的所有英文内容翻译成中文，并在第二列（B列）显示。

## 安装

```
npm i
```

## 翻译

```
npm run translate
```

## 自定义 Excel 文件路径

-p, --path

```
npm run translate -- -p ./test-data.xlsx
```

## 自定义翻译语言

默认是英译中

-f, --from 源语言

-t, --to 目标语言

例如英语翻译成西班牙语

```
npm run translate -- -f en -t es
```
