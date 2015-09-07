import React from 'react';

const style = {
  backgroundColor: 'powderblue',
  display: 'flex',
  flexDirection: 'column',
};

const entriesStyle = {
  flex: '1',
  overflowY: 'scroll',
};

export default class HeapView extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    heap: React.PropTypes.object.isRequired,
    header: React.PropTypes.string,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Heap</div>
        <div style={entriesStyle}>
          {Object.keys(this.props.heap).map((value, index) => {
            return <div style = {{backgroundColor: 'navajowhite'}} key={index}>{value + ': ' + this.props.heap[value]}</div>;
          })}
        </div>
      </div>
    );
  }
}
