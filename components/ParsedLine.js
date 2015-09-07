import React from 'react';

const style = {
  backgroundColor: 'mintcream',
  display: 'flex',
  height: '20px',
};

export default class ParsedLine extends React.Component {
  static propTypes = {
    imp: React.PropTypes.string.isRequired,
    instruction: React.PropTypes.string.isRequired,
    argument: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    instructionNum: React.PropTypes.number,
    meta: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {style}>
        <span style={{flex: 0.1}}>{this.props.instructionNum}</span>
        <span style={{flex: 0.3, fontWeight: 'bolder'}}>{this.props.instruction}</span>
        <span style={{flex: 0.6}}>{this.props.argument ? String(this.props.argument).replace(/ /g, 's').replace(/\t/g, 't') : null}</span>
      </div>
    );
  }
}
