import * as types from '../constants/ActionTypes';
import parse from '../whitespace/parse';

const initialState = {
  code: '   \t\n\n   \t    \t\t\n \n \t\n \t   \t \t \n\t\n     \t\n\t    \n    \t \t\t\n\t  \t\n\t  \t   \t \t\n\n \n \t    \t\t\n\n   \t   \t \t\n \n\n\n\n\n\n',
  parsedInstructions: [],
  parsedLabels: {},
  parseError: '',
  VMState: {
    stack: [],
    heap: {},
    callStack: [],
    programCounter: 0,
    input: '',
    output: '',
  },
};

export default function whitespaceDevStudio(state = initialState, action) {
  console.log('got', action);
  switch (action.type) {
  case types.CODE_SAVE:
    return {
      ...state,
      code: action.code,
    };

  case types.CODE_PARSE: // eslint-disable-line no-fallthrough
    try {
      const parseResults = parse(state.code);
      return {
        ...state,
        parsedInstructions: parseResults.instructions,
        parsedLabels: parseResults.labels,
        parseError: '',
      };
    } catch (e) {
      return {
        ...state,
        parsedInstructions: [],
        parsedLabels: {},
        parseError: e.message,
      };
    }

  default:
    return state;
  }
}
