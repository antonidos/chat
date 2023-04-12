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

const SmallChat:FC<SmallChatProps> = (props) => {

  const handleClickChat = async () => {
    props.setCurrentChat(props.id)
    const response = await getChat(String(props.idBack))
    props.setMessages(response)
  }

  const deleteDialogOfUser = async () => {
    if(localStorage.getItem('userToken')) {
        const response = await deleteDialog(localStorage.getItem('userToken') as string, props.name)
        if(response ){
          await props.getChats()
        } 
    } 
  }

  return (
    <div className='dialog'>
      <div className="companion-name" onClick={handleClickChat}>
        <p>{props.name}</p>
        <p>Последнее сообщение...</p>
      </div>
      <div onClick={deleteDialogOfUser} className="delete">X</div>
    </div>
  )
}

export default SmallChat;