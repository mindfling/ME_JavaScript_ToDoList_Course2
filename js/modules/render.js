// * render.js *** rendering dom elements in app

import {
  createElement,
  createForm,
  createTitle,
  createTable,
  createRow,
} from './createElements.js';

import {getTaskData} from './serviceStorage.js';
import {toCapitalizeString} from './utils.js';

export const rowsNumberRecount = (list) => {
  const allNumbers = list.querySelectorAll('.table__cell_number');
  let cellCount = 0;
  allNumbers.forEach((cell) => {
    cell.textContent = ++cellCount;
  });
};

// * clear list
export const clearList = (list) => {
  while (list.lastChild) {
    list.lastChild.remove();
  }
};

export const renderTasks = ({list, data}) => {
  console.log('ПЕРЕНДЕРИВАЕМ');
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((task, index) => {
      list.append(
        createRow({
          id: task.id,
          // number: task?.number,
          description: task.description,
          status: task.status,
          priority: task.priority,
        }),
      );
    });
    rowsNumberRecount(list);
  } else {
    // заглушка
    const tr = createElement('tr', {
      className: 'table-row',
    });
    const td = createElement('td', {
      className: 'table-cell text-center text-muted',
      colSpan: 4,
      rowSpan: 1,
    });
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


export const renderApp = ({app, appTitle, userData}) => {
  console.log('Рендерим ВСЁ ПРИЛОЖЕНИЕ');
  console.log('appTitle: ', appTitle);
  console.log('userData: ', userData);
  console.log('app: ', app);
  const h1 = createTitle(appTitle +
    ' ' + toCapitalizeString(userData.userName));
  const form = createForm();
  const {table, tableWrapper, head, list} = createTable();
  // const data = getTaskData(storageKey);
  // renderTasks({list, data}); // весь перерендер списка здесь
  app.append(h1, form, tableWrapper);

  return {
    form,
    table,
    head,
    list,
  };
};
