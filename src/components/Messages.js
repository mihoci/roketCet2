import React from 'react'

class Messages extends React.Component{

    formatMessages(messages){
        const list = messages.map((message, i) => {
            return <p key={i}>{message.user} - {message.message}</p>
        })
        return list
    }

    render(){
        console.log(this.props.messages)
        return(
            <div>
                <h2>Messages</h2>
                <div className="messages">
                    {this.formatMessages(this.props.messages)}
                </div>
            </div>
        )
    }
}

export default Messages