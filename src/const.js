const LANGS = require('google-translate-api/languages');
const DEFAULT_FROM_LANG = 'en';
const DEFAULT_TO_LANG = 'zh-cn';
console.log('Supported languages:', LANGS);

module.exports = {
  LANGS,
  DEFAULT_FROM_LANG,
  DEFAULT_TO_LANG
};