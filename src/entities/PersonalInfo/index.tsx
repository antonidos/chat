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
        modal[0]?.classList.contains('open') ? modal[0]?.classList.remove('open') : modal[0]?.classList.add('open')
        background[0]?.classList.contains('open') ? background[0]?.classList.remove('open') : background[0]?.classList.add('open')
    }

    useEffect(() => {
        async function getData() {
            if (localStorage.getItem('userToken')){
                dispatch(setPersonalInfo(await getUserInfo(localStorage.getItem('userToken') as string)));
                console.log(user);
            }  
            else {
                router.push('/login')
            }
        }
        getData()
    }, [])

    return (
        <div>
            <div onClick={handleOpenModal} className="background-modal"></div>
            <div className='modal align-center'>
                <h3>Редактирование персональных данных</h3>
                <p>E-mail</p>
                <input name='email' onChange={handleChange} type="text" className="inputlogin" />
                <p>Возраст</p>
                <input name='age' onChange={handleChange} type="number" className="inputlogin" />
                <p>Номер телефона</p>
                <input name='phone' onChange={handleChange} type="number" className="inputlogin" />
                <button
                    disabled={!(state.age || state.email || state.phone)}
                    className="buttonLogin"
                    onClick={handleSubmit}
                >
                    Редактировать
                </button>
            </div>
            <div className="container">
                <div className="personal-info">
                    <h1>Личные данные</h1>
                    <div className="avatar">
                    </div>
                    <h3>Имя: {user?.username}</h3>
                    <h3>Электронная почта: {user?.email}</h3>
                    <h3>Возраст: {user?.age || "Не указано"}</h3>
                    <h3>Номер телефона: {user?.phone || "Не указано"}</h3>
                    <button
                        onClick={handleOpenModal}
                        className="buttonLogin"
                    >
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;