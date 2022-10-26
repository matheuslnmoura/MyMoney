import React, { useEffect } from 'react';
import { UserType, useUser } from '../../contexts/userContext';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const Dashboard: React.FC = () => {
	const navigate = useNavigate();


	const user: UserType = JSON.parse(localStorage.getItem('user')); 
	if(!user) {
		useEffect(()=>{
			navigate('/signup');
		}, []);
	} else {
		return(
			<>
				<h1>My Very MuchBeautiful dashboard</h1>
				<h2>id: {user.id} </h2>
				<h2>name: {user.name} </h2>
				<h2>email: {user.email} </h2>
				<h2>birthday: {user.birthday} </h2>
				<h2>createdAt: {user.createdAt} </h2>
				<h2>token: {user.token} </h2>
			
			</>
		);
	}
};

export default Dashboard;