import React, { useEffect, useState } from 'react';
import { getProducts, handleLogout, addProduct, findProduct } from "../functions";
import { Product } from "../interfaces/product";
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

export const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showAddProductPopup, setShowAddProductPopup] = useState<boolean>(false);
    const [newProductModel, setNewProductModel] = useState<string>('');
    const [newDescription, setNewDescription] = useState<string>('');
    const [newPartner, setNewPartner] = useState<string>('');
    const [newRegistrationDate, setNewRegistrationDate] = useState<string>('');
    const [newShipDate, setNewShipDate] = useState<string>('');
    const [newWarranty, setNewWarranty] = useState<string>('');
    const [newWarrantySupportStartDate, setNewWarrantySupportStartDate] = useState<string>('');
    const [newWarrantySupportstartEvent, setNewWarrantySupportstartEvent] = useState<string>('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProductClick = () => {
        setShowAddProductPopup(true);
    };

    const handlePopupClose = () => {
        setShowAddProductPopup(false);
    };

    const handleProductModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewProductModel(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewDescription(event.target.value);
    };

    const handlePartnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPartner(event.target.value);
    };

    const handleRegistrationDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRegistrationDate(event.target.value);
    };

    const handleShipDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewShipDate(event.target.value);
    };

    const handleWarrantyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewWarranty(event.target.value);
    };

    const handleWarrantySupportStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewWarrantySupportStartDate(event.target.value);
    };

    const handleWarrantySupportstartEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewWarrantySupportstartEvent(event.target.value);
    };

    const handleAddProduct = async () => {
        try {
            await addProduct({
                id: '',
                productModel: newProductModel,
                description: newDescription,
                partner: newPartner,
                registrationDate: newRegistrationDate,
                shipDate: newShipDate,
                warranty: newWarranty,
                warrantySupportStartDate: newWarrantySupportStartDate,
                warrantySupportstartEvent: newWarrantySupportstartEvent
            });


            const updatedProducts = await getProducts();
            setProducts(updatedProducts);
            toast.success('Product added successfully');
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error('Error adding product');
        } finally {
            setShowAddProductPopup(false);
        }
    };

    const handleLogoutClick = () => {
        handleLogout();
    };

    const searchProducts = async (value: string) => {
        const product = await findProduct(value)
        if (product) setProducts([product])
        if (value === '') {
            setProducts(await getProducts())
        }
    }


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

            <InputComponent id="SearchBar" placeholder="Search Product" type="text" onChange={(e) => {searchProducts(e.target.value)}} />

            <div className="flex justify-between">
                <ButtonComponent id="addProduct" text="ADD PRODUCT" on_click={handleAddProductClick} />
                <ButtonComponent id="refresh" text="REFRESH" on_click={() => toast.success('Products refreshed')} />
            </div>

            <TableComponent id="table">
                <>
                    <TheadComponent id="table" elements={{ 'productID': 'Product ID', 'productModel': 'PRODUCT MODEL', 'description': 'DESCRIPTION', 'partner': 'PARTNER', 'registrationDate': 'REGISTRATION DATE', 'shipDate': 'SHIP DATE', 'warranty': 'WARRANTY', 'warrantySupportStartDate': 'WARRANTY SUPPORT START DATE', 'warrantySupportstartEvent': 'WARRANTY SUPPORT START EVENT', "delProduct": "DELETE PRODUCT" }} children={undefined} />
                    <TbodyComponent id="tableBody" elements={products} from="products" />
                </>
            </TableComponent>

            {showAddProductPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add Product</h2>
                        <InputComponent id="productModel" type="text" placeholder="PRODUCT MODEL" onChange={handleProductModelChange} />
                        <InputComponent id="description" type="text" placeholder="DESCRIPTION" onChange={handleDescriptionChange} />
                        <InputComponent id="partner" type="text" placeholder="PARTNER" onChange={handlePartnerChange} />
                        <InputComponent id="registrationDate" type="text" placeholder="REGISTRATION DATE" onChange={handleRegistrationDateChange} />
                        <InputComponent id="shipDate" type="text" placeholder="SHIP DATE" onChange={handleShipDateChange} />
                        <InputComponent id="warranty" type="text" placeholder="WARRANTY" onChange={handleWarrantyChange} />
                        <InputComponent id="warrantySupportStartDate" type="text" placeholder="WARRANTY SUPPORT START DATE" onChange={handleWarrantySupportStartDateChange} />
                        <InputComponent id="warrantySupportstartEvent" type="text" placeholder="WARRANTY SUPPORT START EVENT" onChange={handleWarrantySupportstartEventChange} />
                        <ButtonComponent id="addProduct" text="Add Product" on_click={handleAddProduct} />
                        <ButtonComponent id="closePopup" text="Close" on_click={handlePopupClose} />
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};
