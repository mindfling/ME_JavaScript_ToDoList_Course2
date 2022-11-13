// * события

import {clearList, renderTasks} from './render.js';
import {addTaskData, getTaskData} from './serviceStorage.js';

export const formControl = ({form, list, storageKey}) => {
  // form = document.forms[0]; // form.taskForm
  // const description = form.description; // todo onchonge empty field
  // отрабатываем событие формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('form submited');

    const formdata = new FormData(form).entries();
    const fields = Object.fromEntries(formdata);
    console.log('fields: ', fields.description);

    const newTask = {
      number: parseInt(Math.random().toString().substring(2, 6)), // todo убрать
      id: Math.random().toString().substring(2, 16), // string
      description: fields.description, // * единственное информ поле формы ))
      priority: 'обычный приоритет', // toda select [light | warning | denger]
      status: 'wait', // fields.status, // toda [wait | done]
    };
    console.log('newTask: ', newTask);
    addTaskData(storageKey, newTask);
    clearList(list);
    renderTasks(list, getTaskData(storageKey));
    form.reset();
  });
  return;
};

const tableControl = (list, data) => {
  console.log('list: ', list);
  // todo
  //
  return list;
};
