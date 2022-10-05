import * as React from 'react';

export type UserType = {
		id: number,
		email: string,
		name: string,
		birthday: string,
		createdAt: string,
		token: string
}

export type UserContextType = {
	user: UserType | null,
	setUser: React.Dispatch<React.SetStateAction<UserType>>

}


export const UserContext = React.createContext<UserContextType | null > (null);



export const useUser = () => React.useContext(UserContext);