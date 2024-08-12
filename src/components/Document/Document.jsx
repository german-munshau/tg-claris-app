import React from 'react';
import TextField from "../TextField/TextField";
import {getDate} from "../../utils/utils";
import './document.css'

const Document = ({data}) => {
    return (
        <div>
            <TextField label={'Содержание'} text={data?.content}/>
            <TextField label={'Дата'} text={getDate(data?.addedDate)}/>
            <TextField label={'№'} text={data?.serialNumber}/>
            <TextField label={'Тип'} text={data?.category?.name}/>
            <TextField label={'Проект'} text={data?.project?.name}/>
            {/*<TextField label={'Сумма'} text={data?.amount.toFixed(2).toLocaleString()}/>*/}
            <TextField label={'Сумма'} text={data?.amount.toFixed(2)}/>
            <TextField label={'Автор'} text={data?.author?.name}/>
        </div>
    );
};

export default Document;