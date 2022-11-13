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
  setTaskData(data);
};

// удаляем контакт из хранилища по номеру телефона
export const removeTaskData = (storageKey, taskId) => {
  const data = getTaskData(storageKey);
  const newData = data.filter(item => item.id !== taskId); // фильтруем
  setTaskData(newData);
};
