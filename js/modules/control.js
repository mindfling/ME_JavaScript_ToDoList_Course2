// * события

import {clearList, renderTasks} from './render.js';
import {
  addTaskData,
  finishTaskData,
  getTaskData,
  removeTaskData,
} from './serviceStorage.js';
import {getRandomId} from './utils.js';

// * события формы submit и верификация поля
export const formControl = ({form, list, storageKey}) => {
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

// * события таблицы действия с делами
export const tableControl = ({data, list, storageKey}) => {
  console.log('list: ', list);

  list.addEventListener('click', event => {
    const target = event.target;

    // * удаление задания
    if (target.classList.contains('btn_remove')) {
      console.log('Удаляем задание', target.id);
      removeTaskData(storageKey, target.id);
      clearList(list);
      renderTasks(list, getTaskData(storageKey));
      return;
    }

    // * завершение задания --перечеркнуть--
    if (target.classList.contains('btn_done')) {
      console.log('Завершаем задание', target.id, target);
      finishTaskData(storageKey, target.id);
      // изменяем поле и перерендериваем
      // todo можно отдельную строку
      clearList(list);
      renderTasks(list, getTaskData(storageKey));
      return;
    }
  });

  return list;
};
