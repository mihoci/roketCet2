import React from 'react'
import img from '../618.png'
import Tilt from 'react-tilt'


class Login extends React.Component {
	constructor() {
		super()
		this.state = {
			username: '',
		}
	}

	handleLogin(event) {
		event.preventDefault();
		this.props.setUser(this.state.username)
	}

	render() {
		return (
			<div className="limiter">
				<div className="container-login">
					<div className="wrap-login">
						<div className="row">
							<div className="col-md-6 leftDesign">
								<div className="cadre-login">
									<Tilt className="Tilt" options={{ max: 35 }} style={{ height: 177, }} >
										<p className="naslov-login">ROKET ČET</p>
										<img className="login-img" src={img} alt="login-img" />
										<p className="login-text">TIM SPARTA</p>
									</Tilt>
								</div>
							</div>
							<div className="col-md-6">
								<div className="cadre-login-right">
									<form onSubmit={this.handleLogin.bind(this)}>
										<p className="naslov-login-ime">
											ROKET ČET
									</p>
										<p className="naslov-login-poruka">
											Member Login
									</p>
										<input className="form-control-login" placeholder="Username" type="text" value={this.state.username} onChange={(e) => this.setState({
											username: e.target.value
										})} />
										<span className="focus-input100"></span>
										<div className="container-login100-form-btn">
											<button className="btn-login" type="submit" value="Submit">
												Login
												</button>
										</div>

									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}

export default Login