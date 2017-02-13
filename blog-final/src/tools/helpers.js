(function (app) {
  class Helpers {
    static getRandomId() {
      return parseInt(Math.random() * 10000);
    }
    static getHash(str) {
      if(!str.includes('#')) return;
      let divided = str.split('#');
      return divided.pop();
    }
  }
  app.Helpers = Helpers;
})(App);