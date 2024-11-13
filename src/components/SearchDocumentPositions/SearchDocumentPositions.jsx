import React, {useState} from 'react';
import {getDateValue} from "../../utils/utils";

const SearchDocumentPositions = ({data}) => {

    const [show, setShow] = useState(false)

    const handleChange = () => {
        setShow(!show)
    }

    return (
        <>
            <div className={"detail-checkbox-container"}>
                <input className={"detail-checkbox"} type="checkbox" id="scales" name="scales" checked={show}
                       onChange={handleChange}/>
                <label className={"detail-label"} htmlFor="scales">Показать позиции</label>
            </div>

            <div className={"document-details-container"}>
                {show && data.length > 0 &&
                    <table>
                        <thead>
                        <tr>
                            <th className={'document-position-text'}>Наименование</th>
                            <th className={'document-position-text'}>План поставки</th>
                            <th className={'document-position-digit'}>Кол</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className={'document-position-text'}>{item.assetText}</td>
                                <th className={'document-position-text'}>{getDateValue(item.positionSupplierInvoice?.deliverySchedule)}</th>
                                <td className={'document-position-digit'}>{item.positionsCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};

export default SearchDocumentPositions;

