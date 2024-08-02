import React from 'react';
import './document-item.css'

const DocumentItem = ({item}) => {
    return (

        <div className={'document-item'}>
            Дата:{item.date}, Чья Виза:{item?.author?.name},Решение:{item.agreed},Комментарий{item.comment}
        </div>
    );
};

export default DocumentItem;