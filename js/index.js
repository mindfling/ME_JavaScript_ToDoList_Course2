// * main index script *

import {createForm, createTable, createTitle, modifyAppContainer} from './modules/createElements.js';
import appElements from './modules/elements.js';
const {getApp} = appElements;
console.log('appElements: ', appElements);
console.log('getApp: ', getApp);
// import {trans} from './modules/utils.js';


const init = (appSelector, appTitle) => {
  console.log('appSelector: ', appSelector);
  console.log('appTitle: ', appTitle);

  console.log('Загрузка...');

  // * запрос имени
  // eslint-disable-next-line max-len
  // const userNameCyr = prompt('Введите имя пользователя приложением', 'Эмпты');
  // const latUserName = trans(userNameCyr.trim());
  // const STORAGE_KEY = 'todo_app_' + latUserName;
  // const userName = 'name';
  const STORAGE_KEY = 'todo_app';
  // console.log('userNameCyr: ', userNameCyr);
  // console.log('latUserName: ', latUserName);
  console.log('STORAGE_KEY: ', STORAGE_KEY);

  // * получаем контейнер
  const container = getApp(appSelector);
  console.log('container: ', container);

  // модифицируем контейнер
  const app = modifyAppContainer(container);
  // добавляем заголовок
  const h1 = createTitle(appTitle);
  // добавляем форму вверху
  const form = createForm();
  // обертка таблицы и основа самой таблицы
  const {table, tableWrapper, head, list} = createTable();

  app.append(h1, form, tableWrapper);
};

window.initTodo = init;
