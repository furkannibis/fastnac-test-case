import { User } from "./interfaces/user";
import { Product } from "./interfaces/product";
import { Customer } from "./interfaces/customer";

export async function getUsers() {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
}

export async function getUserByID(id: string) {
    const response = await fetch(`http://localhost:3000/users/${id}`)
    const data = await response.json()
    return data
}

export async function getCustomers() {
    const response = await fetch('http://localhost:3000/customers')
    const data = await response.json()
    return data
}

export async function getCustomerByID(id: string) {
    const response = await fetch(`http://localhost:3000/customers/${id}`);
    const data = await response.json();
    return data;
}

export async function getProducts() {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
}

export async function getProductByID(id: string) {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    const data = await response.json()
    return data

}

export async function isUserExists(email: string, password: string) {
    const response = await fetch(`http://localhost:3000/users`)
    const data = await response.json()
    const even = (element: User) => element.email === email && element.password === password;
    return data.some(even)
}

export const handleLogout = () => {
    localStorage.setItem('isAuth', 'false');
};

export const handleLogin = () => {
    localStorage.setItem('isAuth', 'true')
}

export const addUser = async (email: string, password: string) => {
    const users = await getUsers();

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            id: users.length + 1,
        })
    })
}

export const addProduct = async (product: Product) => {
    const products = await getProducts();
    const newProduct = {
        id: products.length + 1,
        productModel: product.productModel,
        description: product.description,
        partner: product.partner,
        registrationDate: product.registrationDate,
        shipDate: product.shipDate,
        warranty: product.warranty,
        warrantySupportStartDate: product.warrantySupportStartDate,
        warrantySupportstartEvent: product.warrantySupportstartEvent
    }

    await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
}

export const addCustomer = async (customer: Customer) => {
    const customers = await getCustomers();
    const newCustomer = {
        id: customers.length + 1,
        customerName: customer.name,
        customerAge: customer.age
    }

    await fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
    })
}

export const deleteItem = async (id: string, type: string) => {
    await fetch(`http://localhost:3000/${type}/${id}`, {
        method: 'DELETE'
    });
};

export const findUser = async (value: string | number) => {
    const allUser = await getUsers();
    return allUser.find((user: User) => user.email == value || user.password == value || user.id == value)
}

export const findCustomer = async (value: string | number) => {
    const allCustomer = await getCustomers()
    return allCustomer.find((customer: Customer) => customer.name == value || customer.id == value || customer.name == value)
}

export const findProduct = async (value: string | number) => {
    const allProduct = await getProducts()
    return allProduct.find((product: Product) => product.id == value || product.partner == value || product.registrationDate == value || product.warranty == value)
}