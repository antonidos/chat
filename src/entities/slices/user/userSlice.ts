import { createSlice } from "@reduxjs/toolkit";
import { IRootState, IUserState } from "../reduxInterfaces";

const initialState: IUserState = {
    isLoggedIn: false,
    personalInfo: {
        username: "",
        email: "",
        id: null
    },
    userChats: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
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

export const { setIsLoggedIn, setPersonalInfo, addChat, setChatsOfUser } = userSlice.actions;

export const selectUser = (state:IRootState) => state.user;

export default userSlice.reducer