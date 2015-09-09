import React from 'react';
import { connect } from 'react-redux';
import { codeParse, codeSave, executeStep, executeRun, executeStop, executeReset } from '../actions/WhitespaceDevActions';

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

class App extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    code: React.PropTypes.string.isRequired,
    parsedInstructions: React.PropTypes.array.isRequired,
    VMState: React.PropTypes.object.isRequired,
    parseError: React.PropTypes.string,
    runtimeError: React.PropTypes.string,
    isRunning: React.PropTypes.bool,
  }

  render() {
    return (
      <div style={style}>
        <HeaderBar style = {{flex: '0 0 40px'}}
          step = {() => this.props.dispatch(executeStep())}
          run = {() => this.props.dispatch(executeRun())}
          stop = {() => this.props.dispatch(executeStop())}
          reset = {() => this.props.dispatch(executeReset())}
          isRunning = {this.props.isRunning}
          />
        <CodeSection style = {{flex: '.5'}}
          code = {this.props.code}
          parsedInstructions = {this.props.parsedInstructions}
          parseError = {this.props.parseError}
          save = {(c) => this.props.dispatch(codeSave(c))}
          parse = {() => this.props.dispatch(codeParse())}
          programCounter =  {this.props.VMState.programCounter}
        />
        <ExecutionSection style = {{flex: '.5'}}
          {...this.props.VMState}
          runtimeError = {this.props.runtimeError}
        />
      </div>
    );
  }
}

export default connect((s) => {return {...s, isRunning: s.runInterval !== null}; })(App);
