import React, {Component} from 'react'

class ChatBar extends Component {

constructor (props) {
  super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleUserAction = this.handleUserAction.bind(this);
};


  handleUserChange = (event) => {
    if (event.key == 'Enter') {
      const usernameUpdate = `${this.props.username} changed their name to ${event.target.value}`
      const notification = {
        username: event.target.value,
        content: usernameUpdate,
        type: "Post Notification"
      }
      this.props.handleUserName(event.target.value, notification)
    }
  };

  handleUserAction = (event) => {
    if (event.key == 'Enter'){
      console.log('user entered something!');
      this.props.handleSubmit(this.props.username, event.target.value);
    }
  };


  render() {
    return (
      <footer className="chatbar">
        <input  defaultValue={this.props.username} placeholder="Your Name (Optional)"
        onKeyPress={this.handleUserChange} />
        <input className="chatbar-message"
          value={this.props.content} placeholder="Type a message and hit ENTER" onKeyPress={this.handleUserAction} />
      </footer>
    );
  }
}

export default ChatBar
