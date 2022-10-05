import React, { useState } from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';

import globalStyles from './assets/styles/style';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import { UserContext } from './contexts/userContext';
import Dashboard from './pages/Dashboard Page/Dashboard';

const App: React.FC = () => {
	const [user, setUser] = useState();
	return (
		<>
			<UserContext.Provider value ={{user, setUser}}>
				<globalStyles.PageContainer>
					<globalStyles.AppContainer>
						<BrowserRouter>
					
							<Routes>
								<Route path = '/' element = {<Dashboard />} />
								<Route path = '/signin' element = {<SignIn />} />
								<Route path = '/signup' element = {<SignUp />} />
							</Routes>
						</BrowserRouter>
					</globalStyles.AppContainer>
				</globalStyles.PageContainer>

			</UserContext.Provider>
		</>
	);
};



export default App;