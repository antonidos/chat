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
        <div className="flex items-center mt-5 p-0 bg-second flex-col rounded-r-xl border-2 border-border
            dark:border-slate-700 dark:bg-slate-600 dark:text-orange-200" 
            id="dialog-window">
            {userChat ? (
                <>
                    <h2 className='text-center font-bold py-2.5 text-primary dark:text-orange-200'>Диалог с: {userChat.companion}</h2>
                    <div className="border-t-2 border-border flex items-center flex-col w-full h-full overflow-y-scroll 
                    dark:border-slate-700" id="current-dialog">
                        {props.messages.map((message, index) =>
                            String(message.sender) === String(id) ? (
                                <div key={index} className="message flex self-end p-1 my-1 mr-3 rounded-md align-middle 
                                border-2 border-border break-words dark:border-slate-700 max-w-fi">
                                    <p className='break-words body-message'>{message.content}</p>
                                    <p className="time pt-1 w-14 text-right text-sm">
                                        {String(new Date(message.timestamp * 1000).toLocaleTimeString()).slice(0, 5)}
                                    </p>
                                </div>
                            ) : (
                                <div key={index} className="message flex self-start p-1 my-1 ml-3 rounded-md align-middle 
                                border-2 border-border break-words dark:border-slate-700">
                                    <p className='break-words'>{message.content}</p>
                                    <p className="time pt-1 w-14 text-right text-sm align-middle">
                                        {String(new Date(message.timestamp * 1000).toLocaleTimeString()).slice(0, 5)}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                    <div className="write-message box-border border-t-2 border-border py-2.5 px-5 w-full flex justify-center items-center dark:border-slate-700">
                        <textarea value={value} onChange={handleChange} 
                            className="inputlogin mr-5 h-12 p-1 dark:bg-orange-200 dark:text-slate-800 w-full" />
                        <button onClick={sendMessage} className="buttonLogin text-md py-1 px-5 bg-primary dark:bg-slate-900">Отправить</button>
                    </div>
                </>
            ) : (
                <h2 className='font-bold mt-3'>Выберите диалог</h2>
            )}
        </div>

    )
}

export default MainChat;