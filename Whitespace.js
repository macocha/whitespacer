import parse from './parse';
import * as Instructions from './constants/Instructions';

export const instructionExecutors =  {
  // IMP: Stack Manipulation

  // Push the number onto the stack
  [Instructions.PUSH]: (state, n) => {
    const newStack = [...state.stack];
    newStack.push(n);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Duplicate the top item on the stack
  [Instructions.DUPL]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to DUPL on empty stack');
    }

    newStack.push(newStack[newStack.length - 1]);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Discard the top item on the stack
  [Instructions.DISC]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to DUPL on empty stack');
    }

    newStack.pop();

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Copy the nth item on the stack (given by the argument) onto the top of the stack
  [Instructions.COPY]: (state, n) => {
    const newStack = [...state.stack];
    if (n >= 0 && n <= newStack.length - 1) {
      newStack.push(newStack[newStack.length - 1 - n]);
    } else {
      throw new Error('Tried to COPY value out of bounds of the stack');
    }

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Slide n items off the stack, keeping the top item
  [Instructions.SLIDE]: (state, n) => {
    let newStack = [...state.stack];
    const top = newStack.pop();
    if (n < 0 || n >= newStack.length) {
      newStack = [];
    } else if (n !== 0) {
      newStack = newStack.slice(0, -n);
    }
    newStack.push(top);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Swap the top two items on the stack
  [Instructions.SWP]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to SWP with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();
    newStack.push(a);
    newStack.push(b);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // IMP: Arithmetic

  // Addition
  [Instructions.ADD]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to ADD with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();
    newStack.push(b + a);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Subtraction
  [Instructions.SUB]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to SUB with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();
    newStack.push(b - a);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Multiplication
  [Instructions.MUL]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to MUL with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();
    newStack.push(b * a);

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Integer Division
  [Instructions.DIV]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to DIV with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();

    if (a === 0) {
      throw new Error('Division by 0.');
    }

    newStack.push(Math.floor(b / a));

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // Modulo
  [Instructions.MOD]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to MOD with less than two elements on stack');
    }

    const a = newStack.pop();
    const b = newStack.pop();

    if (a === 0) {
      throw new Error('Division by 0.');
    }

    newStack.push(b - (a * Math.floor(b / a)));

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // IMP: Heap Access

  // Store
  [Instructions.STORE]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length < 2) {
      throw new Error('Tried to STORE with less than two elements on stack');
    }
    const a = newStack.pop();
    const b = newStack.pop();

    const newHeap = {...state.heap};

    newHeap[b] = a;

    return {
      ...state,
      stack: newStack,
      heap: newHeap,
      programCounter: state.programCounter + 1,
    };
  },

  // Retrieve
  [Instructions.GET]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to GET with empty stack');
    }
    const a = newStack.pop();

    if (state.heap.hasOwnProperty(a)) {
      newStack.push(state.heap[a]);
    } else {
      throw new Error('Address for GET does not exist on heap');
    }

    return {
      ...state,
      stack: newStack,
      programCounter: state.programCounter + 1,
    };
  },

  // IMP: I/O

  // Output the character at the top of the stack
  [Instructions.OUTC]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to OUTC with empty stack');
    }
    let newOutput = state.output.slice();
    const a = newStack.pop();

    newOutput += String.fromCharCode(a);

    return {
      ...state,
      stack: newStack,
      output: newOutput,
      programCounter: state.programCounter + 1,
    };
  },

  // Output the number at the top of the stack
  [Instructions.OUTN]: (state) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to OUTC with empty stack');
    }
    let newOutput = state.output.slice();
    const a = newStack.pop();

    newOutput += a;

    return {
      ...state,
      stack: newStack,
      output: newOutput,
      programCounter: state.programCounter + 1,
    };
  },

  // Read a character and place it in the location given by the top of the stack
  [Instructions.INPC]: (state) => { // eslint-disable-line no-unused-vars
    // TODO: Read
    throw new Error('Not implemented yet.');
  },

  // Read a number and place it in the location given by the top of the stack
  [Instructions.INPN]: (state) => { // eslint-disable-line no-unused-vars
    // TODO: Read
    throw new Error('Not implemented yet.');
  },

  // IMP: Flow Control

  // Mark a location in the program
  [Instructions.LABEL]: (state) => {
    return {
      ...state,
      programCounter: state.programCounter + 1,
    };
  },

  // Call a subroutine
  [Instructions.CALL]: (state, n, labels) => {
    const newCallStack = [...state.callStack];
    let newProgramCounter = state.programCounter;

    if (labels.hasOwnProperty(n)) {
      newCallStack.push(newProgramCounter + 1);
      newProgramCounter = labels[n];
    } else {
      throw new Error('Tried to CALL with invalid label.');
    }

    return {
      ...state,
      callStack: newCallStack,
      programCounter: newProgramCounter,
    };
  },

  // Jump unconditionally to a label
  [Instructions.JMP]: (state, n, labels) => {
    let newProgramCounter = state.programCounter;

    if (labels.hasOwnProperty(n)) {
      newProgramCounter = labels[n];
    } else {
      throw new Error('Tried to JMP with invalid label.');
    }

    return {
      ...state,
      programCounter: newProgramCounter,
    };
  },

  // Jump to a label if the top of the stack is zero
  [Instructions.JEZ]: (state, n, labels) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to JEZ with empty stack');
    }
    let newProgramCounter = state.programCounter;
    const a = newStack.pop();

    if (labels.hasOwnProperty(n)) {
      if (a === 0) {
        newProgramCounter = labels[n];
      } else {
        newProgramCounter++;
      }
    } else {
      throw new Error('Tried to JEZ with invalid label.');
    }

    return {
      ...state,
      stack: newStack,
      programCounter: newProgramCounter,
    };
  },

  // Jump to a label if the top of the stack is negative
  [Instructions.JLZ]: (state, n, labels) => {
    const newStack = [...state.stack];
    if (newStack.length === 0) {
      throw new Error('Tried to JLZ with empty stack');
    }
    let newProgramCounter = state.programCounter;
    const a = newStack.pop();

    if (labels.hasOwnProperty(n)) {
      if (a < 0) {
        newProgramCounter = labels[n];
      } else {
        newProgramCounter++;
      }
    } else {
      throw new Error('Tried to JLZ with invalid label.');
    }

    return {
      ...state,
      stack: newStack,
      programCounter: newProgramCounter,
    };
  },

  // End a subroutine and transfer control back to the caller
  [Instructions.RET]: (state) => {
    const newCallStack = [...state.callStack];
    if (newCallStack.length === 0) {
      throw new Error('Tried to RET with empty call stack');
    }
    let newProgramCounter = state.programCounter;

    newProgramCounter = newCallStack.pop();

    return {
      ...state,
      callStack: newCallStack,
      programCounter: newProgramCounter,
    };
  },

  // End the program
  [Instructions.EXIT]: (state) => {
    const newProgramCounter = Instructions.EXIT;

    return {
      ...state,
      programCounter: newProgramCounter,
    };
  },
};

export default class Whitespace {
  constructor(code, input) {
    const {instructions, labels} = parse(code);
    this.instructions = instructions;
    this.labels = labels;
    this.input = input || '';
    this.state = {
      stack: [],
      heap: {},
      callStack: [],
      programCounter: 0,
      output: '',
    };
  }

  step() {
    const pc = this.state.programCounter;
    const instructions = this.instructions;
    this.state = instructionExecutors[instructions[pc].instruction](
      this.state,
      instructions[pc].argument,
      instructions[pc].imp === Instructions.IMP_FLOW ? this.labels : undefined);
    console.log(instructions[pc].instruction);
    console.log(this.state);
  }

  run() {
    console.log(this.instructions);
    while (this.state.programCounter !== Instructions.EXIT) {
      this.step();
    }
  }
}
