import React from 'react'
import img from '../menu.png'


class Messages extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.state = {
			message: '',
			menu: false,
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

	handleChange(event) {
		// const { menu } = this.state
		// let getSiberbar = document.querySelector(".vh-60");
		// let getMessenger = document.querySelector(".framework-messenger")
		// let getEveryMessage = document.querySelector(".pn")
		this.setState(prevState => {
			return {
				menu: !prevState.menu
			}
		})
		// if (menu === false) {
		// 	// getSiberbar.style.height = "100vh !important";
		// 	// getMessenger.style.display = "block";
		// 	// getEveryMessage.style.display = "none";
		// 	this.setState(prevState => {
		// 		return {
		// 			menu: !prevState.menu
		// 		}
		// 	})
		// } else {
		// 	// getSiberbar.style.height = "60px !important";
		// 	// getMessenger.style.display = "none";
		// 	// getEveryMessage.style.display = "block";
		// 	this.setState(prevState => {
		// 		return {
		// 			menu: !prevState.menu



	}
	render() {
		console.log(this.props.users)


		const { menu } = this.state;

		let classes = ["framework-messenger"]
		classes = menu ? [...classes, "messenger-open"] : [...classes, "messenger-close"]

		let classesTwo = ['col-xs-12', 'col-sm-3', 'col-lg-2', 'background-left', 'vh-100']
		classesTwo = menu ? [...classesTwo, "height-open"] : [...classesTwo, "height-close"]


		let classesTree = ['col-xs-12', 'col-sm-9', 'col-lg-10 pn']
		classesTree = menu ? [...classesTree, "every-messenger-open"] : [...classesTree, "every-messenger-close"]

		return (

			<div className="container-fluid">
				<div className="row">
					<div className={classesTwo.join(" ")}>
						<div className="btn-toggle-nav" onClick={this.handleChange} ></div>
						<div className={classes.join(" ")}>
							<div className="icon-users">M</div>
							<span className="user-you">{this.props.user}</span>
							<input type="search" placeholder="Search user" className="search-bar-user" />
							<ul className="">
								<li className="p-2">pmihoci</li>
								<li className="p-2">pmihoci</li>
								<li className="p-2">pmihoci</li>
							</ul>
						</div>
					</div>
					<div className={classesTree.join(" ")}>
						<div className="container-fluid">

							<div className="row">
								<div className="col-12">
									<div className="header-messenger">
										<div className="row">
											<div className="col-sm-6 ">
												<p className="name-tria">TRIA</p>
											</div>
											<div className="col-sm-6 ">
												<input type="search" placeholder="Search messenger" className="search-bar-messenger" />
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="messenger ">
										{this.formatMessages(this.props.messages)}
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12	postion-bottom">
									<div className="messenger-bottom">
										<input
											type="text"
											onKeyPress={this.sendMessage.bind(this)}
											className="message"
											placeholder="Type a message"
											value={this.state.message}
											onChange={(e) => this.setState({ message: e.target.value })}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Messages	