import React from 'react';

const style = {
  backgroundColor: 'cadetblue',
  display: 'flex',
  flexDirection: 'column',
};

const textareaStyle = {
  flex: '1',
  resize: 'none',
  border: 'none',
};

export default class SourceEditor extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    code: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.code || '',
    };
  }

  _handleChange(event) {
    this.setState({value: event.target.value});
  }


  _handleTabs(event) {
    if (event.keyCode === 9) {
      this.setState({value: this.state.value + '\t'});
      event.preventDefault();
    }
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Source code</div>
        <textarea style={textareaStyle} value={this.state.value} onKeyDownCapture = {(e) => this._handleTabs(e)} onChange = {(e) => this._handleChange(e)} />
      </div>
    );
  }
}
