import React, { useEffect, useState } from 'react';
import Search from './SearchUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from 'entities/PersonalInfo/api/personalDataApi';
import { selectUser, setChatsOfUser, setIsLoggedIn, setPersonalInfo } from 'entities/slices/user/userSlice';
import { getChat, getDialogs } from './api/apiMessenger';
import SmallChat from './SmallChat/SmallChat';
import { io } from "socket.io-client";
import MainChat from './MainChat/MainChat';

export interface IMessage {
    sender: number,
    content: string,
    timestamp: number
}

const socket = io("http://localhost:8080");

const Messenger = () => {

    const chats = useSelector(selectUser).userChats;
    const [chatIds, setChatIds] = useState<number[]>([]);
    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState<number | null>(null)

    const [messages, setMessages] = useState<IMessage[]>([])

    const getChats = async () => {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            const userData = await getUserInfo(userToken)
            dispatch(setPersonalInfo(userData))
            const response = await getDialogs(userToken);
            const IDs = response.map(dialog => dialog.id)
            setChatIds(IDs)
            const chats = response.map(dialog => dialog.username1 == userData.username ? dialog.username2 : dialog.username1)
            dispatch(setChatsOfUser(chats))
        } else dispatch(setIsLoggedIn(false))
    }

    useEffect(() => {
        getChats()
    }, [])

    const waitForMessages = (room: number) => {
        socket.on(`message/${room}`, async (payload) => {
            const response = await getChat(room);
            setMessages(response)
        })
    }

    const sendMessageSocket = (content: string, room: number) => {
        socket.emit('sendMessage', content, room)
    }

    const addMessageFront = (sender: number, content: string) => {
        setMessages([...messages, { sender: sender, content: content, timestamp: Math.floor(Date.now() / 1000) }])
    }

    return (
        <div className='container'>
            <div className="flex items-start w-full h-full">
                <div className="w-2/5 h-full mr-2.5 overflow-y-scroll">
                    <h2 className='absolute mt-5 mb-4 ml-4 p-2.5 rounded-xl text-second bg-primary font-bold dark:text-orange-200 dark:bg-slate-900'>
                        Ваши диалоги:
                    </h2>
                    <div className="mt-20">
                        <Search getChats={getChats} setCurrentChat={setCurrentChat} />
                        {chats.map((chat, index) => (
                            <SmallChat key={index}
                                name={chat}
                                getChats={getChats}
                                id={index}
                                idBack={chatIds[index]}
                                setMessages={setMessages}
                                setCurrentChat={setCurrentChat} />
                        ))}
                    </div>
                </div>
                <MainChat addMessageFront={addMessageFront}
                    messages={messages}
                    idBack={chatIds[currentChat as number]}
                    userId={currentChat as number}
                    sendMessageSocket={sendMessageSocket}
                    waitForMessages={waitForMessages} />
            </div>
        </div>
    );
};

export default Messenger;