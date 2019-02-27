import React from 'react'
import './header.css'

class Header extends React.Component{
    
    render(){
        return(
            <div className="header">
                <div id="left">
                    <p className="left">RoketČet2</p>
                </div>
                <div id="right">
                    <p className="right" onClick={()=>{this.props.setUser('')}}>Log out</p>
                </div>

            </div>
        )
    }
}

export default Header