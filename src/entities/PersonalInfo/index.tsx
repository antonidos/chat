import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setPersonalInfo } from '../slices/user/userSlice';
import { getUserInfo, updateUserInfo } from './api/personalDataApi';
import { useRouter } from 'next/router';

const PersonalInfo = () => {
    const user = useSelector(selectUser).personalInfo;
    const dispatch = useDispatch()
    const router = useRouter()

    const [state, setState] = useState({
        email: "",
        age: "",
        phone: ""
    })

    const handleChange = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>) => {
        console.log(state)
        setState({ ...state, [name]: value })
    }

    const handleSubmit = async () => {
        const disabled = !(state.age || state.email || state.phone);
        if(!disabled) {
            const age = Number(state.age) || Number(user?.age)
            const email = state.email || user?.email || null;
            const phone = state.phone || user?.phone || null;
            const response = await updateUserInfo(age, email, phone, localStorage.getItem('userToken'))
            if(response) dispatch(setPersonalInfo(await getUserInfo(localStorage.getItem('userToken') as string)))

            handleOpenModal()
        } else alert("Измените хотя бы одно значение")
    }

    const handleOpenModal = () => {
        const background = document.getElementsByClassName('background-modal');
        const modal = document.getElementsByClassName('modal');
        modal[0]?.classList.toggle('open')
        background[0]?.classList.toggle('open')
    }

    // useEffect(() => {
    //     async function getData() {
    //         if (localStorage.getItem('userToken')){
    //             dispatch(setPersonalInfo(await getUserInfo(localStorage.getItem('userToken') as string)));
    //             console.log(user);
    //         }  
    //         else {
    //             router.push('/login')
    //         }
    //     }
    //     getData()
    // }, [])

    return (
        <div>
            <div onClick={handleOpenModal} className="background-modal absolute hidden top-0 left-0 h-screen w-screen dark:bg-slate-900"></div>
            <div className='modal absolute hidden flex-col z-20 bg-white 
                rounded-2xl border-1 items-center py-8 px-5 dark:bg-slate-700 dark:text-orange-200'>
                <h3 className='mb-2.5'>Редактирование персональных данных</h3>
                <p className='self-start'>E-mail</p>
                <input name='email' onChange={handleChange} type="text" 
                    className="inputlogin w-full mb-2 border-2 border-border dark:bg-slate-500 dark:border-slate-900" />
                <p className='self-start'>Возраст</p>
                <input name='age' onChange={handleChange} type="number" 
                    className="inputlogin w-full mb-2 border-2 border-border dark:bg-slate-500 dark:border-slate-900" />
                <p className='self-start'>Номер телефона</p>
                <input name='phone' onChange={handleChange} type="number" 
                    className="inputlogin w-full mb-2 border-2 border-border dark:bg-slate-500 dark:border-slate-900" />
                <button
                    disabled={!(state.age || state.email || state.phone)}
                    className="buttonLogin mt-2 bg-primary dark:bg-slate-900"
                    onClick={handleSubmit}
                >
                    Редактировать
                </button>
            </div>
            <div className="container">
                <div className="w-full box-border border-4 border-border rounded-xl mt-5 
                    bg-second p-5 dark:border-slate-700 dark:bg-slate-600 dark:text-orange-200">
                    <h1 className='text-3xl mb-3 font-bold'>Личные данные</h1>
                    <div className="avatar mb-3">
                    </div>
                    <h3 className='mb-1'>Имя: {user?.username}</h3>
                    <h3 className='mb-1'>Электронная почта: {user?.email}</h3>
                    <h3 className='mb-1'>Возраст: {user?.age || "Не указано"}</h3>
                    <h3 className='mb-1'>Номер телефона: {user?.phone || "Не указано"}</h3>
                    <button
                        onClick={handleOpenModal}
                        className="buttonLogin mt-2 bg-primary dark:bg-slate-900"
                    >
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;