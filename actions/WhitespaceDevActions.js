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

export function executeStep() {
  return {
    type: types.EXECUTE_STEP,
  };
}

export function executeRun() {
  return {
    type: types.EXECUTE_RUN,
  };
}

export function loadCode() {
  return {
    type: types.LOAD_CODE,
  };
}