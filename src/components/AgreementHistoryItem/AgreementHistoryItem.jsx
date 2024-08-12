import React from 'react';
import {getDateTime} from "../../utils/utils";
import './agreementhistory-item.css'

const AgreementHistoryItem = ({item}) => {
    return (
        <tr className={'document-item'}>
            <td>
                <div><b>Дата: </b> {item.date && getDateTime(item.date)}</div>
                <div><b>Чья Виза: </b>{item?.author?.name}</div>
                <div><b>Решение: </b>{item.agreed}</div>
                <div><b>Комментарий: </b>{item.comment}</div>
            </td>
        </tr>
    );
};

export default AgreementHistoryItem;