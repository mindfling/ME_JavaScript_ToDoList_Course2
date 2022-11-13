// * dom consts app elements:
const getApp = (selector) => document.querySelector(selector);

const app = document.querySelector('.app-container');
console.log('app: ', app);

export default {
  app,
  getApp,
};
