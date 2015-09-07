import React from 'react';

const style = {
  backgroundColor: 'aliceblue',
  display: 'flex',
  flexDirection: 'column',
};

export default class IOView extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    programCounter: React.PropTypes.number.isRequired,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Various info</div>
        <div style = {{flex: '0 0 40px'}}>Program counter: {this.props.programCounter}</div>
      </div>
    );
  }
}
