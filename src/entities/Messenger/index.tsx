import React, { useEffect, useMemo, useState } from 'react';
import Search from './SearchUsers';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setChatsOfUser, setIsLoggedIn } from 'entities/slices/user/userSlice';
import { getChat, getDialogs } from './api/apiMessenger';
import SmallChat from './SmallChat/SmallChat';
import { io } from "socket.io-client";
import MainChat from './MainChat/MainChat';
import { IPersonalInfo } from 'entities/slices/reduxInterfaces';

export interface IMessage {
    sender: number,
    content: string,
    timestamp: number
}

const socket = io("http://localhost:8080");

const Messenger = () => {

    const chats = useSelector(selectUser).userChats;
    const userData = useSelector(selectUser).personalInfo as IPersonalInfo
    const [chatIds, setChatIds] = useState<number[]>([]);
    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState<number | null>(null)

    const [messages, setMessages] = useState<IMessage[]>([])

    const getChats = async () => {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            const response = await getDialogs(userToken);
            const IDs = response.dialogs.map(dialog => dialog.id)
            setChatIds(IDs)
            const chats = response.dialogs.map(dialog => {
                const companion = dialog.username1 == userData.username ?
                    dialog.username2 : dialog.username1
                const lastMessage = response.lastMessages.find(message => message.dialog_id === dialog.id ? message : null)
                let formattedMessage = 'Последнее сообщение...'
                if (lastMessage) {
                    let sender;
                    let content = lastMessage.content
                    sender = lastMessage.sender === userData.id ? "Вы" : "Собеседник"
                    formattedMessage = `${sender}: ${content}`
                    if(formattedMessage.length > 40){
                        formattedMessage = formattedMessage.slice(0,25)+'...'
                    }
                }
                console.log(formattedMessage)
                return { companion, formattedMessage }
            })
            dispatch(setChatsOfUser(chats))
        } else dispatch(setIsLoggedIn(false))
    }

    useMemo(() => getChats(), [userData?.id, messages]);

    const waitForMessages = (room: number) => {
        socket.on(`message/${room}`, async (payload) => {
            console.log(payload)
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
                <div className="w-2/5 h-full mr-2.5">
                    <h2 className='absolute mt-5 mb-4 ml-4 p-2.5 rounded-xl text-second bg-primary 
                        font-bold dark:text-orange-200 dark:bg-slate-900'>
                        Ваши диалоги:
                    </h2>
                    <div className="mt-20">
                        <Search getChats={getChats} setCurrentChat={setCurrentChat} />
                        {chats.map((chat, index) => (
                            <SmallChat key={index}
                                name={chat.companion}
                                getChats={getChats}
                                formattedMessage={chat.formattedMessage}
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