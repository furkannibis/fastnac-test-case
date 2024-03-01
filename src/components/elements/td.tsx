import React from "react";
import { TableData } from "../../interfaces/elements";

export const TableDataComponent: React.FC<TableData> = ({ id, value }) => {
    return (
        <td id={id} className="px-6 py-3">
            {value}
        </td>
    );
};
