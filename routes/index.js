const messagesRouter = require('./messages');
const documentRouter = require('./document');
const groupsRouter = require('./groups');

module.exports = (app) => {
  app.use('/', documentRouter);
  app.use('/messages', messagesRouter);
  app.use('/groups', groupsRouter)
};
