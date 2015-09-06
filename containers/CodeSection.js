import React from 'react';

import SourceEditor from '../components/SourceEditor.js';
import ParsedEditor from '../components/ParsedEditor.js';

const style = {
  backgroundColor: 'cadetblue',
  display: 'flex',
};

export default class HeaderBar extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <SourceEditor style = {{flex: 0.5}}/>
        <ParsedEditor style = {{flex: 0.5}}/>
      </div>
    );
  }
}
