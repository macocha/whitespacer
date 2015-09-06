import React from 'react';

const style = {
  backgroundColor: 'red',
};

export default class SourceEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        Source Editor
      </div>
    );
  }
}
