import { useSelector } from 'react-redux'
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { selectUser } from 'entities/slices/user/userSlice';
import { IMessage } from '..';
import { addMessage } from '../api/apiMessenger';

interface MainChatProps {
    addMessageFront: (sender: number, content: string) => void,
    messages: IMessage[],
    idBack: number,
    userId: number,
    sendMessageSocket: (content: string, room: number) => void,
    waitForMessages: (room: number) => void
}

const MainChat: FC<MainChatProps> = (props) => {

    const userChat = useSelector(selectUser).userChats[props.userId]
    const id = useSelector(selectUser).personalInfo?.id as number;
    const [value, setValue] = useState('')

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(value)
    }

    const sendMessage = async () => {
        if (localStorage.getItem('userToken')) {
            await addMessage(localStorage.getItem('userToken') as string, props.idBack, value)
            props.sendMessageSocket(value, props.idBack)
            props.addMessageFront(id, value)
            setValue('')
        }
    }

    useEffect(() => {
        props.waitForMessages(props.idBack)
    }, [props.idBack])

    useEffect(() => {
        if (props.messages.length !== 0) {
            const scrollDiv = document.getElementById("current-dialog") as HTMLElement
            scrollDiv.scrollTo(0, scrollDiv.scrollHeight)
        }
    }, [props.messages])

    return (
        userChat ? (
            <div className="flex align-center" id="current-dialog">
                <h2 className='current-companion'>Диалог с: {userChat}</h2>
                <div className="messages-area flex align-center">
                    {props.messages.map((message, index) =>
                        String(message.sender) === String(id) ? (
                            <div key={index} className="message from-you">
                                <p>{message.content}</p>
                                <p className="time">{String(new Date(message.timestamp * 1000).toLocaleTimeString()).slice(0, 5)}</p>
                            </div>
                        ) : (
                            <div key={index} className="message from-companion">
                                <p>{message.content}</p>
                                <p className="time">{String(new Date(message.timestamp * 1000).toLocaleTimeString()).slice(0, 5)}</p>
                            </div>
                        )
                    )}
                </div>
                <div className="write-message flex jcc align-center">
                    <textarea value={value} onChange={handleChange} className="inputlogin" />
                    <button onClick={sendMessage} className="buttonLogin">Отправить сообщение</button>
                </div>
            </div>
        ) : (
            <div className="flex align-center" id="current-dialog">
                <h2 className='current-companion'>Выберите диалог</h2>
            </div>
        )

    )
}

export default MainChat;