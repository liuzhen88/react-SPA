import React from 'react';
import {createHashHistory} from 'history';

const history = createHashHistory();

let Login = React.createClass({
	handleLogin(){
		localStorage.setItem('tenant','swgl');
		history.push('/');
		history.replace('/dayTable');
	},
	render(){
		return (
			<div>
				<div>
					<label>用户名:</label>
					<input type='text'/>
				</div>
				<div>
					<label>密码:</label>
					<input type='text'/>
				</div>
				<button onClick={this.handleLogin}>登录</button>
			</div>
		)
	}
});

export default Login;