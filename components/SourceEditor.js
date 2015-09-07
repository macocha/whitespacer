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
    save: React.PropTypes.func.isRequired,
    parse: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  _handleChange(event) {
    this.props.save(event.target.value);
    this.props.parse();
  }


  _handleTabs(event) {
    if (event.keyCode === 9) {
      const val = event.target.value;
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      event.target.value = val.substring(0, start) + '\t' + val.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;

      this.props.save(event.target.value);
      this.props.parse();
      event.preventDefault();
    }
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>Source code</div>
        <textarea style={textareaStyle} value={this.props.code} onKeyDown = {(e) => this._handleTabs(e)} onChange = {(e) => this._handleChange(e)} />
      </div>
    );
  }
}
