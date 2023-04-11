import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './slices/user/userSlice';

const PersonalInfo = () => {
    const user = useSelector(selectUser).personalInfo

    return (
        <div>
            <div className="container">
                <div className="personal-info">
                    <h1>Личные данные</h1>
                    <div className="avatar">
                    </div>
                    <h3>Имя: {user?.name}</h3>
                    <h3>Электронная почта: {"blabla@gmail.com"}</h3>
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