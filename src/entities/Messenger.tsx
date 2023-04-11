import React from 'react';

const Messenger = () => {
    return (
        <div className='container'>
            <div className="messenger flex align-start">
                <div className="list-of-dialogs">
                    <div className="dialog">
                        <div className="companion-name">
                            <h4>{"Игорь"}:</h4>
                        </div>
                        <div className="last-message">
                            <p>{"Как дела?"}</p>
                        </div>
                    </div>
                    <div className="dialog">
                        <div className="companion-name">
                            <h4>{"Игорь"}:</h4>
                        </div>
                        <div className="last-message">
                            <p>{"Как дела?"}</p>
                        </div>
                    </div>
                </div>
                <div className="current-dialog flex align-center">
                    <h2 className='current-companion'>Диалог с: {"Игорь"}</h2>
                    <div className="messages-area flex align-center">
                        <div className="message from-you">fdgdfgfd</div>
                        <div className="message from-you">fdgdfgfdfdgdfgfdfdgdfgfdfdgdfgfdfdgdfgfdfdgdfgfd</div>
                        <div className="message from-companion">fdgdfgfd</div>
                    
                    </div>
                    <div className="write-message flex jcc align-center">
                        <textarea className="inputlogin" />
                        <button className="buttonLogin">Отправить сообщение</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;