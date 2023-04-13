import { asyncSearch, clearSearch, selectSearch, selectStatus } from 'entities/slices/search/searchSlice';
import { selectUser } from 'entities/slices/user/userSlice';
import React, { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDialog } from '../api/apiMessenger';
import { AppDispatch } from 'entities/store';

interface SearchProps {
    getChats: () => void,
    setCurrentChat: React.Dispatch<React.SetStateAction<number | null>>
}

const Search: FC<SearchProps> = (props) => {
    const [open, setOpen] = useState(false)
    const companions = useSelector(selectSearch)
    const [value, setValue] = useState('')
    const chats = useSelector(selectUser).userChats;
    const status = useSelector(selectStatus)
    const dispatch: AppDispatch = useDispatch()

    const handleChange = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setValue(value)
        dispatch(asyncSearch(value.toLowerCase()))
    }

    const handleBlur = (e: FocusEvent<HTMLFormElement, Element>) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // Not triggered when swapping focus between children
            e.preventDefault()
            setOpen(false)
        }
    }

    const addUser = async (username: string) => {
        const token = localStorage.getItem('userToken')
        if (token) {
            if (chats.indexOf(username) > -1) props.setCurrentChat(chats.indexOf(username))
            else {
                const response = await addDialog(token, username)
                if (response) {
                    await props.getChats()
                    props.setCurrentChat(chats.length)
                }
            }
            dispatch(clearSearch())
            setOpen(false)
            setValue('')
        }

    }

    useEffect(() => {
        dispatch(clearSearch())
    }, [])

    return (
        <form onFocus={() => setOpen(true)} onBlur={(e) => handleBlur(e)} className={'relative'}>
            <input
                className={'h-9 rounded-lg mt-1.5 mb-2.5 px-5 text-md outline-none dark:bg-slate-500 dark:text-orange-200 placeholder-orange-200'}
                value={value}
                placeholder="🔎 Search"
                onChange={handleChange}
            ></input>
            {open ? (
                <div className={'result absolute bg-white dark:bg-slate-500 dark:text-orange-200 flex flex-col w-9/10 rounded-lg top-12'}>
                    {status === 'loading' ? (
                        <div className={'ldsRing'}>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : companions ? companions.map(user => (
                        <button type="button"
                            onClick={() => addUser(user.username)}
                            className={`m-1 rounded-md py-2.5 px-4  transition duration-300 
                                cursor-pointer text-left text-md hover:bg-slate-300`} 
                            key={user.id}
                        >
                            {user.username}
                        </button>
                    )) : null}
                </div>
            ) : null}

        </form>

    )
}

export default Search;