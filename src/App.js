import React, { Component } from 'react'
import Login from './components/Login'
import Display from './components/Display'
import Messages from './components/Messages'
import Header from './components/header/Header'
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      user: '',
      users: [],
      message: '',
      messages: [],
    }

  }

  componentDidMount(){
    //wss://roket-cet2-server.herokuapp.com
    this.socket = new WebSocket('ws://localhost:5001')
    this.socket.onmessage = this.onMessage.bind(this)

  }

  onMessage(msg){
    const data = JSON.parse(msg.data)
    console.log(data)

    //check type of message
    if(Array.isArray(data) && data[0].message){
      //chat messages
      this.setState({messages: data})

    }else if(Array.isArray(data)){
      //array of users
      this.setState({users: data})

    }else{
      //chat message
      let msgs = this.state.messages
      msgs.unshift(data)
      this.setState({messages: msgs})
    }

  }

  setUser(user){
    this.setState({user: user})
    if(user !== ''){
      this.socket.send(JSON.stringify({setUser: user}))
    }

  }

  sendMessage(msg){
    this.socket.send(JSON.stringify(msg))

  }

  render() {
    return (
      <div>
        <Header user={this.state.user} setUser={this.setUser.bind(this)}/>
        <div className="App">
          <Display if={this.state.user !== ''}>
            <Messages messages={this.state.messages} user={this.state.user} sendMessage={this.sendMessage.bind(this)}/>
          </Display>
          <Display if={this.state.user === ''}>
            <Login setUser={this.setUser.bind(this)}/>
          </Display>
        </div>
      </div>
    );
  }
}

export default App;