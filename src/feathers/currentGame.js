import { List } from 'immutable';
import Resource from './resource';
import { appContainer } from '../contexts';

export default app => {
  const service = app.service('/currentGame');

  const GameRecord = Resource(service, {
      players: List()
    },
    {}
  );

  appContainer.GameRecord = GameRecord;
  app.set('GameRecord', GameRecord);

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
