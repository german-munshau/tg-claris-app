import React from 'react';
import {getCurrency} from "../../utils/utils";


const DocumentPositions = ({data}) => {
    return (
        <>
            <div className={'document-details-title'}>Позиции:</div>
            <div className={"document-details-container"}>

                {data.length > 0 &&
                    <table>
                        <thead>
                        <tr>
                            <th className={'document-position-text'}>ТМЦ текстом</th>
                            <th className={'document-position-digit'}>Кол</th>
                            <th className={'document-position-digit'}>Цена</th>
                            <th className={'document-position-digit'}>Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className={'document-position-text'}>{item.assetText}</td>
                                <td className={'document-position-digit'}>{item.positionsCount}</td>
                                <td className={'document-position-digit'}>{getCurrency(item.price)}</td>
                                <td className={'document-position-digit'}>{getCurrency(item.amountWithNDS)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};

export default DocumentPositions;

