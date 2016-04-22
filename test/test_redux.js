import {expect} from 'chai';
import {Map, fromJS} from 'immutable';
import makeStore from '../app/store';

describe('redux store', () => {
  it('should create new state based on actions', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({type: "SET_ENTRIES", entries: ['first', 'second']});

    expect(store.getState()).to.equal(fromJS({
      entries:['first','second']
    }));
  });
});
