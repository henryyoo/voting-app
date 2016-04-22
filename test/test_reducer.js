import {expect} from 'chai';
import {fromJS, Map, List} from 'immutable';

import reducer from '../app/reducers';
describe('reducers', ()=>{
  it ('handles SET_ENTRIES', () => {
    const action = {type:'SET_ENTRIES', entries:['first']};
    const initialState = Map();

    const nextState = reducer(initialState,action);

    expect(nextState).to.equal(fromJS({
      entries:List.of('first')
    }));
  });

  it ('handles NEXT', ()=> {
    const action = {type:'NEXT'};
    const initialState = Map({
      entries: List.of('first','second')
    });

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote:Map({
        pair: List.of('first','second')
      }),
      entries: List()
    }));
  });

  it ('handles VOTE', () => {
    const action = {type:'VOTE', entries: 'first'};
    const initialState = Map({
      vote: Map({
        pair:List.of('first','second')
      }),
      entries: List()
    });

    const nextState = reducer(initialState,action);

    expect(nextState).to.equal(fromJS({
      vote:Map({
        pair:List.of('first','second'),
        tally:Map({
          'first': 1
        })
      }),
      entries: List()
    }));

  });

  it('handles undefined initialState for SET_ENTRIES', () => {
    const action = {type:'SET_ENTRIES', entries:['first']};
    const state = reducer(undefined, action);

    expect(state).to.equal(fromJS({
      entries: List.of('first')
    }));
  });

  it('can be used with reduce', () => {
    const actions = [
      {type : "SET_ENTRIES", entries: ['first','second']},
      {type: "NEXT"},
      {type: "VOTE", entries: "first"},
      {type: "NEXT"}
    ]

    const resultState = actions.reduce(reducer,Map());

    expect(resultState).to.equal(fromJS({
        winner:'first'
    }));
  });

});
