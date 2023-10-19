// * события controls

import {clearList, renderTasks} from './render.js';

import {
  addTaskData,
  finishTaskData,
  getDataOfTask,
  getTaskData,
  removeTaskData,
} from './serviceStorage.js';

import {getRandomId, trans, toCapitalizeString} from './utils.js';


// события формы submit и верификация поля
export const formControl = ({form, list, storageKey}) => {
  // отрабатываем событие формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form submited');
    const formdata = new FormData(form).entries();
    const fields = Object.fromEntries(formdata);

    const newTask = {
      id: getRandomId(),
      description: toCapitalizeString(fields.description),
      priority: fields.priority,
      status: 'wait',
    };
    // Object.assign(newTask, fields); // description, priority
    // newTask.id = getRandomId(); // id
    // newTask.status = 'wait'; // status
    addTaskData(storageKey, newTask);

    const data = getTaskData(storageKey);
    clearList(list);
    renderTasks({data, list});

    form.reset();
    const submit = form[2];
    submit.disabled = true;
    const reset = form[3];
    reset.disabled = true;
    return;
  });
  // обработка анопка сброс формы
  form.addEventListener('reset', (event) => {
    console.log('form reset');
    const submit = form[2];
    const reset = form[3];
    submit.disabled = true;
    reset.disabled = true;
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


// события таблицы действия с делами
export const tableControl = ({data, list, storageKey}) => {
  // навешиваем слушатель
  list.addEventListener('click', event => {
    const target = event.target;
    // удаление задания remove
    if (target.classList.contains('btn_remove')) {
      // подтверждение на удаление задачи
      const taskId = target.dataset?.id;
      const task = getDataOfTask(storageKey, taskId);
      // переспрашиваем у пользователя
      if (confirm(`Удалить задание "${task.description}"?`)) {
        console.log('Удаляем задание', taskId);
        removeTaskData(storageKey, taskId);
        // toda можно для простоты удалить отдельную строку ?
        const data = getTaskData(storageKey);
        clearList(list);
        renderTasks({data, list});
        return;
      } else {
        console.log('Задание не удалено!');
      }
    }
    // завершение задания finish --перечеркнуть--
    if (target.classList.contains('btn_done')) {
      // проверять завершина ли уже задача
      const taskId = target.dataset?.id;
      const task = getDataOfTask(storageKey, taskId);
      console.log('Завершаем задание', taskId);
      // todo деактивировать кнопку
      target.disabled = 'true';

      if (task.status === 'done') {
        console.log('Задание уже завершено ))'); // ничего не делаем
        return;
      } else {
        console.log('Задание еще выполняется');
        finishTaskData(storageKey, taskId);
        // toda можно для прототы изменить только отдельную строку
        const data = getTaskData(storageKey);
        clearList(list);
        renderTasks({data, list});
        return;
      }
    }
  });

  return list;
};


// события формы авторизации модального окна
export const modalControl = ({modal, modalForm}, callback) => {
  const openModal = (modal) => {
    console.log('open modal');
    modal.classList.add('show');
    modal.style.display = 'block';
  };
  const closeModal = (modal) => {
    console.log('close modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
  };

  // открыть модалку в самом начале
  openModal(modal);
  // навешиваем событие и ждем submit
  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const userNameCyr = modalForm.inputUserName.value.trim();
    const userNameLat = trans(userNameCyr);
    const storageKey = 'todo_app_' + userNameLat.toUpperCase();
    const userData = {
      userName: userNameCyr,
      storageKey,
    };
    // после отработки модальной формы закрыть модалку
    closeModal(modal);
    // и перейти к следующим методам
    callback(userData);
  });

  return {
    openModal,
    closeModal,
  };
};
