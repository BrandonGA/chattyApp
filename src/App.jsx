
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'


const appData = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?"
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}

class App extends Component {

  constructor(props) {
   super(props);
   this.state = {

     currentUser: {name: "Brandon"},
     messages: [],
     // messages coming from the server will be stored here as they arrive
   };
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleUserName = this.handleUserName.bind(this);
   this.webSocket = new  WebSocket("ws://localhost:3001");
 }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.webSocket.onmessage = (e) => {
      console.log("incoming message" + e)
      const message = JSON.parse(e.data);
      this.setState({messages: message})
        };
      }


  handleSubmit(username, content) {
    let newMessage = {
      type: "Post Message",
      username: username,
      content: content
    };
    console.log("this is a test:", newMessage);
    this.webSocket.send(JSON.stringify(newMessage))
  };

  handleUserName(newUsername, notification) {
    this.setState({currentUser: newUsername});
        this.webSocket.send(JSON.stringify(notification))
    };

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages= {this.state.messages} />
        <ChatBar handleSubmit={this.handleSubmit} username={this.state.currentUser.name}
        handleUserName={this.handleUserName}/>
    </div>
    );
  }
}
export default App;
