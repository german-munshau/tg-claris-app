import React from 'react';
import TextField from "../TextField/TextField";
import {getCurrency, getDate} from "../../utils/utils";

const SearchDocument = ({data}) => {
    return (
        <div>
            <TextField label={'Дата'} text={getDate(data?.addedDate)}/>
            <TextField label={'№'} text={data?.serialNumber}/>
            <TextField label={'Проект'} text={data?.project?.name} className={'text-bold'}/>
            <TextField label={'Сумма'} text={getCurrency(data?.amount)} className={'text-bold'}/>
            <TextField label={'Тип'} text={data?.category?.name}/>
            <TextField label={'Автор'} text={data?.author?.name}/>
            <TextField label={'Содержание'} text={data?.content}/>
            <TextField label={'Статус'} text={data?.state?.name}/>
            <TextField label={'Тек.согласующий'} text={data?.agreementStep?.description}/>
        </div>
    );
};

export default SearchDocument;
