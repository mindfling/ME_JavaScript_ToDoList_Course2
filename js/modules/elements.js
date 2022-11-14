// * dom consts app elements:
const getApp = (selector) => document.querySelector(selector);

const app = document.querySelector('.app-container'); // ? где лучше получить ??

export default {
  app,
  getApp,
};
