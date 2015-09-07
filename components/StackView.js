import React from 'react';

const style = {
  backgroundColor: 'oldlace',
  display: 'flex',
  flexDirection: 'column',
};

const entriesStyle = {
  flex: '1',
  overflowY: 'scroll',
};

export default class StackView extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    stack: React.PropTypes.array.isRequired,
    header: React.PropTypes.string,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>{this.props.header}</div>
        <div style={entriesStyle}>
          {this.props.stack.map((value, index) => {
            return <div style = {{backgroundColor: 'snow'}}key={index}>{value}</div>;
          })}
        </div>
      </div>
    );
  }
}
