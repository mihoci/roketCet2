import React from 'react'
import img from '../menu.png'

class Messages extends React.Component{
    constructor(){
        super();
        this.state = {
            message: '',
            messages: []
        }
    }

	componentDidMount(){
        this.nats = this.props.nats
		this.nats.requestOne('getMessages', this.getMessages)
        this.nats.subscribe('message', this.getMessage)
        this.nats.subscribe('connectedUsers', this.connectedUsers)
        this.nats.subscribe('report', this.report)
    }
    
    connectedUsers = (users) => {
        console.log(users)
      }
    
    report = () => {
        this.nats.publish('userReport', this.props.user)
    }

    getMessages = (messages) => {
        messages = JSON.parse(messages)
        this.setState({messages: messages})
        console.log(this.state.messages)
    }

	getMessage = (msg) => {
		const data = this.state.messages;
		data.push(JSON.parse(msg))
		this.setState({messages: data})
    }
    

    formatMessages(messages){
        const list = messages.map((message, i) => {
            return <p key={i}>{message.user} - {message.message}</p>
        })
        return list
    }

    handleSubmit(e){
        if((e.key === 'Enter' && e.target.value !== '') || e.target.type === 'submit'){
            const msg = {
              user: this.props.user,
              message: this.state.message
            }
            this.setState({message: ''})
            this.props.nats.publish('message', JSON.stringify(msg))
            this.props.nats.publish('saveMessage', JSON.stringify({message: msg.message, id: this.props.id}))
        }
    }

    render(){
        return(
            <div>
                <h2>Messages</h2>
                <h2>User: {this.props.user}</h2>
                <div className="messages">
                    {this.formatMessages(this.state.messages)}
                </div>
                <input 
                    type="text" 
                    onKeyPress={this.handleSubmit.bind(this)} 
                    className="Message" 
                    placeholder="Your message here"
                    value={this.state.message}
                    onChange={(e)=> this.setState({message: e.target.value})}
                />
                <input type="submit" value="Send" onClick={this.handleSubmit.bind(this)}/>
            </div>
        )
    }
}

export default Messages