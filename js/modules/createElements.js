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


// export const createTitleH1 = (title) => {
//   const h1 = document.createElement('h1');
//   h1.textContent = title;
//   return title;
// };

export const createTitle = (title) => createElement('h1', {
  className: 'app-title mb-5 fw-bold',
  textContent: title,
});


export const createButton = ({id, className, type = 'button', textContent}) => {
  const button = createElement('button');
  Object.assign(button, {id, className, type, textContent});
  return button;
};


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

  const buttonSubmit = createElement('button', {
    type: 'submit',
    className: 'btn btn-primary me-3',
  },
  'Сохранить');

  const buttonReset = createButton({
    className: 'btn btn-warning',
    textContent: 'Очистить',
    type: 'reset',
  });

  /* **
    form.insertAdjacentHTML('beforeend', `
      <form class="d-flex align-items-center mb-5">
        <label class="form-group me-3 mb-0">
          <input type="text" class="form-control" placeholder="ввести задачу">
        </label>
        <button type="submit" class="btn btn-primary me-3">
          Сохранить
        </button>
        <button type="reset" class="btn btn-warning">
          Очистить
        </button>
      </form>`);
*/
  form.append(lable, buttonSubmit, buttonReset);
  return form;
};


export const createTable = () => {
  const tableWrapper = createElement('div', {
    className: 'table-wrapper',
  });
  const table = createElement('table', {
    className: 'table table-hover table-bordered',
  });
  const thead = createElement('thead');
  const headRow = createElement('tr');

  const thCellNumber = createElement('th', {}, '№');
  const thCellTask = createElement('th', {}, 'Задача');
  const thCellStatus = createElement('th', {}, 'Статус');
  const thCellAction = createElement('th', {}, 'Действия');

  const tbody = createElement('tbody');

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


export const createRow = ({
  id = '0000000',
  number = 0,
  description,
  status,
}) => {
  const row = createElement('tr');
  if (status === 'wait') {
    row.classList.add('table-warning');
  } else if (status === 'done') {
    row.classList.add('table-primary', 'text-decoration-line-through');
  } else {
    row.classList.add('table-light');
  }
  const tdCellNumber = createElement('td', {className: 'table__cell table__cell_number'}, number ? number : 0);
  const tdCellTask = createElement('td', {className: 'table__cell table__cell_task'}, description);
  const tdCellStatus = createElement('td', {className: 'table__cell table__cell_elemnt'}, status);
  const tdCellAction = createElement('td', {className: 'table__cell table__cell_action'});
  row.append(tdCellNumber, tdCellTask, tdCellStatus, tdCellAction);
  const btnDangerRemove = createButton({
    id,
    className: 'btn btn-outline-danger me-2',
    textContent: 'Удалить',
  });
  const btnSuccessDone = createButton({
    id,
    className: 'btn btn-outline-success',
    textContent: 'Завершить',
  });
  tdCellAction.append(btnDangerRemove, btnSuccessDone);
  return row;
};

