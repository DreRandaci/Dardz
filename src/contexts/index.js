import React from 'react';
import { Map } from 'immutable';
import { Container, Subscribe as Sub } from 'unstated';
import {
  SQLite
} from 'expo';

class AppContainer extends Container {
  constructor (props) {
    super(props);
    // Overwrite the very basic setState to handle immutable data
    // be sure to handle the _listeners call
    // https://github.com/jamiebuilds/unstated/blob/master/src/unstated.js
    this.setState = (newState) => {
      this.state = this.state.merge(newState);
      this._listeners.forEach(fn => fn());
    };
    this.DatabaseConnection = SQLite.openDatabase('dardz.db');
    this.state = Map({
      game: Map(),
      swatches: Map()
    });
  };

  merge (path, map) {
    const items = this.state.get(path);
    const mergedItems = items.merge(map);
    const newState = this.state.set(path, mergedItems);
    logState('merge', path, map, newState);
    this.setState(newState);
  }

  // Replace the entire map at a give key
  set (path, map) {
    const newState = this.state.set(path, map);
    logState(newState);
    this.setState(newState);
  }

  // Add an item to its respective map. Note this can be
  // used to create or update an item in the map as
  // immutable.js method .set() does this.
  setIn (path, item) {
    const newState = this.state.setIn(path, item);
    logState(newState);
    this.setState(newState);
  }

  deleteIn (path) {
    const newState = this.state.deleteIn(path);
    logState(newState);
    this.setState(newState);
  }
}
/*
  This app only needs one instance of appContainer.
  We do not really follow the unstated docs of passing
  in the class AppContainer and allow unstated to
  manage the instances. Instead we make ONE instance
  and share it everywhere (which unstated does too
  under the hood) But we want to get at our state from
  externally of a subscribe component.
*/
export const appContainer = new AppContainer();

export const Subscribe = ({ to, render }) => (
  <Sub to={to}>
    {render}
  </Sub>
);

const logState = (state) => {
  // console.log({ state });
};
