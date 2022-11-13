// * Local Storage

const KEY = 'todo';

// получаем текущие данные из хранилища
export const getTaskData = () => {
  const storageData = localStorage.getItem(KEY);
  return (storageData ? JSON.parse(storageData) : []);
};

// сохраняем данные обратно в хранилище
export const setTaskData = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));

// добавляем контакт к данным
export const addTaskData = (task) => {
  const data = getTaskData(KEY);
  data.push(task);
  setTaskData(data);
};

// удаляем контакт из хранилища по номеру телефона
export const removeTaskData = taskId => {
  const data = getTaskData(KEY);
  const newData = data.filter(item => item.id !== taskId); // фильтруем
  setTaskData(newData);
};
