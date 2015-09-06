import React from 'react';
import HeaderBar from './HeaderBar';
import CodeSection from './CodeSection';
import ExecutionSection from './ExecutionSection';

const style = {
  fontFamily: 'sans-serif',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
};

const mockState = {
  source: {
    code: 'Test:   \t\t\n\t\n \t\n\n\n',
    parsed: {
      instructions:
      [ { imp: 'Stack Manipulation',
          instruction: 'PUSH',
          argument: 3,
          meta: {} },
        { imp: 'I/O', instruction: 'OUTN', meta: {} },
        { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
        { imp: 'Stack Manipulation',
            instruction: 'PUSH',
            argument: 3,
            meta: {} },
          { imp: 'I/O', instruction: 'OUTN', meta: {} },
          { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
        { imp: 'Stack Manipulation',
            instruction: 'PUSH',
            argument: 3,
            meta: {} },
          { imp: 'I/O', instruction: 'OUTN', meta: {} },
          { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
          { imp: 'Stack Manipulation',
              instruction: 'PUSH',
              argument: 3,
              meta: {} },
            { imp: 'I/O', instruction: 'OUTN', meta: {} },
            { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
          { imp: 'Stack Manipulation',
              instruction: 'PUSH',
              argument: 3,
              meta: {} },
            { imp: 'I/O', instruction: 'OUTN', meta: {} },
            { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
            { imp: 'Stack Manipulation',
                instruction: 'PUSH',
                argument: 3,
                meta: {} },
              { imp: 'I/O', instruction: 'OUTN', meta: {} },
              { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
            { imp: 'Stack Manipulation',
                instruction: 'PUSH',
                argument: 3,
                meta: {} },
              { imp: 'I/O', instruction: 'OUTN', meta: {} },
              { imp: 'Flow Control', instruction: 'EXIT', meta: {} },
              { imp: 'Stack Manipulation',
                  instruction: 'PUSH',
                  argument: 3,
                  meta: {} },
                { imp: 'I/O', instruction: 'OUTN', meta: {} },
                { imp: 'Flow Control', instruction: 'EXIT', meta: {} }],
      labels: {},
    },
  },
};

export default class App extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <div style={style}>
        <HeaderBar style = {{flex: '0 0 40px'}}/>
        <CodeSection style = {{flex: '.5'}} source = {mockState.source}/>
        <ExecutionSection style = {{flex: '.5'}}/>
      </div>
    );
  }
}
