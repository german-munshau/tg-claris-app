import React from 'react';
import './document-positions.css'


const DocumentPositions = ({data}) => {
    return (<>
            <div className={'document-details-title'}>Позиции:</div>
            <div className={'document-position-container'}>
                {data.length > 0 &&
                    <table>
                        <thead>
                        <tr>
                            <th className={'document-position-name'}>ТМЦ текстом</th>
                            <th className={'document-position-digit'}>Кол</th>
                            <th className={'document-position-digit'}>Цена</th>
                            <th className={'document-position-digit'}>Сумма</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className={'document-position-name'}>{item.assetText}</td>
                                <td className={'document-position-digit'}>{item.positionsCount}</td>
                                <td className={'document-position-digit'}>{item.price}</td>
                                <td className={'document-position-digit'}>{item.amount}</td>
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

