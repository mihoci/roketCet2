import React, { Component } from 'react'
import Nats from 'websocket-nats'
import Login from './components/Login'
import Display from './components/Display'
import Messages from './components/Messages'

class App extends Component {
  constructor(){
    super()
    this.state = {
      userid: -1,
      user: '',
    }

  }

  componentDidMount(){
    //wss://roket-cet2-server.herokuapp.com
    this.nats = Nats.connect('ws://localhost:4223');
  }

  setUser(user){
    if(user !== ''){
      this.nats.requestOne('getUser', user, (user) => {
        user = JSON.parse(user)
        console.log(user)
        this.setState({user: user.user, userid: user.id})
        console.log(this.state.user, this.state.userid)
      })

    }

  }


  render() {
    return (
        <div>
          <Display if={this.state.user !== '' && this.state.userid >= 0}>
            <Messages nats={this.nats} user={this.state.user} id={this.state.userid}/>
          </Display>
          <Display if={this.state.user === ''}>
            <Login setUser={this.setUser.bind(this)}/>
          </Display>
        </div>
    );
  }
}

export default App;