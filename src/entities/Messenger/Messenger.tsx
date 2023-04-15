import React, { useEffect, useMemo, useRef, useState } from 'react';
import Search from './SearchUsers/SearchUsers';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setChatsOfUser, setIsLoggedIn } from 'entities/slices/user/userSlice';
import { getChat, getDialogs } from './api/apiMessenger';
import SmallChat from './SmallChat/SmallChat';
import { Socket, io } from "socket.io-client";
import MainChat from './MainChat/MainChat';
import { IChat, IPersonalInfo } from 'entities/slices/reduxInterfaces';
import { ILastMessage } from './api/apiMessengerInterfaces';
import { Theme, ToastTransition, toast } from 'react-toastify';

export interface IMessage {
    sender: string,
    content: string,
    timestamp: number
}

interface IFormatMessage {
    (lastMessage: ILastMessage | undefined): [string, number | undefined]
}

const Messenger = () => {

    const socketRef = useRef<Socket | null>(null);

    const chats = useSelector(selectUser).userChats;
    const userData = useSelector(selectUser).personalInfo as IPersonalInfo;
    const dispatch = useDispatch();
    const [currentIndex, setCurrentChat] = useState<number | null>(null)

    const [messages, setMessages] = useState<IMessage[]>([])

    const formatMessage: IFormatMessage = (lastMessage) => {
        let formattedMessage = 'Последнее сообщение...'
        if (lastMessage) {
            const sender = lastMessage.sender === userData.username ? "Вы" : (lastMessage.sender || "Собеседник")
            formattedMessage = `${sender}: ${lastMessage.content}`
            if (formattedMessage.length > 40) {
                formattedMessage = formattedMessage.slice(0, 25) + '...'
            }
        }
        const timeLastMessage = lastMessage?.timestamp
        return [formattedMessage, timeLastMessage];
    }

    const getChats = async () => {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            const response = await getDialogs(userToken);
            const chats:IChat[] = response.dialogs.map(dialog => {
                const companion = dialog.username1 == userData.username ?
                    dialog.username2 : dialog.username1
                const id = dialog.id
                const lastMessage = response.lastMessages?.find(message => message.dialog_id === dialog.id ? message : null)
                const [formattedMessage, timeLastMessage] = formatMessage(lastMessage)
                
                // console.log(formattedMessage)
                return { id, companion, formattedMessage, timeLastMessage }
            })
            const sortedChats = sortChats(chats)
            dispatch(setChatsOfUser(sortedChats))
        } else dispatch(setIsLoggedIn(false))
    }

    const updateChatList = (room: number, payload: [string, string, number]) => {
        const chatCopy = chats.slice();
        const newMessage = chatCopy.find(chat => chat.id === room);
        let companion: string; 
        const lastMessage: ILastMessage = {
            dialog_id: room,
            sender: payload[1],
            content: payload[0],
            timestamp: payload[2]
        }
        const [formattedMessage, timeLastMessage] = formatMessage(lastMessage);
        if (newMessage) {
            companion = newMessage.companion
            chatCopy.splice(chatCopy.indexOf(newMessage), 1, {
                companion: companion,
                id: room,
                formattedMessage: formattedMessage,
                timeLastMessage: timeLastMessage
            });
        }
        const sortedChats = sortChats(chatCopy)
        dispatch(setChatsOfUser(sortedChats))
        return [formattedMessage]
    }

    const sortChats = (chats: IChat[]) => {
        const chatsCopy = chats.slice()
        let currentChat;
        if(currentIndex) {
            currentChat = chatsCopy[currentIndex]
        }
        chatsCopy.sort((a,b) => {
            if(a.timeLastMessage && b.timeLastMessage){
                if(a.timeLastMessage >= b.timeLastMessage) return -1
                else return 1
            } 
            else if(a.timeLastMessage && !b.timeLastMessage) return -1 
            else if(!a.timeLastMessage && b.timeLastMessage) return 1
            else return 0
        })
        if(currentChat) setCurrentChat(chatsCopy.indexOf(currentChat))
        return chatsCopy;
    }

    useEffect(() => {
        if (userData.id) {
            getChats()
        }
    }, [userData.id]);

    useEffect(() => {
        socketRef.current = io("http://localhost:8080");

        const waitForMessages = (room: number) => {
            socketRef.current?.on(`message/${room}`, async (payload) => {
                const [content, sender] = payload;
                const [formattedMessage] = updateChatList(room, payload);

                if (chats[currentIndex as number]?.id === room) {
                    console.log('here')
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            sender: sender,
                            content: content,
                            timestamp: Math.floor(Date.now() / 1000),
                        },
                    ]);
                } else {
                    const [senderFormatted, contentFormatted] = formattedMessage.split(':').map(word => word.trim())
                    toast(<div><h3>{senderFormatted}</h3>{contentFormatted}</div>, {
                        theme: localStorage.getItem('theme')?.toLowerCase() as Theme || 'light'
                    });
                }
            });
        };

        chats.forEach((chat) => {
            waitForMessages(chat.id);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };

    }, [chats, currentIndex]);

    useEffect(() => {
        if (messages?.length) {
            const scrollDiv = document.getElementById("current-dialog") as HTMLElement
            scrollDiv.scrollTo(0, scrollDiv.scrollHeight)
        }
    }, [messages]);

    useEffect(() => {
        (async () => {
            if (currentIndex || currentIndex === 0) {
                const response = await getChat(chats[currentIndex as number]?.id)
                setMessages(response)
            }
        })()
    }, [currentIndex]);

    const sendMessageSocket = (content: string, room: number) => {
        if (socketRef.current) {
            socketRef.current.emit("sendMessage", content, room, userData.username);
        }
    };

    const addMessageFront = (sender: string, content: string) => {
        setMessages([...messages, { sender: sender, content: content, timestamp: Math.floor(Date.now() / 1000) }])
        updateChatList(chats[currentIndex as number]?.id, [content, sender, Math.floor(Date.now() / 1000)])
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
                                time={chat.timeLastMessage}
                                id={index}
                                setCurrentChat={setCurrentChat} />
                        ))}
                    </div>
                </div>
                <MainChat addMessageFront={addMessageFront}
                    messages={messages}
                    idBack={chats[currentIndex as number]?.id}
                    userId={currentIndex as number}
                    sendMessageSocket={sendMessageSocket} />
            </div>
        </div>
    );
};

export default Messenger;