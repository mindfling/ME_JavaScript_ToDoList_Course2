// * main index script *

import app from './modules/elements.js';
import {trans} from './modules/utils.js';

console.log('app: ', app);


const init = () => {
  // запрос имени
  const userNameCyr = prompt('Введите имя пользователя приложением', 'Емпти');
  const latUserName = trans(userNameCyr.trim());
  const STORAGE_KEY = 'todo_app_' + latUserName;
  
  // console.log('userNameCyr: ', userNameCyr);
  // console.log('latUserName: ', latUserName);
  console.log('STORAGE_KEY: ', STORAGE_KEY);


};

window.initTodo = init;

