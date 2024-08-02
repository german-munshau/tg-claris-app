import React from 'react';
import './button-panel.css'

const ButtonPanel = ({agree, disagree}) => {
    return (
        <div className={'button-container'}>
            <div className={'button-item'}>
                <button onClick={agree}>Согласовать</button>
            </div>
            <div className={'button-item'}>
                <button onClick={disagree}>Отклонить</button>
            </div>
        </div>
    );
};

export default ButtonPanel;