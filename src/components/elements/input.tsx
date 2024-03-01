import { Input } from "../../interfaces/elements";

export const  InputComponent: React.FC<Input> = ({id, type, placeholder, onChange}) => {
    return (
        <div>
            <input id={id} type={type} placeholder={placeholder} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
    )
}