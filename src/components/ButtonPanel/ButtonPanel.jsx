import React from 'react';
import './button-panel.css'

const ButtonPanel = () => {
    return (
        <div className={'button-container'}>
            <div className={'button-item'}>
                <button>Согласовать</button>
            </div>
            <div className={'button-item'}>
                <button>Отклонить</button>
            </div>
        </div>
    );
};

export default ButtonPanel;