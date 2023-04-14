import { deleteDialog, getChat } from '../api/apiMessenger'
import { IMessage } from '../Messenger'
import React, { FC } from 'react'

interface SmallChatProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<number | null>>,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
  id: number,
  name: string,
  formattedMessage: string,
  getChats: () => void,
  idBack: number
}

const SmallChat: FC<SmallChatProps> = (props) => {

  const handleClickChat = async () => {
    props.setCurrentChat(props.id)
    const response = await getChat(props.idBack)
    props.setMessages(response)
  }

  const deleteDialogOfUser = async () => {
    if (localStorage.getItem('userToken')) {
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
        <p className='text-white opacity-80 z-0'>{props.formattedMessage}</p>
      </div>
      <div onClick={deleteDialogOfUser} className="self-start px-2 text-xl z-10 transition-colors duration-500 rounded-md
      hover:text-red-500 hover:bg-primary dark:hover:bg-slate-400 dark:hover:text-orange-200">X</div>
    </div>
  )
}

export default SmallChat;