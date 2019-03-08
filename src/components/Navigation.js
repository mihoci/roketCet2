import React, { Component } from 'react'
import img from '../menu.png'

export default class Navigation extends Component {
	render() {
		return (
			<div>
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
			</div>
		)
	}
}
