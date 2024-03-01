import React, { useEffect, useState } from 'react';
import { addUser, findByName, findUser, getUsers, handleLogout } from "../functions";
import { User } from "../interfaces/user";
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

export const UserPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddUserPopup, setShowAddUserPopup] = useState<boolean>(false);
    const [newUserEmail, setNewUserEmail] = useState<string>('');
    const [newUserPassword, setNewUserPassword] = useState<string>('');


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const searchUser = async (email: string) => {
        const users = await findUser(email)
        console.log(email)
        if(users) setUsers([users])
        if(email === ''){
            setUsers(await getUsers())
        } 
    }

    const handleAddUserClick = () => {
        setShowAddUserPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddUserPopup(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserPassword(event.target.value);
    };

    const handleAddUser = () => {
        addUser(newUserEmail, newUserPassword);
        setShowAddUserPopup(false);
        toast.success('User added');
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

            <InputComponent id="SearchBar" placeholder="Search User" type="text" onChange={(e) => searchUser(e.target.value)} />

            <div className="flex justify-between">
                <ButtonComponent id="addUser" text="ADD USER" on_click={handleAddUserClick} />
                <ButtonComponent id="refresh" text="REFRESH" on_click={() => toast.success('Users refreshed')} />
            </div>

            <TableComponent id="table">
                <>
                    <TheadComponent id="table" elements={{ 'userid': "USER ID", 'useremail': 'USER EMAIL', 'userpass': 'USER PASSWORD', "delUser": "DELETE USER" }} children={undefined} />
                    <TbodyComponent id="tableBody" elements={users} from="users" />
                </>
            </TableComponent>

            {showAddUserPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add User</h2>
                        <InputComponent id="useremail" type="email" placeholder="USER EMAIL" onChange={handleEmailChange} />
                        <InputComponent id="userpass" type="password" placeholder="USER PASSWORD" onChange={handlePasswordChange} />
                        <ButtonComponent id="addUser" text="Add User" on_click={handleAddUser} />
                        <ButtonComponent id="closePopup" text="Close" on_click={handlePopupClose} />
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};
