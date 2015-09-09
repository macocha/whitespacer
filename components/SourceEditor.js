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
    this.state = {
      unbleach: false,
    };
  }

  _handleChange(event) {
    this.props.save(this._bleach(event.target.value));
    this.props.parse();
  }

  _handleTabs(event) {
    if (event.keyCode === 9) {
      const val = event.target.value;
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      event.target.value = val.substring(0, start) + '\t' + val.substring(end);
      event.target.selectionStart = event.target.selectionEnd = start + 1;

      this.props.save(this._bleach(event.target.value));
      this.props.parse();
      event.preventDefault();
    }
  }

  _unbleach(code) {
    return code.replace(/ /g, '[Space]').replace(/\n/g, '[LF]').replace(/\t/g, '[Tab]');
  }

  _bleach(code) {
    return code.replace(/\[Space\]/g, ' ').replace(/\[LF\]/g, '\n').replace(/\[Tab\]/g, '\t').replace(/\[Space|\[LF|\[Tab/g, '');
  }

  _bleachChange(e) {
    this.setState({
      unbleach: e.target.checked,
    });
  }


  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        <div style = {{flex: '0 0 40px'}}>
          Source code
          <label><input type="checkbox" checked = {this.state.unbleach} onChange={(e) => this._bleachChange(e)} /> Unbleach code</label>
        </div>
        <textarea style={textareaStyle}
          value={this.state.unbleach ? this._unbleach(this.props.code) : this.props.code}
          onKeyDown = {(e) => this._handleTabs(e)}
          onChange = {(e) => this._handleChange(e)}
        />
      </div>
    );
  }
}
