// * main index script *

import {
  createModal,
  modifyAppContainer,
} from './modules/createElements.js';

import {getTaskData, setTaskData} from './modules/serviceStorage.js';

import appElements from './modules/elements.js';


import {clearList, renderApp, renderTasks} from './modules/render.js';

import {formControl, modalControl, tableControl} from './modules/control.js';
import {trans} from './modules/utils.js';


const {getApp} = appElements;

const init = (appSelector, appTitle) => {
  console.log('Загрузка...');
  const app = getApp(appSelector);
  // модифицируем контейнер
  modifyAppContainer(app);

  const modal = createModal();
  app.append(modal);

  // * openModal() *
  modal.classList.add('show');
  modal.style.display = 'block';

  console.log('modal: ', modal);
  const modalForm = document.forms.modalAuthForm;
  const inputUserName = modalForm.inputUserName;
  const modalSubmit = modalForm[1];
  console.log('modalForm: ', modalForm);
  console.log('inputUserName: ', inputUserName);
  console.log('modalSubmit: ', modalSubmit);

  // modalControl(modalForm);
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // const target = event.target;
    // console.log(modalForm.inputUserName.value);
    const userNameCyr = modalForm.inputUserName.value.trim();
    const userNameLat = trans(userNameCyr);
    const storageKey = 'todo_app_' + userNameLat.toUpperCase();
    const userData = {
      userName: userNameCyr,
      storageKey,
    };

    // * closeModal() *
    modal.classList.remove('show');
    modal.style.display = 'none';

    setTaskData('todo_app', JSON.stringify(userData));

    // * запрос имени in userLogin login.js
    // todo
    const STORAGE_KEY = storageKey;
    const data = getTaskData(STORAGE_KEY);

    // рендерим каркас приложения
    const {
      form,
      list,
    } = renderApp({app, appTitle, userData});
    // удаляем лишнее
    clearList(list);
    // рендерим списк дел
    renderTasks({list, data});
    // вешаем слушатели на форму
    formControl({form, list, storageKey: STORAGE_KEY});
    // вешаем слушатели на список дел
    tableControl({list, data, storageKey: STORAGE_KEY});
  });
};

window.initTodo = init;
