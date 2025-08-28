import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout() {
  return (
    <>
        <div className="d-flex">
            <div className="vh-100" >
                <SideBar/>
            </div>
            <div className="w-100">
                <NavBar/>
                <Outlet/>
            </div>
        </div>

    </>
  )
}

