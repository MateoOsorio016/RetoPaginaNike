import React, { useState, useEffect, createContext } from "react";
import { Link } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';







export const SidebarContext = createContext();

function useResponsiveSidebar() {
    const [isExpanded, setIsExpanded] = useState(window.innerWidth > 1024);  // Cambia aquí el breakpoint según tus necesidades

    useEffect(() => {
        const handleResize = () => {
            setIsExpanded(window.innerWidth > 1280);  // Cambiado a 1280px para expandir solo en pantallas aún más grandes
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Llama al inicio para establecer el estado inicial

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return [isExpanded, setIsExpanded];
}

export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useResponsiveSidebar(false);
    const [activeMenu, setActiveMenu] = useState(0);
    
    const location = useLocation();



 useEffect(() => {
    const path = location.pathname;

    // Esto determinará si el path actual contiene la palabra "clientes"
    if (path.includes('/clientes')) {
        setActiveMenu(1);
    } else if (path === '/') {
        setActiveMenu(0);
    } else {
        setActiveMenu(-1);
    }
}, [location.pathname]);
    


    const handleMenuClick = (index) => {
        setActiveMenu(index);
    };

    return (
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
            <div className="flex">
            <aside className={`h-full fixed z-30 transition-all duration-700 ease-in-out ${expanded ? "w-60" : "w-20"}`}>



            <nav className={`h-full flex flex-col bg-white absolute duration-700 ease-in-out ${expanded ? "w-80 xl:w-52 shadow-lg border-r md:fixed md:translate-x-0" : "w-20 lg:w-20 lg:border-r"}`}>
            <button
                    className={`ml-5 xl:ml-0 absolute z-50 top-6 ${expanded ? 'lg:-right-9 -right-9' : 'left-30 lg:left-[90px] lg:right-auto'} bg-white hover:bg-slate-100 rounded-lg text-slate-500 p-1`}
                    onClick={() => setExpanded(!expanded)}
                >
                    <Icons.Menu01Icon className={`transition-all duration-700 ease-in-out ${expanded ? '' : 'transform rotate-180'}`} size={24} />
            </button>


                        <center>
                            <div className={`p-4 pb-2 flex justify-center transition-all duration-300 ${expanded ? "block" : "hidden"}`}>
                                <img src={logoLambda} alt="Logo" className="w-40" />
                            </div>
                            
                            <div className={`p-4 pb-2 flex justify-center transition-all duration-300 ${!expanded ? "lg:block hidden" : "hidden"}`}>
                                <img src={icon} alt="Icon" className="w-12" />
                            </div>
                        </center>
                        <br />
                        <ul className={`flex-1 ${expanded ? "px-3" : "px-2"} overflow-auto ${expanded ? "block" : "hidden lg:block"}`}>
                            <li className="hover:bg-gray-200 mb-4">
                                <Link to="/" className={`flex ${expanded ? "justify-start" : "justify-center"} items-center p-2 ${activeMenu === 0 ? 'text-blue-500 border-l-4 border-blue-500' : ''}`} onClick={() => setActiveMenu(0)}>
                                    <Icons.Home01Icon className="text-lg mr-2" /><span className={`${expanded ? "ml-2" : "hidden"}`}>Inicio</span>
                                </Link>
                            </li>
                            <li className="hover:bg-gray-200">
                                <Link to="/clientes" className={`flex ${expanded ? "justify-start" : "justify-center"} items-center p-2 ${activeMenu === 1 ? 'text-blue-500 border-l-4 border-blue-500' : ''}`} onClick={() => setActiveMenu(1)}>
                                    <Icons.UserIcon className="mr-1" /><span className={`${expanded ? "ml-2" : "hidden"}`}>Clientes</span>
                                </Link>
                            </li>
                         </ul>
                        

                    
                        <div className={`border-t flex p-3 ${expanded ? "flex" : "hidden"} lg:flex`}>
                            <img src="https://ui-avatars.com/api/?background=random&name=David+Soto" alt="" className="w-10 h-10 rounded-md" />
                            <div className="flex flex-col justify-center ml-3">
                                <h4 className={`font-semibold ${expanded ? "flex" : "hidden"}`}>David Soto</h4>
                            </div>
                        </div>
                    </nav>
                </aside>
                <div className={`transition-al duration-700 flex-1 ${expanded ? "lg:pl-60" : "lg:pl-20 ml-8 mr-5"}`}>
                    {children}
                </div>


            </div>
        </SidebarContext.Provider>
    );
}