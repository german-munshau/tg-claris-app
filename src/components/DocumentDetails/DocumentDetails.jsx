import React from 'react';
import './document-details.css'


const DocumentDetails = ({data}) => {

    const getDate = (str) => {

        const options = {
            // era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            // weekday: 'long',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        let timestamp = Date.parse(str);
        const date = new Date(timestamp);
        console.log(date)
        return date.toLocaleString("ru", options)

    }
    return (
        <div className={'document-details-container'}>
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Чья Виза</th>
                    <th>Решение</th>
                    <th>Комментарий</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, idx) => (
                    <tr key={idx}>
                        <td>{item.date && getDate(item.date)}</td>
                        <td>{item.author.name}</td>
                        <td>{item.agreed}</td>
                        <td>{item.comment}</td>
                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
};

export default DocumentDetails;