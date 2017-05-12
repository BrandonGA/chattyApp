import React, {Component} from 'react'
import Message from './Message.jsx';
// import Notification from './Notification.jsx';




      class MessageList extends Component {
        render() {
          return (
        <main className="messages">
          {this.props.messages.map((incomingMessage) => {
        switch (incomingMessage.type) {
          case "Incoming Message":
          return
            <Message key={incomingMessage.id} username={incomingMessage.username} content={incomingMessage.content} />
            break;

          case "Incoming Notification":
          return
            <Notification key={incomingMessage.id} content={incomingMessage.content} />
            break;

          default:
            throw new Error ("Default Message");
        }
      })}
        </main>
      );
      };

  };

export default MessageList;
