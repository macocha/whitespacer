import React from 'react';
import ParsedLine from './ParsedLine';

const style = {
  backgroundColor: 'goldenrod',
  display: 'flex',
  flexDirection: 'column',
};

const instructionlistStyle = {
  flex: '1',
  overflowY: 'scroll',
};

export default class ParsedEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    instructions: React.PropTypes.array.isRequired,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Parsed Code</div>
        <div style={instructionlistStyle}>
          {this.props.instructions.map((instruction, index) => {
            return <ParsedLine key={index} {...instruction} instructionNum = {index} />;
          })
          }
        </div>
      </div>
    );
  }
}
