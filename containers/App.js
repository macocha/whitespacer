import React from 'react';
import { connect } from 'react-redux';
import { codeParse, codeSave } from '../actions/WhitespaceDevActions';

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
    parseError: React.PropTypes.string,
  }

  render() {
    return (
      <div style={style}>
        <HeaderBar style = {{flex: '0 0 40px'}}/>
        <CodeSection style = {{flex: '.5'}}
          code = {this.props.code}
          parsedInstructions = {this.props.parsedInstructions}
          parseError = {this.props.parseError}
          save = {(c) => this.props.dispatch(codeSave(c))}
          parse = {() => this.props.dispatch(codeParse())}
        />
        <ExecutionSection style = {{flex: '.5'}}/>
      </div>
    );
  }
}

export default connect((s) => s)(App);
