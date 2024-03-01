import React from 'react';
import { Thead } from "../../interfaces/elements";
import { TableDataComponent } from "./td";

export const TheadComponent: React.FC<Thead> = ({ id, elements }) => {
    const elementValues = Object.values(elements);

    return (
        <thead id={id} className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr className='text-center'>
                {elementValues.map((tableHeader, index) => (
                    <TableDataComponent key={index} id={tableHeader} value={tableHeader} />
                ))}
            </tr>
        </thead>
    )
}
