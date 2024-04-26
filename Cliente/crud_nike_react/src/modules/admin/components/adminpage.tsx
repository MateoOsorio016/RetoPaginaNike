import React from 'react';
import  Sidebar, { SidebarItem }  from '../../../components/sidebar/sidebar';
import { ProductsList } from '../../products/components/productsList';
import{
    LifeBuoy,
    Receipt,
    ShoppingBagIcon,
    Package,
    UserCircle,
    BarChart,
    LayoutDashboard,
    Settings,
} from 'lucide-react'

export const Admin =() => {
    return(
        <div className='flex'>
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard />} text= "Dashboard" alert={false} active={true} route="/admin" ></SidebarItem>
                <SidebarItem icon={<ShoppingBagIcon />} text= "Productos" alert={false} active={true}  route="/productsList"></SidebarItem>
            </Sidebar>
        </div>
    )
}