/* eslint-disable max-len */
// * createElements.js

// * get modifyAppContainer
// модифицирует контейнер, добавляем bootstrap классы
//!!! упрощаем js код
/*
export const modifyAppContainer = (app) => {
  // console.log('app: ', app);
  app.classList.add(
    'app-container',
    'vh-100',
    'w-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'flex-column',
  );
  return app;
};
*/

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
export const createButton = ({id, className, type = 'button', textContent, title}) => {
  const button = createElement('button');
  Object.assign(button, {className, type, textContent, title});
  if (id) {
    Object.assign(button, {id});
  }
  if (title) {
    Object.assign(button, {title});
  }
  return button;
};

// * form
export const createForm = () => {
  const form = createElement('form', {
    className: 'task-form d-flex align-items-center mb-4',
    name: 'taskForm',
  });

  const lable = createElement('label', {
    className: 'form-group mb-0 me-1 w-100',
    innerHTML: `<input name="description" type="text" class="form-control w-100" placeholder="ввести задачу" required>`, // ???
  });

  const select = createElement('select', {
    className: 'form-select form-control-sm w-50 me-3',
    name: 'priority',
    innerHTML: `<option selected value="light">обычная</option>
<option value="warning">важная</option>
<option value="danger">срочная</option>`,
  });
  select.title = 'Задает важность задачи';

  const buttonSubmit = createButton({
    className: 'btn btn-primary me-1',
    textContent: 'Сохранить',
    type: 'submit',
  });
  buttonSubmit.disabled = true;

  const buttonReset = createButton({
    className: 'btn btn-warning',
    textContent: 'Очистить',
    type: 'reset',
  });
  buttonReset.disabled = true;

  form.append(lable, select, buttonSubmit, buttonReset);
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
  id,
  number = 1,
  description,
  status,
  priority,
}) => {
  const row = createElement('tr', {
    id,
    className: 'table__row',
    title: (priority === 'danger' ? 'Срочно: ' : (priority === 'warning' ? 'Важно: ' : '')) + description,
  });

  if (priority === 'warning') {
    row.classList.add('table-warning'); // ? priority warning важные
  } else if (priority === 'danger') {
    row.classList.add('table-danger'); // ? priority danger срочные
  } else {
    row.classList.add('table-light'); // ? priority light остальные обычные
  }

  const tdCellNumber = createElement('td', {className: 'table__cell table__cell_number fw-bold text-secondary'}, number ? number : 0); // порядковый номер в ячейке

  const tdCellTask = createElement('td', {className: 'table__cell table__cell_task'}, description); // описание
  if (status === 'done') {
    tdCellTask.classList.add('text-decoration-line-through'); // * перечерк line-through
  }

  const tdCellStatus = createElement('td', {
    className: 'table__cell table__cell_status',
  },
  (status === 'done' ? 'Завершена' : 'Выполняется'), // ? статус wait | done
  );
  if (status === 'done') {
    tdCellStatus.classList.add('text-decoration-line-through'); // * перечерк line-through
  }

  const tdCellAction = createElement('td', {className: 'table__cell table__cell_action'}); // кнопки действий над задачей [Удалить | Завершить]

  row.append(tdCellNumber, tdCellTask, tdCellStatus, tdCellAction);
  const btnDangerRemove = createButton({
    // id,
    className: 'btn btn-danger btn_remove btn-sm me-2',
    textContent: 'Удалить',
    title: 'Удалить задание: ' + description,
  });
  btnDangerRemove.dataset.id = id;
  const btnSuccessDone = createButton({
    // id,
    className: 'btn btn-success btn_done btn-sm',
    textContent: 'Завершить',
    title: 'Завершить: ' + description,
  });
  btnSuccessDone.dataset.id = id;
  tdCellAction.append(btnDangerRemove, btnSuccessDone);
  // возворащаем весь наш ряд Задачи
  return row;
};

// * modal form with bs
export const createModal = () => {
  const modal = createElement('div', {
    className: 'modal fade',
    id: 'authCustomForm',
    tabindex: -1,
  });
  // can be dynamic too
  modal.insertAdjacentHTML('beforeend', `
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="exampleModalLabel">Авторизация</h4>
      </div>
      <div class="modal-body">
        <form class="form row g-3 needs-validation" name="modalAuthForm">
          <div class="col-12">
            <label for="inputUserName" class="form-label">Здравствуйте, представьтесь пожалуйста!</label>
            <input type="text" class="form-control" id="inputUserName" name="inputUserName" placeholder="" required>
            <div class="valid-feedback">Отлично!</div>
            <div class="invalid-feedback">Необходимо ввести имя пользователя...</div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" for="modalAuthForm">Войти</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `);
  return modal;
};
