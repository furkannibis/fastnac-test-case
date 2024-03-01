import { FormComponent } from "./elements/form"
import { InputComponent } from "./elements/input"
import { ButtonComponent } from "./elements/button"

import { handleLogin, isUserExists } from "../functions"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            const result = await isUserExists(email, password);
            console.log(result)
            if (result) {
                handleLogin()
                navigate('/home')
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    return (
        <div>
            <FormComponent id="LoginForm" action="" on_submit={handleSubmit}>
                <>
                    <InputComponent id="email" type="email" placeholder="example@example.com" onChange={(e) => setEmail(e.target.value)} />
                    <InputComponent id="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <ButtonComponent id="signInButton" text="Sign IN" on_click={undefined} />
                </>
            </FormComponent>
        </div>
    )
}