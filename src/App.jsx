
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'


const appData = {
  currentUser: {name: "Anonymous"},
}

class App extends Component {

  constructor(props) {
   super(props);
   this.state = {

     currentUser: appData.currentUser,
     messages: [],
     // messages coming from the server will be stored here as they arrive
     connectionsCount: 0
   };
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleUserName = this.handleUserName.bind(this);
   this.webSocket = new  WebSocket("ws://localhost:3001");
 }

  componentDidMount() {
    this.webSocket.onopen = () => {
    console.log("componentDidMount <App />");
    this.webSocket.onmessage = (e) => {
      console.log("incoming message" + e)
      const message = JSON.parse(e.data);


        switch(message.type) {
         case "incomingCounter":
           this.setState({connectionsCount: message.count});
           break;
         default:
           const messages = this.state.messages.concat(message);
           this.setState({messages: messages});
          }
        };
      }
    }


  handleSubmit(content) {
    let newMessage = {
      type: "Post Message",
      username: this.state.currentUser.name,
      content: content
    };
    console.log("this is a test:", newMessage);
    this.webSocket.send(JSON.stringify(newMessage))
  };

  handleUserName(newUsername, notification) {
    this.state.currentUser.name = newUsername;
        this.webSocket.send(JSON.stringify(notification))
    };

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="navbar-counter"> Number of Users: {this.state.connectionsCount}</span>
      </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar handleSubmit={this.handleSubmit} username={this.state.currentUser.name}
        handleUserName={this.handleUserName}/>
    </div>
    );
  }
}
export default App;
