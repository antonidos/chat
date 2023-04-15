import { deleteDialog, getChat } from '../api/apiMessenger'
import { IMessage } from '../Messenger'
import React, { FC, MouseEvent } from 'react'

interface SmallChatProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<number | null>>,
  id: number,
  name: string,
  formattedMessage: string,
  time: number | undefined,
  getChats: () => void,
}

const SmallChat: FC<SmallChatProps> = (props) => {

  const getShortMonthName = (date: Date) => {
    const shortMonthNames = [
      "янв", "фев", "мар", "апр", "май", "июн",
      "июл", "авг", "сен", "окт", "ноя", "дек"
    ];
    return shortMonthNames[date.getMonth()];
  };

  const transformTime = (timestamp: string | number | undefined) => {
    console.log(timestamp)
    if(timestamp) {
      const date = new Date(Number(timestamp) * 1000);
      const today = new Date();
      console.log(today.toLocaleDateString())
      if(date.toLocaleDateString() === today.toLocaleDateString()) {
        return date.toLocaleTimeString().slice(0, 5)
      } else if (date.getFullYear() === today.getFullYear()) {
        return date.toLocaleDateString().slice(0, 2) + ` ${getShortMonthName(date)}`
      } else {
        return date.toLocaleDateString()
      }
    } else return null
  }

  const handleClickChat = async () => {
    props.setCurrentChat(props.id)
  }

  const deleteDialogOfUser = async (event: MouseEvent) => {
    event.stopPropagation();
    if (localStorage.getItem('userToken')) {
      props.setCurrentChat(null)
      const response = await deleteDialog(localStorage.getItem('userToken') as string, props.name)
      if (response) {
        await props.getChats()
      }
    }
  }

  return (
    <div onClick={handleClickChat}
      className='p-1.5 pl-4 border-2 border-border rounded-l-xl bg-second 
      flex justify-between my-2 cursor-pointer hover:bg-red-100 transition-colors dark:bg-slate-600 
      dark:border-slate-700 dark:text-orange-200 dark:hover:bg-slate-800'>
      <div>
        <p>{props.name}</p>
        <p className='dark:text-white text-gray-800 opacity-80 z-0'>{props.formattedMessage}</p>
      </div>
      <div className='flex flex-col justify-between'>
        <div onClick={deleteDialogOfUser} className="self-end px-2 text-xl z-10 transition-colors duration-500 rounded-md
      hover:text-red-500 hover:bg-primary dark:hover:bg-slate-400 dark:hover:text-orange-200 w-fit">X</div>
        <p className='text-sm dark:text-white'>
          {
            transformTime(props.time)
          }
        </p>
      </div>

    </div>
  )
}

export default SmallChat;