import React from 'react';
import StackView from '../components/StackView';
import HeapView from '../components/HeapView';
import IOView from '../components/IOView';
import ExecutionInfo from '../components/ExecutionInfo';


const style = {
  backgroundColor: 'navajowhite',
  display: 'flex',
};


export default class ExecutionSection extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    stack: React.PropTypes.array.isRequired,
    heap: React.PropTypes.object.isRequired,
    input: React.PropTypes.string.isRequired,
    output: React.PropTypes.string.isRequired,
    programCounter: React.PropTypes.number.isRequired,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <StackView header = "Stack" stack = {this.props.stack} style = {{flex: '0.3'}}/>
        <HeapView heap = {this.props.heap} style = {{flex: '0.3'}}/>
        <IOView input = {this.props.input} output = {this.props.output} style = {{flex: '0.3'}}/>
        <ExecutionInfo programCounter = {this.props.programCounter} style = {{flex: '0.1'}} />
      </div>
    );
  }
}
