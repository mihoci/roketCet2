import React from 'react'

class Messages extends React.Component{
    constructor(){
        super();
        this.state = {
            message: ''
        }
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
            this.props.sendMessage(msg);
          }
    }

    render(){
        return(
            <div>
                <h2>Messages</h2>
                <h2>User: {this.props.user}</h2>
                <div className="messages">
                    {this.formatMessages(this.props.messages)}
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