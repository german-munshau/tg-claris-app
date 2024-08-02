import React from 'react';
import {getDate} from "../../utils/utils";
import './document-item.css'


const DocumentItem = ({item}) => {
    return (
        <div className={'document-item'}>
            <div><b>Дата: </b> {item.date && getDate(item.date)}</div>
            <div><b>Чья Виза: </b>{item?.author?.name}</div>
            <div><b>Решение: </b>{item.agreed}</div>
            <div><b>Комментарий: </b>{item.comment}</div>
        </div>
    );
};

export default DocumentItem;