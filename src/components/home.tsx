import { handleLogout } from "../functions"
import { LinkComponent } from "./elements/link"
import { NavbarComponent } from "./elements/navbar"

export const HomePage = () => {
    return (
        <div>
            <NavbarComponent id="homeNavbar" title="Rakort">
                <>
                    <LinkComponent id="home" href="/home" text="HOME" children={null} on_click={undefined} />
                    <LinkComponent id="users" href="/users" text="USERS" children={null} on_click={undefined} />
                    <LinkComponent id="customers" href="/customers" text="CUSTOMERS" children={null} on_click={undefined} />
                    <LinkComponent id="products" href="/products" text="PRODUCTS" children={null} on_click={undefined} />
                    <LinkComponent id="signout" href="/login" text="LOG OUT" children={null} on_click={handleLogout} />
                </>
            </NavbarComponent>

        </div>
    )
}