import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setPersonalInfo } from '../slices/user/userSlice';
import { getUserInfo } from './api/personalDataApi';
import { useRouter } from 'next/router';

const PersonalInfo = () => {
    const user = useSelector(selectUser).personalInfo;
    const dispatch = useDispatch()
    const router = useRouter()

    async function getData() {
        if (localStorage.getItem('userToken')) 
            dispatch(setPersonalInfo(await getUserInfo(localStorage.getItem('userToken') as string)))
        else {
            router.push('/login')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="container">
                <div className="personal-info">
                    <h1>Личные данные</h1>
                    <div className="avatar">
                    </div>
                    <h3>Имя: {user?.username}</h3>
                    <h3>Электронная почта: {user?.email}</h3>
                    <h3>Возраст: {21}</h3>
                    <h3>Номер телефона: {"89999999999"}</h3>
                    <button className="buttonLogin">
                        Редактировать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;