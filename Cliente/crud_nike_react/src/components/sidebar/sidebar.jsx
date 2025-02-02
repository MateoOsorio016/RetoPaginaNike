import { Menu, ChevronLast, ChevronFirst } from "lucide-react"
import { useContext, createContext, useState, useEffect } from "react"
import { BiUser} from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom"
import { Dropdown } from 'react-bootstrap'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 20, y: -500 })
  const user = JSON.parse(localStorage.getItem("token"))
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
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
              }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst size={40} /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <button style={{paddingRight: "10px"}}onClick={handleContextMenu}><BiUser size={25}/></button>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
              }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">{user.username} </h4>
              <span className="text-xs text-gray-600">{user.email}</span>
            </div>
          </div>
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

export function SidebarItem({ icon, text, active, alert, route }) {
  const { expanded } = useContext(SidebarContext)
  const navigate = useNavigate()
  const handleNavigation = (route) => {
    navigate(route)
  }

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
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