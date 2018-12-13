import Resource from './resource';
import { SQLite } from 'expo';
import { appContainer } from '../contexts';

export default app => {
  const service = app.service('/database');

  const Database = Resource(service, {
    dbConnection: SQLite.openDatabase('dardz.db')
  }, {});

  // const Database = SQLite.openDatabase('dardz.db');
  appContainer.Database = Database;
  app.set('Database', Database);

  service.hooks({
    before: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },

    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    }
  });
};
