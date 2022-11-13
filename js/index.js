// * main index script *

import {
  createForm,
  createTable,
  createTitle,
  modifyAppContainer,
} from './modules/createElements.js';
import appElements from './modules/elements.js';
import { renderTasks } from './modules/render.js';
import {getTaskData} from './modules/serviceStorage.js';

const {getApp} = appElements;
console.log('appElements: ', appElements);
console.log('getApp: ', getApp);
// import {trans} from './modules/utils.js';
// import {userLogin} from './modules/login.js';


const init = (appSelector, appTitle) => {
  console.log('Загрузка...');

  // * запрос имени in userLogin login.js
  // eslint-disable-next-line max-len
  // const userNameCyr = prompt('Введите имя пользователя приложением', 'Эмпты');
  // const latUserName = trans(userNameCyr.trim());
  // const STORAGE_KEY = 'todo_app_' + latUserName;
  // const userName = 'name';
  const STORAGE_KEY = 'todo';
  // console.log('userNameCyr: ', userNameCyr);
  // console.log('latUserName: ', latUserName);
  console.log('STORAGE_KEY: ', STORAGE_KEY);

  // пробуем хранилище
  const data = getTaskData(STORAGE_KEY);
  console.log('data: ', data);


  // * получаем контейнер
  const app = getApp(appSelector);
  // модифицируем контейнер
  modifyAppContainer(app);
  // добавляем заголовок
  const h1 = createTitle(appTitle);
  // добавляем форму вверху
  const form = createForm();
  // обертка таблицы и основа самой таблицы
  const {table, tableWrapper, head, list} = createTable();
  console.log('list: ', list);

  renderTasks(list, data); // весь перерендер списка здесь

  // добавляем все в дом
  app.append(h1, form, tableWrapper);
  console.log('tableWrapper: ', tableWrapper);
};

window.initTodo = init;
