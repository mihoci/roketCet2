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

  setUser(user){
    this.setState({user: user})
    if(user !== ''){
      this.socket.send(JSON.stringify({setUser: user}))
    }

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

  handleSubmit(e){
    if((e.key === 'Enter' && e.target.value !== '') || e.target.type === 'submit'){
      const msg = {
        user: this.state.user,
        message: this.state.message
      }
      this.socket.send(JSON.stringify(msg))
      this.setState({message: ''})
    }

  }

  render() {
    return (
      <div>
        <Header user={this.state.user} setUser={this.setUser.bind(this)}/>
        <div className="App">
          <Display if={this.state.user !== ''}>
            <h2>User: {this.state.user}</h2>
            <Messages messages={this.state.messages}/>
            <input 
              type="text" 
              onKeyPress={this.handleSubmit.bind(this)} 
              className="Message" 
              placeholder="Your message here"
              value={this.state.message}
              onChange={(e)=> this.setState({message: e.target.value})}
            />
            <input type="submit" value="Send" onClick={this.handleSubmit.bind(this)}/>
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