import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react"

export interface Navbar {
    id: string,
    title: string,
    children: JSX.Element
}

export interface Form {
    id: string,
    action: string,
    on_submit: FormEventHandler<HTMLFormElement>;
    children: JSX.Element | null
}

export interface Input {
    id: string,
    type: "email" | "password" | "text",
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export interface Button {
    id: string,
    text: string,
    on_click: MouseEventHandler<HTMLButtonElement> | undefined;
}

export interface LinkInterface {
    id: string,
    href: string,
    text: string,
    on_click: MouseEventHandler<HTMLAnchorElement> | undefined,
    children: JSX.Element | null
}

export interface Table {
    id: string,
    children: JSX.Element
}

export interface Thead {
    id: string,
    elements: Object,
    children: JSX.Element | undefined
}

export interface TableData {
    id: string,
    value: string | JSX.Element
}

export interface TBody {
    id: string,
    elements: Object
    children: JSX.Element | undefined
}
