import React from 'react';

const style = {
  backgroundColor: 'palevioletred',
  display: 'flex',
  flexDirection: 'column',
};

const fieldsStyle = {
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'paleturquoise',
};

export default class IOView extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    input: React.PropTypes.string.isRequired,
    output: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>I/O</div>
        <div style={fieldsStyle}>
          <div>Input</div>
          <textarea readOnly = {true} value={this.props.input} style = {{flex: '1', resize: 'none'}}></textarea>
        </div>
        <div style={fieldsStyle}>
          <div>Output</div>
          <textarea readOnly = {true} value={this.props.output} style = {{flex: '1', resize: 'none'}}></textarea>
        </div>
      </div>
    );
  }
}
