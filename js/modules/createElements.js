/* eslint-disable max-len */
// * createElements.js

// * get modifyAppContainer
export const modifyAppContainer = (app) => {
  console.log('app: ', app);
  app.classList.add(
    'app-container', // ?
    'vh-100',
    'w-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column',
  );
  return app;
};

// * create element
export const createElement = (tag, param = {}, text) => {
  const element = document.createElement(tag);
  Object.assign(element, param);
  if (text) {
    element.textContent = text;
  }
  return element;
};

// * title
export const createTitle = (title) => createElement('h1', {
  className: 'app-title mb-5 fw-bold',
  textContent: title,
});

// * button
export const createButton = ({id, className, type = 'button', textContent}) => {
  const button = createElement('button');
  Object.assign(button, {className, type, textContent});
  if (id) {
    Object.assign(button, {id});
  }
  return button;
};

// * form
export const createForm = () => {
  const form = createElement('form', {
    className: 'task-form d-flex align-items-center mb-4',
    name: 'taskForm',
    action: '#',
  });

  const lable = createElement('label', {
    className: 'form-group me-3 mb-0',
    innerHTML: `<input name="description" type="text" class="form-control" placeholder="ввести задачу">`, // ???
  });

  const buttonSubmit = createButton({
    className: 'btn btn-primary me-3',
    textContent: 'Сохранить',
    type: 'submit',
  });

  const buttonReset = createButton({
    className: 'btn btn-warning',
    textContent: 'Очистить',
    type: 'reset',
  });

  form.append(lable, buttonSubmit, buttonReset);
  return form;
};

// * table
export const createTable = () => {
  const tableWrapper = createElement('div', {
    className: 'table-wrapper',
  });
  const table = createElement('table', {
    className: 'table table-hover table-bordered',
  });
  const thead = createElement('thead', {className: 'table-head'});
  const headRow = createElement('tr');

  const thCellNumber = createElement('th', {}, '№');
  const thCellTask = createElement('th', {}, 'Задача');
  const thCellStatus = createElement('th', {}, 'Статус');
  const thCellAction = createElement('th', {}, 'Действия');

  const tbody = createElement('tbody', {className: 'table-body'});

  table.thead = thead;
  table.tbody = tbody;
  tableWrapper.append(table);

  table.append(thead, tbody);

  thead.append(headRow);
  headRow.append(thCellNumber, thCellTask, thCellStatus, thCellAction);

  return {
    tableWrapper,
    table,
    list: table.tbody,
  };
};

// * create row of task
export const createRow = ({
  id, // *
  number = 1, // *
  description, // *
  status, // ?
  priority, //
}) => {
  const row = createElement('tr', {
    id,
    className: 'table__row',
  });
  if (status === 'wait') {
    row.classList.add('table-warning');
  } else if (status === 'done') {
    row.classList.add('table-primary', 'text-decoration-line-through'); // * перечерк line-through
  } else {
    row.classList.add('table-light');
  }

  // todo перечеркивание поля а не всей строки
  const tdCellNumber = createElement('td', {className: 'table__cell table__cell_number'}, number ? number : 0); // порядковый номер в ячейке
  const tdCellTask = createElement('td', {className: 'table__cell table__cell_task'}, description); // описание
  const tdCellStatus = createElement('td', {className: 'table__cell table__cell_elemnt'}, status); // статус [wait | done]
  const tdCellAction = createElement('td', {className: 'table__cell table__cell_action'}); // кнопки действий над задачей [Удалить | Завершить]
  row.append(tdCellNumber, tdCellTask, tdCellStatus, tdCellAction);
  const btnDangerRemove = createButton({
    id,
    className: 'btn btn-danger btn_remove me-2',
    textContent: 'Удалить',
  });
  const btnSuccessDone = createButton({
    id,
    className: 'btn btn-success btn_done',
    textContent: 'Завершить',
  });
  tdCellAction.append(btnDangerRemove, btnSuccessDone);
  return row;
};

