import React from 'react';

const style = {
  backgroundColor: 'antiquewhite',
  display: 'flex',
  justifyContent: 'sapce-around',
};

export default class HeaderBar extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    step: React.PropTypes.func.isRequired,
    run: React.PropTypes.func.isRequired,
    stop: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    isRunning: React.PropTypes.bool,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style={{'flex': '1'}}>whitespace devstudio</div>
        <div style={{'flex': '1'}}>
          <button onClick = {this.props.step}>Step</button>
          {!this.props.isRunning ? <button onClick = {this.props.run}>Run</button> : <button onClick = {this.props.stop}>Stop</button> }
          <button onClick = {this.props.reset}>Reset VM</button>
        </div>
      </div>
    );
  }
}
