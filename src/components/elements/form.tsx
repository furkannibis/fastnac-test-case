import { Form } from "../../interfaces/elements"

export const FormComponent: React.FC<Form> = ({id, action, on_submit, children}) => {
    return (
        <form id={id} action={action} onSubmit={on_submit}>
            {children}
        </form>
    )
}