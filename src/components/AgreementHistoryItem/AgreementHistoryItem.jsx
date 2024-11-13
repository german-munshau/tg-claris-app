import React from 'react';
import {getDateTime} from "../../utils/utils";

const AgreementHistoryItem = ({item}) => {
    return (
        <div className={'document-item'} key={item.id}>
            <div>Дата: {item.date && getDateTime(item.date)}</div>
            <div>ФИО: {item?.author?.name}</div>
            <div>Решение: {item.agreed}</div>
            <div>Комментарий: {item.comment}</div>
        </div>
    );
};

export default AgreementHistoryItem;