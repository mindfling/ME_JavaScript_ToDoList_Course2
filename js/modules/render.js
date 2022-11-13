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
  while (list.lastChild) {
    list.lastChild.remove();
  }
};

// todo
export const renderTasks = (list, tasksData = []) => {
  // очищаем список
  clearList(list);
  // перебираем массив объектов
  if (Array.isArray(tasksData && tasksData.length > 0)) {
    // вставляем ряды в таблицу
    tasksData.forEach((task, index) => {
      list.append(
        createRow(index + 1, {
          id: task.id,
          title: task.title,
          category: task.category,
          description: task.description,
          status: task.status,
          priority: task.priority,
        }),
      );
    });
    rowsNumberRecount(list);
  } else {
    const tr = createElement('tr', {
      className: 'table-row',
    });
    const td = createElement('td', {
      className: 'table-cell text-center text-muted',
      colSpan: 4,
      rowSpan: 1,
      textContent: 'Список пока еще пуст...',
    });
    tr.append(td);
    list.append(tr);
  }
  return;
};

