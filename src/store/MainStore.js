import React, {createContext, useReducer} from 'react';

const initialState = {qualList: {}};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
    case 'SET_TRAINER_CODE':
        return {...state, trainerCode: action.value};
    case 'SET_BRANCH':
        return {...state, branch: action.value};
    case 'SAVE_QUAL':
        return {
            ...state,
             qualList: {
                 ...state.qualList,
                  [action.value.qualCode]: {
                      ...action.value,
                       trainerCode: state.trainer.TrainerCode
                    }
                }
            };
      default:
        return state;
    };
  }, initialState);

  return <Provider value={[ state, dispatch ]}>{children}</Provider>;
};

export { store, StateProvider }