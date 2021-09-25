import React from 'react';
import numeral from 'numeral';
import './Table.css';

const Table = ({districts,casesType}) => {
    return (
        <div className='table'>
            {districts.map((district) => (
                <tr>
                    <td>{district.district}</td>
                    <td><strong>{numeral(district[casesType]).format("0,0")}</strong></td>
                </tr>
            ))}
        </div>
    );
};

export default Table;
