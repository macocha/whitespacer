jest.dontMock('../Whitespace.js');
jest.dontMock('../constants/Instructions.js');

import * as Instructions from '../constants/Instructions';
const instructionExecutors = require('../Whitespace').instructionExecutors;

describe('instructionExecutors', () => {
  it('should have handlers for all Stack Manipulation instructions', () => {
    expect(instructionExecutors.hasOwnProperty(Instructions.PUSH)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.DUPL)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.DISC)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.COPY)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.SLIDE)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.SWP)).toBe(true);
  });

  it('should have handlers for all Arithmetic instructions', () => {
    expect(instructionExecutors.hasOwnProperty(Instructions.ADD)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.SUB)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.MUL)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.DIV)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.MOD)).toBe(true);
  });

  it('should have handlers for all Heap Access instructions', () => {
    expect(instructionExecutors.hasOwnProperty(Instructions.STORE)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.GET)).toBe(true);
  });

  it('should have handlers for all I/O instructions', () => {
    expect(instructionExecutors.hasOwnProperty(Instructions.OUTC)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.OUTN)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.INPC)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.INPN)).toBe(true);
  });

  it('should have handlers for all Flow Control instructions', () => {
    expect(instructionExecutors.hasOwnProperty(Instructions.LABEL)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.CALL)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.JMP)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.JEZ)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.JLZ)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.RET)).toBe(true);
    expect(instructionExecutors.hasOwnProperty(Instructions.EXIT)).toBe(true);
  });
});

