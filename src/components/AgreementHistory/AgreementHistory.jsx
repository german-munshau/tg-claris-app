import React, {useState} from 'react';
import AgreementHistoryItem from "../AgreementHistoryItem/AgreementHistoryItem";

const AgreementHistory = ({data}) => {
        const [show, setShow] = useState(false)

        const handleChange = () => {
            setShow(!show)
        }

        return (
            <>
                <div className={"detail-checkbox-container"}>
                    <input className={"detail-checkbox"} type="checkbox" id="scales" name="scales" checked={show} onChange={handleChange}/>
                    <label className={"detail-label"} htmlFor="scales">Показать лист согласования</label>
                </div>
                {show &&
                    <div className={'document-details-container'}>
                        <div>
                            {data.map((item, idx) => (<AgreementHistoryItem key={idx} item={item}/>))}
                        </div>
                    </div>
                }
            </>
        );
    }
;

export default AgreementHistory;