import { Table } from "../../interfaces/elements"

export const TableComponent: React.FC<Table> = ({id, children}) => {
    return (
        <>
            <table id={id} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {children}
            </table>
        </>
    )
}