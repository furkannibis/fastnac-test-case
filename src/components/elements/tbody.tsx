import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TBody } from "../../interfaces/elements";
import { TableDataComponent } from "./td";
import { ButtonComponent } from './button';
import { deleteItem } from '../../functions';
import { toast } from 'react-toastify';

export const TbodyComponent: React.FC<TBody> = ({ id, elements }) => {
    const location = useLocation();
    const [currentType, setCurrentType] = useState<string>('');
    const elementValues = Object.values(elements);

    useEffect(() => {
        setCurrentType(location.pathname.split('/')[1]);
    }, [location]);

    const handleDeleteItem = async (itemId: string, itemType: string) => {
        try {
            await deleteItem(itemId, itemType);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error("Silme işlemi başarısız oldu");
        }
    };

    return (
        <tbody>
            {elementValues.map((item, index) => (
                <tr key={index} className='text-center' id={item.id}>
                    {Object.keys(item).map((key) => (
                        <TableDataComponent key={key} id={`${id}-${key}`} value={item[key]} />
                    ))}
                    <TableDataComponent
                        id={`DELETE-${index}`}
                        value={
                            <ButtonComponent
                                id='deleteItem'
                                on_click={() => handleDeleteItem(item.id, currentType)}
                                text='DELETE'
                            />
                        }
                    />
                </tr>
            ))}
        </tbody>
    );

};
