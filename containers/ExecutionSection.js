import React from 'react';

const style = {
  backgroundColor: 'navajowhite',
};

export default class ExecutionSection extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        ExecutionSection
      </div>
    );
  }
}
