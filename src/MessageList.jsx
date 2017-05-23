import React, {Component} from 'react'
import Message from './Message.jsx';
// import Notification from './Notification.jsx';




      class MessageList extends Component {
        render() {

          var messageOutput;
          var outputNotifications = [];
          if (this.props.messages.length != 0) {
            messageOutput = this.props.messages.map(incomingMessage => {
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
            })
          } else {
            messageOutput = <div className="message"><span>No Messages</span></div>
          }

      return (
        <main className="messages">
          {console.log("Rendering <Message/>")}
          {messageOutput}
        </main>
      );
      }

  }

export default MessageList;
