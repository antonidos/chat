import React, { useEffect, useMemo, useState } from 'react';
import Search from './SearchUsers/SearchUsers';
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
    const userData = useSelector(selectUser).personalInfo as IPersonalInfo;
    const dispatch = useDispatch();
    const [currentChat, setCurrentChat] = useState<number | null>(null)

    const [messages, setMessages] = useState<IMessage[]>([])

    const getChats = async () => {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            const response = await getDialogs(userToken);
            const chats = response.dialogs.map(dialog => {
                const companion = dialog.username1 == userData.username ?
                    dialog.username2 : dialog.username1
                const id = dialog.id
                const lastMessage = response.lastMessages.find(message => message.dialog_id === dialog.id ? message : null)
                let formattedMessage = 'Последнее сообщение...'
                if (lastMessage) {
                    let sender;
                    let content = lastMessage.content
                    sender = lastMessage.sender === userData.id ? "Вы" : "Собеседник"
                    formattedMessage = `${sender}: ${content}`
                    if (formattedMessage.length > 40) {
                        formattedMessage = formattedMessage.slice(0, 25) + '...'
                    }
                }
                // console.log(formattedMessage)
                return { id, companion, formattedMessage }
            })
            dispatch(setChatsOfUser(chats))
        } else dispatch(setIsLoggedIn(false))
    }

    // useMemo(() => console.log(messages), [messages]);

    useEffect(() => {
        getChats()
    }, []);

    useEffect(() => {
        if (messages?.length) {
            getChats()
        }
    }, [messages]);

    useEffect(() => {
        waitForMessages(chats[currentChat as number]?.id)
        if (messages.length !== 0) {
            const scrollDiv = document.getElementById("current-dialog") as HTMLElement
            scrollDiv.scrollTo(0, scrollDiv.scrollHeight)
        }
    }, [messages]);

    const waitForMessages = (room: number) => {
        socket.on(`message/${room}`, async (payload) => {
            setMessages([...messages, { sender: payload[1], content: payload[0], timestamp: Math.floor(Date.now() / 1000) }])
        })
    }

    const sendMessageSocket = (content: string, room: number) => {
        socket.emit('sendMessage', content, room, userData.id)
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
                                idBack={chats[index]?.id}
                                setMessages={setMessages}
                                setCurrentChat={setCurrentChat} />
                        ))}
                    </div>
                </div>
                <MainChat addMessageFront={addMessageFront}
                    messages={messages}
                    idBack={chats[currentChat as number]?.id}
                    userId={currentChat as number}
                    sendMessageSocket={sendMessageSocket} />
            </div>
        </div>
    );
};

export default Messenger;