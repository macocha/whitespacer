import * as types from '../constants/ActionTypes';
import parse from '../whitespace/parse';
import { Instructions, instructionExecutors } from '../whitespace/Whitespace';

const emptyVMState = {
  stack: [],
  heap: {},
  callStack: [],
  programCounter: 0,
  input: '',
  output: '',
};

const initialState = {
  code: '   \t\n\n   \t    \t\t\n \n \t\n \t   \t \t \n\t\n     \t\n\t    \n    \t \t\t\n\t  \t\n\t  \t   \t \t\n\n \n \t    \t\t\n\n   \t   \t \t\n \n\n\n\n\n\n',
  parsedInstructions: [],
  parsedLabels: {},
  parseError: '',
  runtimeError: '',
  runInterval: null,
  VMState: { ...emptyVMState,
    stack: [1, 2, 3, 4, 5, 6],
    heap: {'1': 3, '3': 6},
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

  case types.EXECUTE_RESET:
    return {
      ...state,
      VMState: { ...emptyVMState },
    };

  case types.EXECUTE_STEP:
    const pc = state.VMState.programCounter;
    const instructions = state.parsedInstructions;
    if (Number.isInteger(pc)) {
      try {
        const newVMState = instructionExecutors[instructions[pc].instruction](
          state.VMState,
          instructions[pc].argument,
          instructions[pc].imp === Instructions.IMP_FLOW ? state.parsedLabels : undefined);

        return {
          ...state,
          VMState: newVMState,
        };
      } catch (e) {
        return {
          ...state,
          VMState: {...state.VMState, programCounter: 'ERR'},
          runtimeError: e.message,
        };
      }
    }
    return state;

  case types.EXECUTE_RUN:
    return {
      ...state,
      runInterval: action.intervalId,
    };

  case types.EXECUTE_STOP:
    return {
      ...state,
      runInterval: null,
    };

  default:
    return state;
  }
}
