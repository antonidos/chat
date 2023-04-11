import { Selector, createSlice } from "@reduxjs/toolkit";

interface IPersonalInfo {
    age?: number,
    phone?: string,
    name: string,
    email: "string"
}

interface IUserState {
    isLoggedIn: boolean,
	userToken: string,
	personalInfo: IPersonalInfo | null,
	userChats: string[]    
}

const initialState: IUserState = {
	isLoggedIn: false,
	userToken: localStorage.getItem('userToken') || "",
	personalInfo: null,
	userChats: []
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
		setUserToken: (state, action) => {
			state.userToken = action.payload;
		},
		setPersonalInfo: (state, action) => {
			state.personalInfo = action.payload;
		},
		addChat: (state, action) => {
			state.userChats = [...state.userChats, action.payload]
		},
		setChatsOfUser: (state, action) => {
			state.userChats = action.payload
		}
	}
})

export const { setIsLoggedIn, setPersonalInfo, addChat, setChatsOfUser, setUserToken } = userSlice.actions;

export const selectUser: Selector = (state) => state.user;

export default userSlice.reducer