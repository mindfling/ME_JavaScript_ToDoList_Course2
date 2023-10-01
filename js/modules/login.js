//!! эта не уже не нужна
// * login authorisation logic

import {trans} from './utils.js';

export const getLoginAuthStorageKey = () => {
  const userNameCyr = prompt('Введите имя пользователя приложением', 'Эмпти');
  const userNameLat = trans(userNameCyr.trim()).toUpperCase();
  // получаем ключ для хранилища по имени пользователя
  const storageKey = 'todo_app_' + userNameLat;
  // возвращаем данные пользователя
  return {
    storageKey,
    userName: userNameCyr,
  };
};
