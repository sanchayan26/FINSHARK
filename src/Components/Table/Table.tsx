import React, { lazy } from 'react'
import { testIncomeStatementData } from './testData'
import { render } from '@testing-library/react';

const data = testIncomeStatementData

interface Props {}

type Company = (typeof data)[0];

const configs =[
    {
        label: "year",
        render: (company : Company) => company.acceptedDate
    },
    {
        label: "Cost Of Revenue",
        render:(company:Company) => company.costOfRevenue
    }
]
const Table = (props: Props) => {
    const renderRows =data.map((company)=>{
        return (
            <tr key={company.cik}>
                {configs.map((val:any)=>{
                    return(
                        <td className='p-4 whitespace-nowrap text-sm front-normal text-gray-90'>
                                {val.render(company)}
                        </td>
                    )
                })}
               
            </tr>
          );
    });

    const renderHeaders =configs.map((config:any)=>{
        return(
            <th className='p-4 text-left text-xs font-medium text-fray-500 uppercase tracking-wider'
            key={config.label}>
                {config.label}
            </th>
        );
    });

    return (
    <div className='big-white shado rounded-lg p-4 sm:p-6 xl:p-8'>
        <table>
            <thead className='min-w-full divide-y divide=gray-200 m-5'>
                {renderHeaders}
            </thead>
            <tbody>
                {renderRows}
            </tbody>
        </table>
    </div>
    )
}

export default Table