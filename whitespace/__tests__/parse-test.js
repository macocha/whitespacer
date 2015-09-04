jest.dontMock('../parse.js');
jest.dontMock('../constants/Instructions.js');
import * as Instructions from '../constants/Instructions';

describe('parse', () => {
  const parse = require('../parse');

  it('should raise exception given malformed input', () => {
    expect(() => parse(' ')).toThrow();
  });

  it('parses push instruction with number argument', () => {
    const push1 = '   \t\n';
    const push2 = '  \t\t \n';

    expect(parse(push1).instructions[0].instruction).toBe(Instructions.PUSH);
    expect(parse(push1).instructions[0].argument).toBe(1);
    expect(parse(push2).instructions[0].instruction).toBe(Instructions.PUSH);
    expect(parse(push2).instructions[0].argument).toBe(-2);
  });

  it('ignores comment characters', () => {
    const push = ' what is \tthis\n';

    expect(parse(push).instructions[0].instruction).toBe(Instructions.PUSH);
    expect(parse(push).instructions[0].argument).toBe(1);
  });

  it('throws error when given malformed number argument', () => {
    const badnum = '  \n';

    expect(() => parse(badnum)).toThrow();
  });

  it('parses jump instruction with label argument', () => {
    const jmp1 = '\n \n   \n';
    const jmp2 = '\n \n \t \n';
    const jmp3 = '\n \n\n';

    expect(parse(jmp1).instructions[0].instruction).toBe(Instructions.JMP);
    expect(parse(jmp1).instructions[0].argument).toBe('   ');
    expect(parse(jmp2).instructions[0].instruction).toBe(Instructions.JMP);
    expect(parse(jmp2).instructions[0].argument).toBe(' \t ');
    expect(parse(jmp3).instructions[0].instruction).toBe(Instructions.JMP);
    expect(parse(jmp3).instructions[0].argument).toBe('');
  });

  it('creates labels, even empty one', () => {
    const lab1 = '\n   \n\n\n\n';
    const lab2 = '\n\n\n\n   \t \n\n\n\n';
    const lab3 = '\n\n\n\n  \n\n\n\n';

    expect(parse(lab1).labels[' ']).toBe(1);
    expect(parse(lab2).labels[' \t ']).toBe(2);
    expect(parse(lab3).labels['']).toBe(2);
  });

  it('should throw when there are duplicate labels', () => {
    const lab = '\n\n\n\n   \t \n\n\n\n';

    expect(() => parse(lab + lab)).toThrow();
  });
});
