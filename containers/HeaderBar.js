import React from 'react';

const style = {
  backgroundColor: 'antiquewhite',
};

export default class HeaderBar extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
  }

  render() {
    return (
      <div style = {{...this.props.style, ...style}}>
        HeaderBar
      </div>
    );
  }
}
