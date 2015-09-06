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
    argument: React.PropTypes.number,
    instructionNum: React.PropTypes.number,
    meta: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {style}>
        <span style={{flex: 0.1}}>{this.props.instructionNum}</span>
        <span style={{flex: 0.4, fontWeight: 'lighter'}}>{this.props.imp}</span>
        <span style={{flex: 0.3, fontWeight: 'bolder'}}>{this.props.instruction}</span>
        <span style={{flex: 0.2}}>{this.props.argument}</span>
      </div>
    );
  }
}
