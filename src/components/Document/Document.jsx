import React from 'react';
import TextField from "../TextField/TextField";
import './document.css'

const Document = ({data}) => {
    return (
        <div>
            <TextField label={'Содержание'} text={data?.content}/>
            <TextField label={'Дата'} text={data?.addedDate}/>
            <TextField label={'№'} text={data?.serialNumber}/>
            <TextField label={'Тип'} text={data?.category?.name}/>
            <TextField label={'Проект'} text={data?.project?.name}/>
            <TextField label={'Сумма'} text={data?.amount}/>
            <TextField label={'Автор'} text={data?.author?.name}/>
        </div>
    );
};

export default Document;