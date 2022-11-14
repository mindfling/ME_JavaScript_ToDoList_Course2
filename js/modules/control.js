// * события

import {clearList, renderTasks} from './render.js';
import {
  addTaskData,
  finishTaskData,
  getTaskData,
  removeTaskData,
} from './serviceStorage.js';
import {getRandomId} from './utils.js';


export const formControl = ({form, list, storageKey}) => {
  // const description = form.description; // todo onchonge empty field
  // отрабатываем событие формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form submited');

    const formdata = new FormData(form).entries();
    const fields = Object.fromEntries(formdata);

    const newTask = {
      // number: parseInt(Math.random().toString().substring(2, 6)), // toda
      id: getRandomId(), // string
      description: fields.description, // description
      priority: 'обычный приоритет', // toda select [light | warning | denger]
      status: 'wait', // fields.status, // toda [wait | done]
    };
    addTaskData(storageKey, newTask);
    clearList(list);
    renderTasks(list, getTaskData(storageKey));
    form.reset();
  });
  return;
};


export const tableControl = ({data, list, storageKey}) => {
  console.log('list: ', list);

  // todo
  // навешиваем событие на таблицу делегируем на кнопки
  list.addEventListener('click', event => {
    const target = event.target;
    console.log('target: ', target);

    if (target.classList.contains('btn_remove')) {
      console.log('Удаляем задание', target.id);
      removeTaskData(storageKey, target.id);
      clearList(list);
      renderTasks(list, getTaskData(storageKey));
      return;
    }

    if (target.classList.contains('btn_done')) {
      console.log('Завершаем задание', target.id);
      // todo
      finishTaskData(storageKey, target.id);
      // todo
      // изменяем поле и перерендериваем
      clearList(list);
      renderTasks(list, getTaskData(storageKey));
      return;
    }
  });

  return list;
};
