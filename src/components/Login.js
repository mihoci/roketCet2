import React from 'react'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleLogin(event){
        event.preventDefault();
        this.props.setUser(this.state.username)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleLogin.bind(this)}>
                    <label>
                        username: 
                        <input 
                            type="text" 
                            value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                    </label>
                    {/* <br />
                    <label>
                        password:
                        <input 
                            type="password" 
                            value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                    </label> */}
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default Login