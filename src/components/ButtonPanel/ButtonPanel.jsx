import React from 'react';
import './button-panel.css'

const ButtonPanel = ({agree, disagree}) => {
    return (
        <div className={'button-container'}>
            <div className={'button-item'}>
                <button className={'btn-agree'} onClick={agree}><span className={'button-text'}>Согласовать</span>
                </button>
            </div>
            <div className={'button-item'}>
                <button className={'btn-disagree'} onClick={disagree}><span className={'button-text'}>Отклонить</span>
                </button>
            </div>
        </div>
    );
};

export default ButtonPanel;