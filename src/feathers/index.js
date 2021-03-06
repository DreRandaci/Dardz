import { AsyncStorage } from 'react-native';
import feathers from '@feathersjs/feathers';
import localstorage from 'feathers-localstorage';
import game from './currentGame';
import { appContainer as appContext } from '../contexts';

import appContainer from './appContainer';

const app = feathers();
app.use('/currentGame', localstorage({
  storage: AsyncStorage
}));

app.configure((app) => appContainer(app, appContext));
app.configure(game);

export default app;