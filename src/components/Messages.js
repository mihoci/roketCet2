import React from 'react'

class Messages extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			message: ''
		}
	}

	formatMessages(messages) {
		const list = messages.map((message, i) => {
			return <p key={i}>{message.user} - {message.message}</p>
		})
		return list
	}

	sendMessage(e) {
		if (e.key === 'Enter' && e.target.value !== '') {
			const msg = {
				user: this.props.user,
				message: this.state.message
			}
			this.setState({ message: '' })
			this.props.handleSubmit(msg)
		}

	}

	render() {
		console.log(this.props.user)
		return (
			<div>
				<h2>Messages</h2>
				<div className="messages">
					{this.formatMessages(this.props.messages)}
				</div>
				<input
					type="text"
					onKeyPress={this.sendMessage.bind(this)}
					className="Message"
					placeholder="Your message here"
					value={this.state.message}
					onChange={(e) => this.setState({ message: e.target.value })}
				/>
			</div>
		)
	}
}

export default Messages	