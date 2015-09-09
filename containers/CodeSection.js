import React from 'react';

import SourceEditor from '../components/SourceEditor.js';
import ParsedEditor from '../components/ParsedEditor.js';

const style = {
  backgroundColor: 'cadetblue',
  display: 'flex',
};

export default class CodeSection extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    code: React.PropTypes.string.isRequired,
    parsedInstructions: React.PropTypes.array.isRequired,
    parseError: React.PropTypes.string,
    save: React.PropTypes.func.isRequired,
    parse: React.PropTypes.func.isRequired,
    programCounter: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
  }

  componentDidMount() {
    this.props.parse();
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <SourceEditor style = {{flex: 0.5}}
          code = {this.props.code}
          save = {this.props.save}
          parse = {this.props.parse}
        />
        <ParsedEditor style = {{flex: 0.5}}
          parsedInstructions = {this.props.parsedInstructions}
          parseError = {this.props.parseError}
          programCounter = {this.props.programCounter}
        />
      </div>
    );
  }
}
