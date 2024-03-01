import { Link } from "react-router-dom"
import { LinkInterface } from "../../interfaces/elements"

export const LinkComponent: React.FC<LinkInterface> = ({id, href, text, on_click}) => {
    return (
        <Link to={href} id={id} onClick={on_click} className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{text}</Link>
    )
}