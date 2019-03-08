import React from 'react'

export default (props) => {
	const { obj, currentUserLogedIn } = props
	//	let containerClassName = 'messages-style'
	//if (obj.user === currentUserLogedIn) {
	//	containerClassName = 'messages-style current-user'
	//	}

	return (
		<div className="messages-style" >
			<div className="icon-users-messages" style={{ backgroundColor: obj.user === currentUserLogedIn ? '#44c9c2' : '#33c1f7' }}>{obj.user.toUpperCase()[0]}</div>
			<div className="user-name-messages">{obj.user}</div>
			<div className="text-user">{obj.message}</div>

		</div>

	);
}