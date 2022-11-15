// * main index script *

import {
  createForm,
  createTable,
  createTitle,
  modifyAppContainer,
} from './modules/createElements.js';
import {getTaskData} from './modules/serviceStorage.js';
import appElements from './modules/elements.js';
import {getLoginAuthStorageKey} from './modules/login.js';
import {renderApp, renderTasks} from './modules/render.js';
import {formControl, tableControl} from './modules/control.js';

const {getApp} = appElements;

const init = (appSelector, appTitle) => {
  console.log('Загрузка...');

  // далее работаем с приложение
  // * получаем контейнер
  const app = getApp(appSelector);
  // модифицируем контейнер
  modifyAppContainer(app);


  // * запрос имени in userLogin login.js
  // const STORAGE_KEY = 'todo';
  const userData = getLoginAuthStorageKey();
  const STORAGE_KEY = userData.storageKey;
  const {userName} = userData;
  const data = getTaskData(STORAGE_KEY);


  // добавляем заголовок in render.js
  // renderApp()
  const h1 = createTitle(appTitle + ' ' + userName);
  console.log('appTitle: ', appTitle);
  // добавляем форму вверху
  const form = createForm();
  // обертка таблицы и основа самой таблицы
  const {table, tableWrapper, head, list} = createTable();

  // просто рендерим список дел в List tableBody
  renderTasks(list, data); // весь перерендер списка здесь
  // добавляем все в дом
  app.append(h1, form, tableWrapper);

  // после полного формирования списка его можно очищать и удалять
  // clearList(list);
  // вешаем слушатели на форму
  formControl({form, list, storageKey: STORAGE_KEY});
  // вешаем слушатели на список дел
  tableControl({list, data, storageKey: STORAGE_KEY});
};

window.initTodo = init;
