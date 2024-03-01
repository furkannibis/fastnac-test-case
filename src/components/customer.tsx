import React, { useEffect, useState } from 'react';
import { getCustomers, handleLogout, addCustomer, findCustomer } from "../functions"; // Assuming you have a function for adding customers
import { Customer } from "../interfaces/customer";
import { ButtonComponent } from "./elements/button";
import { LoadingPage } from "./loading";
import { NavbarComponent } from "./elements/navbar";
import { LinkComponent } from "./elements/link";
import { InputComponent } from "./elements/input";
import { TableComponent } from "./elements/table";
import { TheadComponent } from "./elements/thead";
import { TbodyComponent } from "./elements/tbody";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CustomerPage = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddCustomerPopup, setShowAddCustomerPopup] = useState<boolean>(false);
    const [newCustomerName, setNewCustomerName] = useState<string>('');
    const [newCustomerAge, setNewCustomerAge] = useState<number>(0);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const fetchedCustomers = await getCustomers();
                setCustomers(fetchedCustomers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customers:', error);
                setLoading(false);
            }
        };

        fetchCustomers();
    }, []);

    const searchCustomer = async (value: string) => {
        const users = await findCustomer(value)
        if (users) setCustomers([users])
        console.log(value)
        if (value === '') {
            setCustomers(await getCustomers())
        }
    }


    const handleAddCustomerClick = () => {
        setShowAddCustomerPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddCustomerPopup(false);
    };

    const handleCustomerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomerName(event.target.value);
    };

    const handleCustomerAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewCustomerAge(parseInt(event.target.value));
    };

    const handleAddCustomer = async () => {
        try {
            await addCustomer({
                id: '',
                name: newCustomerName,
                age: newCustomerAge
            });
            const updatedCustomers = await getCustomers();
            setCustomers(updatedCustomers);
        } catch (error) {
            toast.success('Customer added successfully');
            console.error('Error adding customer:', error);
            toast.error('Error adding customer');
        } finally {
            setShowAddCustomerPopup(false);
        }
    };

    const handleLogoutClick = () => {
        handleLogout();
    };

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <div>
            <NavbarComponent id="homeNavbar" title="Rakort">
                <>
                    <LinkComponent id="home" href="/home" text="HOME" on_click={undefined} children={null} />
                    <LinkComponent id="users" href="/users" text="USERS" on_click={undefined} children={null} />
                    <LinkComponent id="customers" href="/customers" text="CUSTOMERS" on_click={undefined} children={null} />
                    <LinkComponent id="products" href="/products" text="PRODUCTS" on_click={undefined} children={null} />
                    <LinkComponent id="signout" href="/login" text="LOG OUT" on_click={handleLogoutClick} children={null} />
                </>
            </NavbarComponent>

            <InputComponent id="SearchBar" placeholder="Search Customer" type="text" onChange={(e) => searchCustomer(e.target.value)} />

            <div className="flex justify-between">
                <ButtonComponent id="addCustomer" text="ADD CUSTOMER" on_click={handleAddCustomerClick} />
                <ButtonComponent id="refresh" text="REFRESH" on_click={() => toast.success('Customers refreshed')} />
            </div>

            <TableComponent id="table">
                <>
                    <TheadComponent id="table" elements={{ 'id': "CUSTOMER ID", 'name': 'NAME', 'age': 'AGE', "delCustomer": "DELETE CUSTOMER" }} children={undefined} />
                    <TbodyComponent id="tableBody" elements={customers} from="customers" />
                </>
            </TableComponent>

            {showAddCustomerPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Customer</h2>
                        <InputComponent id="customerName" type="text" placeholder="CUSTOMER NAME" onChange={handleCustomerNameChange} />
                        <InputComponent id="customerAge" type="number" placeholder="CUSTOMER AGE" onChange={handleCustomerAgeChange} />
                        <ButtonComponent id="addCustomer" text="Add Customer" on_click={handleAddCustomer} />
                        <ButtonComponent id="closePopup" text="Close" on_click={handlePopupClose} />
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};
