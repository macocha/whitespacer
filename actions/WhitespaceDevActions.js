import * as types from '../constants/ActionTypes.js';

export function codeParse() {
  return {
    type: types.CODE_PARSE,
  };
}

export function codeSave(code) {
  return {
    type: types.CODE_SAVE,
    code,
  };
}

export function codeLoad() {
  return {
    type: types.LOAD_CODE,
  };
}

export function executeStep() {
  return {
    type: types.EXECUTE_STEP,
  };
}

export function executeReset() {
  return {
    type: types.EXECUTE_RESET,
  };
}

export function executeStop() {
  return (dispatch, getState) => {
    const { runInterval } = getState();
    if (runInterval !== null) {
      clearInterval(runInterval);
      dispatch({type: types.EXECUTE_STOP});
    }
  };
}

export function executeRun() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.runInterval === null) {
      const runInterval = setInterval(() => {
        dispatch(executeStep());
        const { VMState: { programCounter } }  = getState();
        if (!Number.isInteger(programCounter)) {
          dispatch(executeStop());
        }
      }, 500);
      dispatch({type: types.EXECUTE_RUN, intervalId: runInterval});
    }
  };
}
