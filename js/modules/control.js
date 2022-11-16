// * события controls

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
    const submit = form[2];
    const reset = form[3];
    submit.disabled = true;
    reset.disabled = true;
    return;
  });
  // обработка событий ввода в поле
  form.description.addEventListener('input', (event) => {
    const target = event.target;
    const value = target.value;
    const submit = form[2];
    const reset = form[3];
    if (value) {
      submit.disabled = false;
      reset.disabled = false;
    } else {
      submit.disabled = true;
      reset.disabled = true;
    }
    return;
  });
  return;
};

// * события таблицы действия с делами
export const tableControl = ({data, list, storageKey}) => {
  // навешиваем слушатель
  list.addEventListener('click', event => {
    const target = event.target;

    // * удаление задания remove
    if (target.classList.contains('btn_remove')) {
      // подтверждение на удаление задачи
      const taskId = target.dataset?.id;
      const task = getDataOfTask(storageKey, taskId);
      // переспрашиваем у пользователя
      if (confirm(`Удалить задание "${task.description}" ?`)) {
        console.log('Удаляем задание', taskId);
        removeTaskData(storageKey, taskId);
        // todo можно для простоты удалить отдельную строку ?
        clearList(list);
        renderTasks(list, getTaskData(storageKey));
        return;
      } else {
        console.log('Задание не удалено!');
      }
    }

    // * завершение задания finish --перечеркнуть--
    if (target.classList.contains('btn_done')) {
      // проверять завершина ли уже задача
      const taskId = target.dataset?.id;
      const task = getDataOfTask(storageKey, taskId);
      console.log('Завершаем задание', taskId);

      if (task.status === 'done') {
        console.log('Задание уже завершено ))');
        // ничего не делаем
        return;
      } else {
        console.log('Задание еще выполняется');
        // изменяем поле и перерендериваем
        finishTaskData(storageKey, taskId);
        // todo можно для прототы изменить только отдельную строку
        clearList(list);
        renderTasks(list, getTaskData(storageKey));
        return;
      }
    }
  });

  return list;
};

export const modalControl = (modal) => {
  console.log('init modal form prompt');
  return;
};
