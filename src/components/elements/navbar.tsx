import { Navbar } from "../../interfaces/elements";
import { LinkComponent } from "./link";

export const NavbarComponent: React.FC<Navbar> = ({id, title, children}) => {
    return (
        <nav className="bg-gray-600 border-gray-200 dark:bg-gray-900" id={id}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {<LinkComponent id="title" href="/home" text={title} on_click={undefined} children={null}/>}
                <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                    {children}
                </div>
            </div>
        </nav>
    )
}