import React from 'react';
import  Sidebar, { SidebarItem }  from '../../../components/sidebar/sidebar';
import { FaStoreAlt } from "react-icons/fa";
import{
    User,
    ShoppingBagIcon,
    Package,
    
} from 'lucide-react'

export const Admin =() => {
    return(
        <div className='flex'>
            <Sidebar>
                <SidebarItem icon={<FaStoreAlt size={25} />} text= "Tienda" alert={false}  route="/home" ></SidebarItem>
                <SidebarItem icon={<User />} text= "Usuarios" alert={false}  route="/usersList"></SidebarItem>
                <SidebarItem icon={<ShoppingBagIcon />} text= "Productos" alert={false}   route="/productsList"></SidebarItem>
                <SidebarItem icon={<Package />} text= "Categorias" alert={false}  route="/categorysList"></SidebarItem>
            </Sidebar>
        </div>
    )
}