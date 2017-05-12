import React, {Component} from 'react'

class Notification extends Component {
  render() {
    return (
      <div className="message" key={this.props.id}>
        <span className="message-username"> {this.props.content}</span>
      </div>
    );
  }
}

export default Notification
