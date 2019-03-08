import React from 'react'
import ReactDOM from 'react-dom';
import StyleMessages from './StyleMessages'
import img from '../menu.png'

class Messages extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			message: '',
			menu: false,
			filteredUser: [],
			searchUser: "",
			searchMessenger: "",
		}
		this.scrollToBot = this.scrollToBot.bind(this)

	}
	messagesEnd = React.createRef()
	componentDidMount() {
		//this.scrollToBot()
		//document.getElementById("messenger").scrollIntoView(false);
		this.rootNode.scrollIntoView(false);
		console.log(this.rootNode)
	}

	componentDidUpdate() {
		//this.scrollToBot()

	}

	sendMessage(e) {
		if (e.key === 'Enter' && e.target.value !== '') {
			const msg = {
				user: this.props.user,
				message: this.state.message
			}
			this.setState({ message: '' })
			this.props.sendMessage(msg)
		}
	}

	handleChange(event) {
		this.setState(prevState => {
			return {
				menu: !prevState.menu
			}
		})
	}


	filterUsers() {
		let filteredUser = this.props.users.filter(
			(row) => row.toLowerCase().includes(this.state.searchUser)
		)
		this.setState({ filteredUser: filteredUser })
	}
	scrollToBot() {
		this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
		console.log(this.messagesEnd)
		//this.chats.scrollIntoView({ behavior: 'smooth' });
		//const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
		//messagesContainer.scrollTop = messagesContainer.scrollHeight;
	}


	render() {

		const { menu, searchUser, searchMessenger, } = this.state;
		console.log(this.props.users)

		let filtrirano = []
		if (this.props.users.length > 0) {
			filtrirano = this.props.users.map((user, i) => {
				if (user.includes(this.state.searchUser)) { return <li key={i} >{user}</li> }
			})
		}


		let filterMessenger = []
		console.log(this.props.messages.length)
		if (this.props.messages.length > 0) {

			filterMessenger = this.props.messages.map((data, i) => {
				if (data.message.includes(searchMessenger)) {
					// return <div>
					// 	<p>{message.user}-{message.message}</p>
					// </div>

					return <StyleMessages key={i} obj={data} currentUserLogedIn={this.props.user} />
				}
			})
		}


		let classesTree = ['col-xs-12', 'col-sm-9', 'col-lg-10 pn']
		classesTree = menu ? [...classesTree, "every-messenger-open"] : [...classesTree, "every-messenger-close"]

		return (
			<div className="wrapper">

				<nav id="sidebar" className={menu ? 'active' : ''}>
					{/* <div className="sidebar-header">
						<h3>Roket Čaht 2</h3>
					</div> */}

					<div className="framework-messenger">
						<div className="icon-users">{this.props.user.toUpperCase()[0]}</div>
						<span className="user-you">{this.props.user}</span>
						<input
							type="search"
							placeholder="Search user"
							className="search-bar-user"
							value={searchUser}
							onChange={(e) => { this.setState({ searchUser: e.target.value }); this.filterUsers() }}
						/>
						<ul className="">
							{filtrirano}
						</ul>
					</div>
				</nav>

				<div id="content" className={menu ? "w-100" : ""}>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<div className="container-fluid">
							<div className="row width-row">
								<div className="col-12 col-sm-6">
									<button type="button" id="sidebarCollapse" className="btn btn-info" onClick={this.handleChange.bind(this)}>
										<i className="fas fa-align-left"></i>
										<span>	<img src={img} alt="login-img" className="menu-img" /></span>
									</button>
								</div>
								<div className="col-12 col-sm-6 ">
									<input
										type="search"
										placeholder="Search messenger"
										className="search-bar-messenger"
										value={searchMessenger}
										onChange={(e) => { this.setState({ searchMessenger: e.target.value }); this.filterUsers() }}
									/>
								</div>
							</div>
						</div>
					</nav>

					<div className="container-fluid messenger-contener">
						<div className="row">
							<div className="col-12">
								<div ref={node => (this.rootNode = node)}
									className="messenger"	>

									{filterMessenger}

								</div>
							</div>
						</div>
					</div>
					<div className="container-fluid messenger-send">
						<div className="row ">
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

		);
	}
}

export default Messages;