describe('Stack Manipulation', () => {
  const push = instructionExecutors[Instructions.PUSH];
  const dupl = instructionExecutors[Instructions.DUPL];
  const disc = instructionExecutors[Instructions.DISC];
  const copy = instructionExecutors[Instructions.COPY];
  const slide = instructionExecutors[Instructions.SLIDE];
  const swp = instructionExecutors[Instructions.SWP];
  const emptyState = {stack: [], programCounter: 0};

  it('should push items onto stack', () => {
    expect(push(emptyState, 1).stack).toEqual([1]);
    expect(push(push(emptyState, 1), 2).stack).toEqual([1, 2]);
  });

  it('should duplicate top item on stack and throw error when empty', () => {
    expect(dupl(push(emptyState, 1)).stack).toEqual([1, 1]);
    expect(dupl(push(push(emptyState, 1), 2)).stack).toEqual([1, 2, 2]);

    expect(() => dupl(emptyState)).toThrow();
  });

  it('should discard top item from stack and throw error when given empty one', () => {
    expect(disc(push(emptyState, 1)).stack).toEqual([]);
    expect(disc(push(push(emptyState, 1), 2)).stack).toEqual([1]);

    expect(() => disc(emptyState)).toThrow();
  });

  it('should copy nth item from the stack, and error out on out of bounds', () => {
    expect(copy({stack: [1, 2, 3]}, 2).stack).toEqual([1, 2, 3, 1]);
    expect(copy({stack: [1, 2, 3]}, 1).stack).toEqual([1, 2, 3, 2]);

    expect(() => copy({stack: [1, 2, 3]}, 3)).toThrow();
    expect(() => copy({stack: [1, 2, 3]}, 4)).toThrow();
    expect(() => copy({stack: [1, 2, 3]}, -1)).toThrow();
  });

  it('should slide nth item from the stack, and leave only top on out of bounds', () => {
    expect(slide({stack: [1, 2, 3, 4, 5]}, 0).stack).toEqual([1, 2, 3, 4, 5]);
    expect(slide({stack: [1, 2, 3, 4, 5]}, 1).stack).toEqual([1, 2, 3, 5]);
    expect(slide({stack: [1, 2, 3, 4, 5]}, 2).stack).toEqual([1, 2, 5]);

    expect(slide({stack: [1, 2, 3, 4, 5]}, 10).stack).toEqual([5]);
    expect(slide({stack: [1, 2, 3, 4, 5]}, -2).stack).toEqual([5]);
  });

  it('should swap top two entries on stack and error on stacks shorter than 2', () => {
    expect(swp({stack: [1, 2, 3, 4, 5]}).stack).toEqual([1, 2, 3, 5, 4]);

    expect(() => swp(emptyState, -1)).toThrow();
    expect(() => swp({stack: [1]}, -1)).toThrow();
  });

  describe('Arithmetic', () => {
    const add = instructionExecutors[Instructions.ADD];
    const sub = instructionExecutors[Instructions.SUB];
    const mul = instructionExecutors[Instructions.MUL];
    const div = instructionExecutors[Instructions.DIV];
    const mod = instructionExecutors[Instructions.MOD];

    it('should add top two entries and error when not enough parameters on stack', () => {
      expect(add({stack: [1, 2, 3, 4, 5]}).stack).toEqual([1, 2, 3, 9]);
      expect(add({stack: [1, 2, 3, 4, -5]}).stack).toEqual([1, 2, 3, -1]);

      expect(() => add({stack: []})).toThrow();
      expect(() => add({stack: [1]})).toThrow();
    });

    it('should subtract top two entries and error when not enough parameters on stack', () => {
      expect(sub({stack: [1, 2, 3, 4, 5]}).stack).toEqual([1, 2, 3, -1]);
      expect(sub({stack: [1, 2, 3, 4, -5]}).stack).toEqual([1, 2, 3, 9]);

      expect(() => sub({stack: []})).toThrow();
      expect(() => sub({stack: [1]})).toThrow();
    });

    it('should multiply top two entries and error when not enough parameters on stack', () => {
      expect(mul({stack: [1, 2, 3, 4, 5]}).stack).toEqual([1, 2, 3, 20]);
      expect(mul({stack: [1, 2, 3, 4, -5]}).stack).toEqual([1, 2, 3, -20]);

      expect(() => mul({stack: []})).toThrow();
      expect(() => mul({stack: [1]})).toThrow();
    });

    it('should integer divide top two entries and error when not enough parameters on stack or div by 0', () => {
      expect(div({stack: [1, 2, 3, 9, 5]}).stack).toEqual([1, 2, 3, 1]);
      expect(div({stack: [1, 2, 3, 11, 5]}).stack).toEqual([1, 2, 3, 2]);
      expect(div({stack: [1, 2, 3, -9, 5]}).stack).toEqual([1, 2, 3, -2]);
      expect(div({stack: [1, 2, 3, -11, 5]}).stack).toEqual([1, 2, 3, -3]);
      expect(div({stack: [1, 2, 3, 0, -5]}).stack).toEqual([1, 2, 3, 0]);


      expect(() => div({stack: []})).toThrow();
      expect(() => div({stack: [1]})).toThrow();
      expect(() => div({stack: [1, 2, 3, 4, 0]})).toThrow();
    });

    it('should modulo top two entries and error when not enough parameters on stack or mod by 0', () => {
      // It's modulo from integer division and it's sign is equal to sign of divisor
      expect(mod({stack: [1, 2, 3, 9, 5]}).stack).toEqual([1, 2, 3, 4]);
      expect(mod({stack: [1, 2, 3, 11, 5]}).stack).toEqual([1, 2, 3, 1]);
      expect(mod({stack: [1, 2, 3, -9, 5]}).stack).toEqual([1, 2, 3, 1]);
      expect(mod({stack: [1, 2, 3, -11, 5]}).stack).toEqual([1, 2, 3, 4]);
      expect(mod({stack: [1, 2, 3, 9, -5]}).stack).toEqual([1, 2, 3, -1]);
      expect(mod({stack: [1, 2, 3, 11, -5]}).stack).toEqual([1, 2, 3, -4]);


      expect(() => mod({stack: []})).toThrow();
      expect(() => mod({stack: [1]})).toThrow();
      expect(() => mod({stack: [1, 2, 3, 4, 0]})).toThrow();
    });
  });

  describe('Heap Access', () => {
    const get = instructionExecutors[Instructions.GET];
    const store = instructionExecutors[Instructions.STORE];

    it('should consume addr and value from stack then save it in heap and error when not enough parameters', () => {
      expect(store({stack: [1, 2, 3, 4, 5], heap: {}}).stack).toEqual([1, 2, 3]);
      expect(store({stack: [1, 2, 3, 4, 5], heap: {}}).heap).toEqual({4: 5});
      expect(store({stack: [1, 2, 3, 4, 5], heap: {4: 123}}).heap).toEqual({4: 5});

      expect(() => store({stack: [], heap: {}})).toThrow();
      expect(() => store({stack: [1], heap: {}})).toThrow();
    });

    it('should consume addr and push value from heap, error on empty stack and wrong address', () => {
      expect(get({stack: [1, 2, 3, 4, 5], heap: {5: 6}}).stack).toEqual([1, 2, 3, 4, 6]);
      expect(get({stack: [1, 2, 3, 4, 5], heap: {3: 2, 5: 6}}).stack).toEqual([1, 2, 3, 4, 6]);
      expect(get({stack: [1, 2, 3, 4, 5], heap: {4: 123, 5: 7}}).heap).toEqual({4: 123, 5: 7});

      expect(() => get({stack: [], heap: {1: 3}})).toThrow();
      expect(() => get({stack: [1, 2, 3], heap: {}})).toThrow();
    });
  });

  describe('I/O', () => {
    const outc = instructionExecutors[Instructions.OUTC];
    const outn = instructionExecutors[Instructions.OUTN];
//    const inpc = instructionExecutors[Instructions.INPC];
//    const inpn = instructionExecutors[Instructions.INPN];
// TODO: Add tests after implementing input functionalities.

    it('output a character given by the top of stack, error out when stack is empty', () => {
      expect(outc({stack: [1, 2, 3, 4, 65], output: ''}).stack).toEqual([1, 2, 3, 4]);
      expect(outc({stack: [1, 2, 3, 4, 10], output: ''}).output).toBe('\n');
      expect(outc({stack: [1, 2, 3, 4, 71], output: 'G'}).output).toBe('GG');

      expect(() => outc({stack: [], output: ''})).toThrow();
    });

    it('output a character given by the top of stack, error out when stack is empty', () => {
      expect(outn({stack: [1, 2, 3, 4, 65], output: ''}).stack).toEqual([1, 2, 3, 4]);
      expect(outn({stack: [1, 2, 3, 4, 10], output: ''}).output).toBe('10');
      expect(outn({stack: [1, 2, 3, 4, 37], output: '13'}).output).toBe('1337');

      expect(() => outn({stack: [], output: ''})).toThrow();
    });
  });

  describe('Flow Control', () => {
    const label = instructionExecutors[Instructions.LABEL];
    const call = instructionExecutors[Instructions.CALL];
    const jmp = instructionExecutors[Instructions.JMP];
    const jez = instructionExecutors[Instructions.JEZ];
    const jlz = instructionExecutors[Instructions.JLZ];
    const ret = instructionExecutors[Instructions.RET];
    const exit = instructionExecutors[Instructions.EXIT];

    it('should essentially no-op on label', () => {
      expect(label({stack: [1, 2, 3, 4, 5], programCounter: 5}).stack).toEqual([1, 2, 3, 4, 5]);
      expect(label({stack: [1, 2, 3, 4, 5], programCounter: 5}).programCounter).toBe(6);
    });

    it('it should call function at label and store address at callstack also throw errors on invalid label', () => {
      expect(call({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4, 5]);
      expect(call({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(13);
      expect(call({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2, 6]);

      expect(() => call({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {' \t  ': 13})).toThrow();
    });

    it('it should jump to label also throw errors on invalid label', () => {
      expect(jmp({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4, 5]);
      expect(jmp({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(13);
      expect(jmp({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(() => jmp({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {' \t  ': 13})).toThrow();
    });

    it('it should jump to label if top of stack is zero also throw errors on invalid label and empty stack', () => {
      expect(jez({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jez({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(6);
      expect(jez({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(jez({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jez({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(13);
      expect(jez({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(jez({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jez({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(6);
      expect(jez({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(() => jez({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {' \t  ': 13})).toThrow();
      expect(() => jez({stack: [], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13})).toThrow();
    });

    it('it should jump to label if top of stack is less than zero also throw errors on invalid label and empty stack', () => {
      expect(jlz({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jlz({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(6);
      expect(jlz({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(jlz({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jlz({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(6);
      expect(jlz({stack: [1, 2, 3, 4, 0], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(jlz({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4]);
      expect(jlz({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(13);
      expect(jlz({stack: [1, 2, 3, 4, -5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);

      expect(() => jlz({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {' \t  ': 13})).toThrow();
      expect(() => jlz({stack: [], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13})).toThrow();
    });

    it('it should exit function and return to the top of callstack', () => {
      expect(ret({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4, 5]);
      expect(ret({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(2);
      expect(ret({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([]);

      expect(() => ret({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: []}, '  \t  ', {' \t  ': 13})).toThrow();
    });

    it('it should exit the program', () => {
      expect(exit({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 5}).stack).toEqual([1, 2, 3, 4, 5]);
      expect(exit({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).programCounter).toBe(Instructions.EXIT);
      expect(exit({stack: [1, 2, 3, 4, 5], programCounter: 5, callStack: [2]}, '  \t  ', {'  \t  ': 13}).callStack).toEqual([2]);
    });
  });
});
