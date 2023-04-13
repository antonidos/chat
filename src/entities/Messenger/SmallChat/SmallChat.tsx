import { deleteDialog, getChat } from '../api/apiMessenger'
import { IMessage } from '..'
import React, { FC } from 'react'

interface SmallChatProps {
  setCurrentChat: React.Dispatch<React.SetStateAction<number | null>>,
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
  id: number,
  name: string,
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
    <div className='p-1.5 pl-4 border-2 border-border rounded-l-xl bg-second 
      flex justify-between my-2 cursor-pointer hover:bg-red-100 transition-colors dark:bg-slate-600 
      dark:border-slate-700 dark:text-orange-200 dark:hover:bg-slate-800'>
      <div onClick={handleClickChat}>
        <p>{props.name}</p>
        <p>Последнее сообщение...</p>
      </div>
      <div onClick={deleteDialogOfUser} className="pt-1 self-start pr-2.5 pb-2 pl-2.5 text-xl z-10 transition-colors duration-500 rounded-md
      hover:text-red-500 hover:bg-primary dark:hover:bg-slate-900 dark:hover:text-orange-200">X</div>
    </div>
  )
}

export default SmallChat;