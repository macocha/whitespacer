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
    parsedInstructions: React.PropTypes.array.isRequired,
    parseError: React.PropTypes.string,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Parsed Code</div>
        {!this.props.parseError ?
          <div style={instructionlistStyle}>
            {this.props.parsedInstructions.map((instruction, index) => {
              return <ParsedLine key={index} {...instruction} instructionNum = {index} />;
            })}
          </div> :
          <div style={{color: 'red'}}>{this.props.parseError}</div>}
      </div>
    );
  }
}
