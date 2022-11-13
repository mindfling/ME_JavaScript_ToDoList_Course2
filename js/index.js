'use strict';
/**
 *  transtit for storage Key
 */

const allchars = {
  'Ё': 'YO',
  'Й': 'I',
  'Ц': 'TS',
  'У': 'U',
  'К': 'K',
  'Е': 'E',
  'Н': 'N',
  'Г': 'G',
  'Ш': 'SH',
  'Щ': 'SCH',
  'З': 'Z',
  'Х': 'H',
  'Ъ': '\'',

  'ё': 'yo',
  'й': 'i',
  'ц': 'ts',
  'у': 'u',
  'к': 'k',
  'е': 'e',
  'н': 'n',
  'г': 'g',
  'ш': 'sh',
  'щ': 'sch',
  'з': 'z',
  'х': 'h',
  'ъ': '\'',

  'Ф': 'F',
  'Ы': 'I',
  'В': 'V',
  'А': 'А',
  'П': 'P',
  'Р': 'R',
  'О': 'O',
  'Л': 'L',
  'Д': 'D',
  'Ж': 'ZH',
  'Э': 'E',

  'ф': 'f',
  'ы': 'i',
  'в': 'v',
  'а': 'a',
  'п': 'p',
  'р': 'r',
  'о': 'o',
  'л': 'l',
  'д': 'd',
  'ж': 'zh',
  'э': 'e',

  'Я': 'Ya',
  'Ч': 'CH',
  'С': 'S',
  'М': 'M',
  'И': 'I',
  'Т': 'T',
  'Ь': '\'',
  'Б': 'B',
  'Ю': 'YU',

  'я': 'ya',
  'ч': 'ch',
  'с': 's',
  'м': 'm',
  'и': 'i',
  'т': 't',
  'ь': '\'',
  'б': 'b',
  'ю': 'yu',
};

// eslint-disable-next-line max-len
const transliterate = (word) => word.split('').map((char) => chars[char] || char).join('');

const trans = (word) => {
  // simplified for aur needs
  const chars = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'e',
    'э': 'e',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'ы': 'i',
    'й': 'j',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'c',
    'ч': '4',
    'ш': 'sh',
    'щ': 'w',
    'ъ': '',
    'ь': '',
    'ю': 'u',
    'я': 'a',
    ',': '',
    '-': '_',
    '+': '',
    '*': '',
    ' ': '_',
    '\'': '',
    '"': '',
    '\\': '',
    '`': '',
    '/': '',
    '': '',
  };
  word = word.toLowerCase();
  // eslint-disable-next-line arrow-body-style
  const result = word.split('').map(ch => {
    return chars[ch] || (chars[ch] === '' ? chars[ch] : ch);
  }).join('');
  return result.toUpperCase();
};


const init = () => {
  // запрос имени
  const userNameCyr = prompt('Введите имя пользователя приложением', 'Емпти');
  console.log('userNameCyr: ', userNameCyr);
  const latUserName = trans(userNameCyr);
  console.log('latUserName: ', latUserName);
  const STORAGE_KEY = 'todo_app_' + latUserName;
  console.log('STORAGE_KEY: ', STORAGE_KEY);
};

window.initTodo = init;

