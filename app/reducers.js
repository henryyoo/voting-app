import {setEntries, vote,next, DEFAULT_INITIAL_STATE} from '../app/core';


export default function reducer(initialState= DEFAULT_INITIAL_STATE,action){
  switch(action.type){
    case "SET_ENTRIES":
      return setEntries(initialState,action.entries);
    case "NEXT":
      return next(initialState);
    case "VOTE":
      return initialState.update('vote', votedState => vote(votedState,action.entries));
    default:
      return initialState;
  }
}
