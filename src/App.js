import React, { Component } from 'react'
import Login from './components/Login'
import Display from './components/Display'
import Messages from './components/Messages'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: '',
      messages: []
    }
  }

  componentWillMount() {
    this.socket = new WebSocket('ws://roket-cet2-server.herokuapp.com')
    this.socket.onopen = this.connect
    this.socket.onmessage = this.onMessage.bind(this)
  } 

  connect(){
    console.log('connected')
  }

  onMessage(msg){
    const data = JSON.parse(msg.data)
    console.log(data)
    if(Array.isArray(data)){
      this.setState({messages: data})
    }else{
      let msgs = this.state.messages
      msgs.push(data)
      this.setState({messages: msgs})
    }
    console.log(this.state.messages)
  }

  setUser(user){
    this.setState({user: user})
  }

  handleSubmit(e){
    if(e.key === 'Enter' && e.target.value !== ''){
      const msg = {
        user: this.state.user,
        message: e.target.value
      }
      this.socket.send(JSON.stringify(msg))
      e.target.value='';
    }
  }

  render() {
    return (
      <div className="App">
        <h1>RoketČet2</h1>
        <Display if={this.state.user !== ''}>
          <h2>User: {this.state.user}</h2>
          <Messages messages={this.state.messages}/>
          <input 
            type="text" 
            onKeyPress={this.handleSubmit.bind(this)} 
            className="Message" 
            placeholder="Your message here"

          />
          <input type="submit" value="Send" />
        </Display>
        <Display if={this.state.user === ''}>
          <Login setUser={this.setUser.bind(this)}/>
        </Display>
      </div>
    );
  }
}

export default App;