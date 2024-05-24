import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'
import { TbLogout2 } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
import NikeLogo from '../../assets/NikeLogo.png'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 20, y: -500 })
  const token = localStorage.getItem("token")
  const user = token ? JSON.parse(token): null;
  const parasm = useParams();

  const handleLogout = async () => {
    localStorage.removeItem("token")
    navigate("/home")
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    console.log("entre al menu")
    setShowMenu(true)
    setMenuPosition({
      x: e.clientX, y: e.clientY
    })
  }


  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-black border-r shadow-sm ">
        <div style={{ marginLeft: '15rem' }}>
          <button style={{marginTop: '10px'}}onClick={handleLogout}>
            <TbLogout2 size={40} color="white" />
          </button>
        </div>
        <div className="p-4 pb-2 flex flex-col justify-between items-center">
          {/* Imagen del logo de Nike */}
          <div className="flex items-center justify-center" style={{ width: '100px', marginTop: '-7px' }}>
            <img
              src={NikeLogo}
              className={`overflow-hidden transition-all ${expanded ? "w-70" : "w-0"}`}
              alt="Nike Logo"
              color="white"
            />
          </div>

          {/* Información del usuario */}
          {user && (
          <div className={`transition-all duration-500 ${expanded ? "block" : "hidden"}`}>
            <div className="flex items-center justify-center mt-5">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png"
                className={`w-20 h-20 rounded-full overflow-hidden transition-all ${expanded ? "w-70" : "w-0"}`}
                alt="User Avatar" />
            </div>
            <div className="leading-4 mt-2 text-center text-white-600">
              <h4 className="font-semibold text-white">{user.username}</h4>
              <span className="text-xs text-gray-300">{user.email}</span>
            </div>
          </div>
          )}
        </div>


        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div
          className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            }`}
        >
        </div>
        {/*
        <div style={{ flexDirection: 'column', display: 'flex', padding: '7px', backgroundColor: '#575454', color: 'white', width: '160px', margin: '0 auto', borderRadius: '5px' }}>
          <button onClick={() => navigate(`/userUpdate/${user.user_id}`)}>Editar Perfil</button>
        </div>
        */}
        <div style={{ flexDirection: 'column', display: 'flex', padding: '5px', backgroundColor: '#000', color: 'white', width: '60px', height: '60px', margin: '0 auto', marginTop: '10px', marginBottom: '1px', borderRadius: '5px', marginLeft: '15rem' }}>
          <button onClick={() => navigate(`/userUpdate/${user.user_id}`)}>
            <IoSettingsSharp size={35} />
          </button>

        </div>
        
      </nav>
      <Dropdown
        show={showMenu}
        onHide={() => setShowMenu(false)}
        style={{ position: "fixed", top: menuPosition.y, left: menuPosition.x }}
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/userUpdate/${user.user_id}`)}>Editar Perfil</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert, route }) {
  const { expanded } = useContext(SidebarContext)
  const navigate = useNavigate()
  const location = useLocation();
  const isActive = location.pathname === route;

  const handleNavigation = (route) => {
    navigate(route)
  }

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${isActive
          ? "bg-white text-black"
          : "bg-black text-white"
        }
    `}
      onClick={() => handleNavigation(route)}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}