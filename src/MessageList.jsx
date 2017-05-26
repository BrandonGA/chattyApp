import React, {Component} from 'react'
import Message from './Message.jsx';
import Notification from './Notification.jsx';


      class MessageList extends Component {


        render() {

          var messageOutput = []
          var outputNotifications = [];
          if (this.props.messages.length != 0) {
            console.log('typeof: ', this.props.messages)
            messageOutput = this.props.messages.map(incomingMessage => {
              console.log('you', typeof incomingMessage.id)
              switch (incomingMessage.type) {
                case "Incoming Message":
                return <Message key={incomingMessage.id} {...incomingMessage} />

                  break;
                case "Incoming Notification":
                return (
                  <Notification key={incomingMessage.id} content={incomingMessage.content} />
                );
                  break;

                default:
                  throw new Error ("Default Message");
              }
              console.log('')
            })
          } else {
            messageOutput = <div className="message"><span>No Messages</span></div>
          }

      return (
        <main className="messages">
          {messageOutput}
        </main>
      );
      }

  }

export default MessageList;
