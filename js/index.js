// * main index script *

import {
  createModal,
  modifyAppContainer,
} from './modules/createElements.js';

import {getTaskData, setTaskData} from './modules/serviceStorage.js';
import appElements from './modules/elements.js';
import {clearList, renderApp, renderTasks} from './modules/render.js';
import {formControl, modalControl, tableControl} from './modules/control.js';

const {getApp} = appElements;


const init = (appSelector, appTitle) => {
  console.log('Загрузка...');
  const app = getApp(appSelector);
  modifyAppContainer(app);

  const modal = createModal();
  app.append(modal);

  const modalForm = document.forms.modalAuthForm;

  const callAfterModal = (userData) => {
    console.log('modal control callback', userData);
    // сохраняем данные пользователя
    setTaskData('todo_app', JSON.stringify(userData));

    const STORAGE_KEY = userData.storageKey;
    const data = getTaskData(STORAGE_KEY);
    // console.log('data: ', data);
    // рендерим каркас приложения
    const {form, list} = renderApp({app, appTitle, userData});
    clearList(list);
    renderTasks({list, data});
    formControl({form, list, storageKey: STORAGE_KEY});
    tableControl({list, data, storageKey: STORAGE_KEY});
  };

  modalControl({modal, modalForm}, callAfterModal);
};


window.initTodo = init;
