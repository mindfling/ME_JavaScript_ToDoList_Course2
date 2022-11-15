// * события

import {clearList, renderTasks} from './render.js';
import {
  addTaskData,
  finishTaskData,
  getDataOfTask,
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
    const newTask = {};
    Object.assign(newTask, fields); // description, priority
    newTask.id = getRandomId(); // id
    newTask.status = 'wait'; // status
    addTaskData(storageKey, newTask);
    clearList(list);
    renderTasks(list, getTaskData(storageKey));
    form.reset();
  });
  return;
};

// * события таблицы действия с делами
export const tableControl = ({data, list, storageKey}) => {
  // навешиваем слушатель
  list.addEventListener('click', event => {
    const target = event.target;

    // * удаление задания
    if (target.classList.contains('btn_remove')) {
      // todo подтверждение на удаление задачи
      const taskId = target.dataset?.id;
      // переспрашиваем у пользователя
      if (confirm(`Удалить задание? ID ${taskId}`)) {
        console.log('Удаляем задание', taskId);
        removeTaskData(storageKey, taskId);
        clearList(list);
        renderTasks(list, getTaskData(storageKey));
        return;
      } else {
        console.log('Задание не удаляем');
      }
    }

    // * завершение задания --перечеркнуть--
    if (target.classList.contains('btn_done')) {
      // todo проверять завершина ли уже задача
      const taskId = target.dataset?.id;
      console.log(getDataOfTask(storageKey, taskId)); // ??
      console.log('Завершаем задание', taskId);
      finishTaskData(storageKey, taskId);
      // изменяем поле и перерендериваем
      // todo можно отдельную строку
      clearList(list);
      renderTasks(list, getTaskData(storageKey));
      return;
    }
  });

  return list;
};

export const modalControl = (modal) => {
  console.log('init modal form prompt');
  return;
};
