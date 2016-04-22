import {expect} from 'chai';
import {List, Map} from 'immutable';
import {setEntries,next,vote} from '../app/core'

describe('application logic', () => {

  describe('setEntries', () => {
    it('should takek some entries and return a new tree', () =>{
      const currentState = Map();
      const list = ['First Entry']
      const newMap = setEntries(currentState, list);

      expect(newMap).to.equal(Map({
        entries : List.of('First Entry')
      }));

    });

  });

  describe('next' , () => {
    it('should take in an existing state and put a vote map on it', () => {
      const currentState = Map({
        entries: List.of('first','second', 'third')
      });
      const nextMap = next(currentState);
      expect(nextMap).to.equal(Map({
        vote:Map({
          pair: List.of('first','second')
        }),
        entries : List.of('third')

      }));
    });

    it('should put the winner back into the entry and pull two new ones for vote', () => {
      const currentState = Map({
        vote: Map({
          pair: List.of('first', 'second'),
          tally : Map({
            'first':10,
            'second': 1
          })
        }),

        entries : List.of('third','fourth','fifth')
      });

      const nextState = next(currentState);

      expect(nextState).to.equal(Map({
        vote : Map({
          pair: List.of('third','fourth'),
        }),
        entries : List.of('fifth','first')
      }));
    });

    it('should put both pair back into the entry when tied', () => {
      const currentState = Map({
        vote : Map({
          pair: List.of('first','second'),
          tally: Map({
            'first': 5,
            'second': 5
          })
        }),
        entries: List.of('third','fourth','fifth')
      });

      const nextState = next(currentState);

      expect(nextState).to.equal(Map({
        vote:Map({
            pair: List.of('third','fourth'),
        }),
        entries : List.of('fifth', 'first', 'second')
      }));
    });

    it('should declare the winner when there are no more entries', () => {
      const currentState = Map({
        vote: Map({
          pair : List.of('first','second'),
          tally: Map({
            'first': 10,
            'second':0
          })
        }),
        entries : List()
      })

      const nextState = next(currentState);

      expect(nextState).to.equal(Map({
        winner: 'first'
      }));

    })
  });

  describe('vote', () => {
    it('should add a new key tally when there is a vote', () => {
      const currentState = Map({
        pair: List.of('first', 'second')
      });

      const nextState = vote(currentState, 'first');
      expect(nextState).to.equal(Map({
          pair: List.of('first', 'second'),
          tally: Map({
          'first': 1
          })
      }));
    });

    it('should add to the existing tally when there is a vote', () => {
      const currentState = Map({
          pair: List.of('first','second'),
          tally: Map({
            'first' : 1,
            'second' : 3
          })
      });

      const nextState = vote(currentState, 'first');

      expect(nextState).to.equal(Map({
          pair: List.of('first','second'),
          tally: Map({
            'first': 2,
            'second': 3
          })
      }));
    });
  });
});
