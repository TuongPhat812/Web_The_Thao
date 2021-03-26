const homeRouter = require('./home');

function route(app) {

  app.use('/home', homeRouter);
  app.use('/news', homeRouter);

}

module.exports = route;