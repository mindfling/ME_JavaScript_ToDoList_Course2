// * render.js *** rendering dom elements in app

import {createElement, createRow, createTitle} from './createElements.js';

export const rowsNumberRecount = (list) => {
  const allNumbers = list.querySelectorAll('.table__cell_number');
  let cellCount = 0;
  allNumbers.forEach((cell) => {
    cell.textContent = ++cellCount;
  });
};

// todo
// * clear list
export const clearList = (list) => {
  // const list = document.querySelector('.table-body');
  console.log('list: ', list);

  while (list.lastChild) {
    list.lastChild.remove();
  }
};

// todo
export const renderTasks = (list, tasksData) => {
  console.log('list: ', list);
  console.log('tasksData: ', tasksData);
  // перебираем массив объектов
  if (Array.isArray(tasksData) && tasksData.length > 0) {
    // вставляем ряды в таблицу
    tasksData.forEach((task, index) => {
      // console.log('task: ', task, task.id, task.number, task.description, task.status, task.priority);
      list.append(
        createRow({
          id: task.id,
          number: task?.number,
          description: task.description,
          status: task.status,
          priority: task.priority,
        }),
      );
    });
    rowsNumberRecount(list);
  } else {
    // если список еще пуст рендерим заглушку
    const tr = createElement('tr', {
      className: 'table-row',
    });
    const td = createElement('td', {
      className: 'table-cell text-center text-muted',
      colSpan: 4,
      rowSpan: 1,
      // textContent: 'Список пока еще пуст...',
    });
    // td.append( createElement('p', {
      //   className: 'alert alert-success',
      //   innerHTML: 'Список дел пока еще пуст...',
      // }))
    td.append(
      createElement('p', {
        className: 'alert alert-danger show',
        innerHTML: `<br>
<span class="spinner-border spinner-border-sm"></span><br>
<br>
<b>Список дел пока еще пуст</b><br>
Добавьте и сохраните новую задачу ... 
<br><br>`,
      }));
    tr.append(td);
    list.append(tr);
  }
  return;
};

