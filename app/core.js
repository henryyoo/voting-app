import {List, Map} from 'immutable';

function getWinners(vote){
    if(!vote) { return []; }

    const [a,b] = vote.get('pair');
    const aVotes = vote.getIn(['tally',a],0);
    const bVotes = vote.getIn(['tally',b], 0);

    if(aVotes > bVotes) {return [a];}
    else if(bVotes > aVotes) {return [b];}
    else{return [a,b];}
}

export const DEFAULT_INITIAL_STATE = Map();
export function setEntries(currentMap, newEntry){
    return currentMap.set('entries', List(newEntry));
};

export function next(currentMap) {
    const entries = currentMap.get('entries').concat(getWinners(currentMap.get('vote')));
    if(entries.size === 1){
        return currentMap.remove('vote').remove('entries').set('winner', entries.first());
    }
    return currentMap.merge({
        vote: Map({
            pair: entries.take(2)
        }),
        entries: entries.skip(2)
    });
}

export function vote(currentState, voted) {
    return currentState.updateIn(['tally',voted],0, tally => tally+1)
}
