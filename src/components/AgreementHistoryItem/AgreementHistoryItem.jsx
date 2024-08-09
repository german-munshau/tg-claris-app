import React from 'react';
import {getDate} from "../../utils/utils";
import './agreementhistory-item.css'


const AgreementHistoryItem = ({item}) => {
    return (
        <tr className={'document-item'}>
            <td>
                <div><b>Дата: </b> {item.date && getDate(item.date)}</div>
                <div><b>Чья Виза: </b>{item?.author?.name}</div>
                <div><b>Решение: </b>{item.agreed}</div>
                <div><b>Комментарий: </b>{item.comment}</div>
            </td>
        </tr>
        // <div className={'document-item'}>
        //     <div><b>Дата: </b> {item.date && getDate(item.date)}</div>
        //     <div><b>Чья Виза: </b>{item?.author?.name}</div>
        //     <div><b>Решение: </b>{item.agreed}</div>
        //     <div><b>Комментарий: </b>{item.comment}</div>
        //     <hr/>
        // </div>
    );
};

export default AgreementHistoryItem;