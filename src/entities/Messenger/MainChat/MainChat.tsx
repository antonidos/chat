import { useSelector } from 'react-redux'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { selectUser } from 'entities/slices/user/userSlice';
import { IMessage } from '../Messenger';
import { addMessage } from '../api/apiMessenger';
import { ISmallAvatar } from 'entities/slices/reduxInterfaces';
import { getAvatar } from 'entities/PersonalInfo/api/personalDataApi';

interface MainChatProps {
    addMessageFront: (sender: string, content: string) => void,
    messages: IMessage[],
    idBack: number,
    avatar: ISmallAvatar | undefined,
    userId: number,
    sendMessageSocket: (content: string, room: number) => void
}

const MainChat: FC<MainChatProps> = (props) => {

    const [avatar, setAvatar] = useState('');

    const getMonthName = (date: Date) => {
        const monthNames = [
            "января", "февраля", "марта", "апреля", "мая", "июня",
            "июля", "августа", "сентября", "октября", "ноября", "декабря"
        ];
        return monthNames[date.getMonth()];
    };

    const isNewDay = (currentMessage: IMessage, previousMessage: IMessage) => {
        const currentDate = new Date(currentMessage.timestamp * 1000);
        const previousDate = new Date(previousMessage.timestamp * 1000);

        return currentDate.getDate() !== previousDate.getDate() ||
            currentDate.getMonth() !== previousDate.getMonth() ||
            currentDate.getFullYear() !== previousDate.getFullYear();
    };

    const getCurrentAvatar = async () => {
        const token = localStorage.getItem('userToken')
        if (token) {
            const avatarchick = await getAvatar(localStorage.getItem('userToken') as string)
            setAvatar(avatarchick.src)
            // setAvatar()
        }
    }

    useEffect(() => {
        getCurrentAvatar()
        const daySeparators = document.getElementsByClassName("day-separator") as HTMLCollectionOf<HTMLElement>;
        const handleScroll = () => {
            for (let i = 0; i < daySeparators.length; i++) {
                const separator = daySeparators[i] as HTMLElement;
                const previousSeparator = daySeparators[i - 1] as HTMLElement;
                if (separator.getBoundingClientRect().top > 160 && previousSeparator) {
                    previousSeparator.style.position = 'sticky'
                    previousSeparator.style.top = '0'
                } else {
                    if (previousSeparator) previousSeparator.style.position = 'relative'
                    separator.style.position = 'sticky'
                    separator.style.top = '0'
                }
            }
        };

        const scrollContainer = document.getElementById("current-dialog");
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
        }

        return () => {
            console.log("bye!")
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [props.messages]);

    const userChat = useSelector(selectUser).userChats[props.userId]
    const username = useSelector(selectUser).personalInfo?.username as string;
    const [value, setValue] = useState('')

    const handleChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            // Если нажата клавиша Enter без Shift, отправляем сообщение
            event.preventDefault(); // Останавливаем действие по умолчанию (перенос строки)
            sendMessage();
        }
    };

    const sendMessage = async () => {
        if (localStorage.getItem('userToken')) {
            await addMessage(localStorage.getItem('userToken') as string, props.idBack, value)
            props.sendMessageSocket(value, props.idBack)
            props.addMessageFront(username, value)
            setValue('')
        }
    }

    return (
        <div className="flex items-center mt-5 p-0 bg-second flex-col rounded-r-xl border-2 border-border
            dark:border-slate-700 dark:bg-slate-600 dark:text-orange-200"
            id="dialog-window">
            {userChat ? (
                <>
                    <h2 className='text-center font-bold py-2.5 text-primary dark:text-orange-200'>Диалог с: {userChat.companion}</h2>
                    <div className="border-t-2 border-border flex items-center flex-col w-full h-full overflow-y-scroll relative 
                    dark:border-slate-700" id="current-dialog">
                        {props.messages.map((message, index) => {
                            const isNewDayMessage = index === 0 || isNewDay(message, props.messages[index - 1]);
                            const date = new Date(message.timestamp * 1000);
                            const today = new Date();
                            const yesterday = new Date(today.getTime() - (60 * 60 * 24 * 1000));;
                            const isToday = date.toLocaleDateString() === today.toLocaleDateString() ? "Сегодня" : false;
                            const isYesterday = date.toLocaleDateString() === yesterday.toLocaleDateString() ? "Вчера" : false;

                            return (
                                <React.Fragment key={index}>
                                    {isNewDayMessage && (
                                        <div className="day-separator bg-border dark:bg-slate-800 px-2 py-1 rounded-xl">
                                            {isToday || isYesterday || date.toLocaleDateString().slice(0, 2) + ` ${getMonthName(date)}`}
                                        </div>
                                    )}
                                    {String(message.sender) === String(username) ? (
                                        <div className="message flex self-end mr-1">
                                            <div
                                                className="flex p-1 my-1 mr-3 rounded-md align-middle 
                                                    border-2 border-border break-words dark:border-slate-700 self-center"
                                            >
                                                <p className="break-words body-message">{message.content}</p>
                                                <p className="time pt-1 w-14 text-right text-sm self-end">
                                                    {String(
                                                        date.toLocaleTimeString()
                                                    ).slice(0, 5)}
                                                </p>
                                            </div>
                                            <div className="rounded-full w-12 h-12 bg-white mr-2 my-2 self-end overflow-hidden">
                                            {avatar ? <img src={avatar} alt="" /> : null}
                                            </div>
                                        </div>


                                    ) : (
                                        <div className="message flex self-start ml-1">
                                            <div className="rounded-full w-12 h-12 bg-white mr-2 my-2 self-end overflow-hidden">
                                                {props.avatar ? <img src={props.avatar.src} alt="" /> : null}
                                            </div>
                                            <div
                                                className="flex p-1 my-1 rounded-md align-middle 
                                                border-2 border-border break-words dark:border-slate-700 self-center"
                                            >
                                                <p className="break-words body-message">{message.content}</p>
                                                <p className="time pt-1 w-14 text-right text-sm self-end">
                                                    {String(
                                                        new Date(message.timestamp * 1000).toLocaleTimeString()
                                                    ).slice(0, 5)}
                                                </p>
                                            </div>
                                        </div>

                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                    <div className="write-message box-border border-t-2 border-border py-2.5 px-5 w-full flex justify-center items-center dark:border-slate-700">
                        <textarea value={value} onChange={handleChange} onKeyDown={handleKeyDown}
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