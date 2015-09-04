import * as Instructions from './constants/Instructions';

export default function parse(code) {
  const labels = {};        // found labels
  const instructions = [];  // parsed instructions
  let charCounter = 0;    // currently parsed character

  const getNextChar = function getNextChar() {
    if (charCounter >= code.length) {
      throw new Error('Unexpected end of code.');
    }

    const c =  code.charAt(charCounter++);
    // Return character only if it matches one of the whitespaces
    if (c === ' ' || c === '\t' || c === '\n') {
      return c;
    }

    return getNextChar();
  };

  const getNumber = ()  => {
    const sign = getNextChar();
    let val = '';
    let c = '';

    if (sign === '\n') {
      throw new Error('Malformed Number');
    }

    while ((c = getNextChar()) !== '\n') { // eslint-disable-line no-cond-assign
      val += (c === ' ' ? 0 : 1);
    }

    return (sign === ' ' ? 1 : -1) * (parseInt(val, 2) || 0);
  };

  const getLabel = () => {
    let val = '';
    let c = '';

    while ((c = getNextChar()) !== '\n') { // eslint-disable-line no-cond-assign
      val += c;
    }

    return val;
  };

  const getIMP = () => {
    let c = getNextChar();
    switch (c) {
    case ' ':
      return Instructions.IMP_STACK;

    case '\n':
      return Instructions.IMP_FLOW;

    case '\t':  // eslint-disable-line no-fallthrough
      c = getNextChar();
      switch (c) {
      case ' ':
        return Instructions.IMP_ARITHM;
      case '\t':
        return Instructions.IMP_HEAP;
      case '\n':
        return Instructions.IMP_IO;
      default:
        throw new Error('Unexpected Error while getting IMP');
      }
    default:
      throw new Error('Unexpected Error while getting IMP');
    }
  };

  const commands = {
    // Stack Manipulation (IMP: [Space])
    [Instructions.IMP_STACK]: () => {
      let c = getNextChar();
      let n = undefined;
      switch (c) {
      case ' ':
        // [Space]
        n = getNumber();
        return {instruction: Instructions.PUSH, argument: n};

      case '\t': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Tab] [Space]
          n = getNumber();
          return {instruction: Instructions.COPY, argument: n};

        case '\n':
          // [Tab] [LF]
          n = getNumber();
          return {instruction: Instructions.SLIDE, argument: n};

        case '\t':
          // [Tab] [Tab]
          throw new Error('Unexpected operand in Stack Manipulation: [Tab] [Tab]');

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\n': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [LF] [Space]
          return {instruction: Instructions.DUPL};

        case '\n':
          // [LF] [LF]
          return {instruction: Instructions.DISC};

        case '\t':
          // [LF] [Tab]
          return {instruction: Instructions.SWP};

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      default:
        throw new Error('Unexpected Error while parsing instructions');
      }
    },

    // Arithmetic (IMP: [Tab] [Space])
    [Instructions.IMP_ARITHM]: () => {
      let c = getNextChar();

      switch (c) {
      case ' ': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Space] [Space]
          return {instruction: Instructions.ADD};

        case '\t':
          // [Space] [Tab]
          return {instruction: Instructions.SUB};

        case '\n':
          // [Space] [LF]
          return {instruction: Instructions.MUL};

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }


      case '\t': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Tab] [Space]
          return {instruction: Instructions.DIV};

        case '\t':
          // [Tab] [Tab]
          return {instruction: Instructions.MOD};

        case '\n':
          // [Tab] [LF]
          throw new Error('Unexpected operand in Arithmetic: [Tab] [LF]');

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\n':
        // [LF]
        throw new Error('Unexpected operand in Arithmetic: [LF]');

      default:
        throw new Error('Unexpected Error while parsing instructions');
      }
    },

    // Heap Access (IMP: [Tab] [Tab])
    [Instructions.IMP_HEAP]: () => {
      const c = getNextChar();

      switch (c) {
      case ' ':
        // [Space]
        return {instruction: Instructions.STORE};

      case '\t':
        // [Tab]
        return {instruction: Instructions.GET};

      case '\n':
        throw new Error('Unexpected operand in Heap Access: [LF]');

      default:
        throw new Error('Unexpected Error while parsing instructions');
      }
    },

    // I/O (IMP: [Tab] [LF])
    [Instructions.IMP_IO]: function io() {
      let c = getNextChar();
      switch (c) {
      case ' ': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Space] [Space]
          return {instruction: Instructions.OUTC};

        case '\t':
          // [Space] [Tab]
          return {instruction: Instructions.OUTN};

        case '\n':
          // [Space] [LF]
          throw new Error('Unexpected operand in I/O:  [Space] [LF]');

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\t': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Tab] [Space]
          return {instruction: Instructions.INPC};

        case '\t':
          // [Tab] [Tab]
          return {instruction: Instructions.INPN};

        case '\n':
          // [Tab] [LF]
          throw new Error('Unexpected operand in I/O: [Tab] [LF]');

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\n':
        // [LF]
        throw new Error('Unexpected operand in i/o: [LF]');

      default:
        throw new Error('Unexpected Error while parsing instructions');
      }
    },

    // Flow Cotnrol (IMP: [LF])
    [Instructions.IMP_FLOW]: () => {
      let c = getNextChar();
      let n = undefined;
      switch (c) {
      case ' ': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ':
          // [Space] [Space]
          n = getLabel();
          return {instruction: Instructions.LABEL, argument: n};

        case '\t':
          // [Space] [Tab]
          n = getLabel();
          return {instruction: Instructions.CALL, argument: n};

        case '\n':
          // [Space] [LF]
          n = getLabel();
          return {instruction: Instructions.JMP, argument: n};

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\t': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case ' ': // eslint-disable-line no-fallthrough
          // [Tab] [Space]
          n = getLabel();
          return {instruction: Instructions.JEZ, argument: n};

        case '\t':
          // [Tab] [Tab]
          n = getLabel();
          return {instruction: Instructions.JLZ, argument: n};

        case '\n':
          // [Tab] [LF]
          return {instruction: Instructions.RET};

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      case '\n': // eslint-disable-line no-fallthrough
        c = getNextChar();
        switch (c) {
        case '\n':
          // [LF] [LF]
          return {instruction: Instructions.EXIT};

        case ' ':
          // [LF] [Space]
          throw new Error('Unexpected operand in Flow Control: [LF] [Space]');

        case '\t':
          // [LF] [Tab]
          throw new Error('Unexpected operand in Flow Control: [LF] [Tab]');

        default:
          throw new Error('Unexpected Error while parsing instructions');
        }

      default:
        throw new Error('Unexpected Error while parsing instructions');
      }
    },
  };

  // Main loop that consumes the code and returns array with parsed assembly like code
  // It also creates labels, so we can jump to them while interpreting
  while (charCounter < code.length) {
    const from = charCounter;
    const imp = getIMP();
    const cmd = commands[imp]();
    const length = charCounter - from - 1;
    instructions.push({imp, ...cmd, meta: {fromCharInCode: from, lengthInCode: length}});
    if (cmd.instruction === Instructions.LABEL) {
      if (labels.hasOwnProperty(cmd.argument)) {
        throw new Error('Non-unique label defined!');
      } else {
        // We'll assign lenght of instructions array to a label, so it points to the next instruction
        labels[cmd.argument] = instructions.length;
      }
    }
  }
  return {instructions, labels};
}
