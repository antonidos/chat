import { createSlice } from "@reduxjs/toolkit";
import { IRootState, IUserState } from "./userInterfaces";



const initialState: IUserState = {
    isLoggedIn: false,
    userToken: null,
    personalInfo: {
        name: "Антон",
        email: "blabla@mail.ru"
    },
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

export const selectUser = (state:IRootState) => state.user;

export default userSlice.reducer