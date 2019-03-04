import React, { Component } from 'react'
import Login from './components/Login'
import Display from './components/Display'
import Messages from './components/Messages'

class App extends Component {
<<<<<<< HEAD
	constructor() {
		super()
		this.state = {
			user: '',
			users: [],
			messages: [],
		}
	}

	connect() {
		console.log('connected')
	}

	onMessage(msg) {
		const data = JSON.parse(msg.data)

		//check type of message
		if (Array.isArray(data)) {
			const arr = data.map(msg => {
				return JSON.parse(msg)
			})
			this.setState({ messages: arr })

		} else if (data.users) {
			console.log(data.users);

		} else if (data.err === 'user exists') {
			alert('User with that name already exists')
			this.setState({ user: '' })

		} else {
			let msgs = this.state.messages
			msgs.unshift(data)
			this.setState({ messages: msgs })
		}
	}

	setUser(user) {
		this.setState({ user: user })
		//wss://roket-cet2-server.herokuapp.com
		this.socket = new WebSocket('ws://localhost:5001')
		this.socket.onopen = this.connect.bind(this)
		this.socket.onmessage = this.onMessage.bind(this)

	}

	componentDidMount() {
		this.setUser('user')

	}

	handleSubmit(msg) {
		this.socket.send(JSON.stringify(msg))
	}

	render() {
		return (
			<div>

				<Display if={this.state.user !== ''}>
					<Messages messages={this.state.messages} user={this.state.user} handleSubmit={this.handleSubmit.bind(this)} />
				</Display>
				<Display if={this.state.user === ''}>
					<Login setUser={this.setUser.bind(this)} />
				</Display>
			</div>


		);
	}
=======
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
>>>>>>> 80c608a34f06bfbfcf5fcbda0777f26fca03286e
}

export default App;