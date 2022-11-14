// * Local Storage

const KEY = 'todo';

// получаем текущие данные из хранилища
export const getTaskData = (storageKey) => {
  const storageData = localStorage.getItem(storageKey);
  return (storageData ? JSON.parse(storageData) : []);
};

// сохраняем данные обратно в хранилище
export const setTaskData = (storageKey, data) =>
  localStorage.setItem(storageKey, JSON.stringify(data));

// добавляем контакт к данным
export const addTaskData = (storageKey, task) => {
  const data = getTaskData(storageKey);
  data.push(task);
  setTaskData(storageKey, data);
};

// удаляем контакт из хранилища по номеру телефона
export const removeTaskData = (storageKey, taskId) => {
  const data = getTaskData(storageKey);
  const newData = data.filter(item => item.id !== taskId); // фильтруем
  setTaskData(storageKey, newData);
};

export const finishTaskData = (storageKey, taskId) => {
  const data = getTaskData(storageKey);
  const updateData = data.map((task) => {
    // выбираем по id
    if (task.id === taskId) {
      console.log(task);
      console.log('task  id: ', task.id);
      console.log('description: ', task.description);
      console.log('task priory: ', task.priority);
      console.log('task status: ', task.status);
      // изменяем поле выполнено
      task.status = 'done'; //
      return task;
    }
    // остальные не изменяем
    return task;
  });
  setTaskData(storageKey, updateData);
};
