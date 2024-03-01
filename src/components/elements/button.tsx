import { Button } from "../../interfaces/elements";

export const ButtonComponent: React.FC<Button> = ({ id, text, on_click }) => {
    return (
        <div>
            <button id={id} onClick={on_click} className="text-black hover:bg-px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <span>{text}</span>
            </button>
        </div>
    )
}