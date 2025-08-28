import  { useContext, useState } from 'react';
import { AiOutlineProfile } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { TiUserAddOutline } from 'react-icons/ti';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const {pathname}=useLocation();
  console.log(pathname)

  const [active, setActive] = useState(pathname.split("/").at(-1));
  console.log(active,"active")
  const { userData } = useContext(UserContext)!;

  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <div className="vh-100 sideBarContainer">
      <Sidebar className="vh-100" collapsed={collapsed}>
        {collapsed
          ? <FaArrowRight className="mx-3" onClick={toggleCollapse} />
          : <FaArrowLeft className="mx-3" onClick={toggleCollapse} />
        }

        <div className="text-center">
          <img
            src={userData?.image || "/default-avatar.png"} // ✅ fallback صورة افتراضية
            alt={userData?.firstName || "Guest"}
            className="rounded-circle my-3 w-50"
          />
          <h5>
            {userData ? `${userData.firstName} ${userData.lastName}` : "Guest"}
          </h5>
          <h6 className="text-warning">Admin</h6>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ active: isActive }) => ({
              backgroundColor: isActive ? '#FEAF00' : 'transparent',
              color: isActive ? '#fff' : undefined,
              borderRadius: 8,
            }),
            icon: ({ active: isActive }) => ({
              backgroundColor: isActive ? '#FEAF00' : undefined,
              color: isActive ? '#fff' : undefined,
            }),
          }}
        >
          <MenuItem
            icon={<IoHome />}
            active={active === 'dashboard'}
            onClick={() => setActive('dashboard')}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<LuUsers />}
            active={active === 'userlist'}
            onClick={() => setActive('userlist')}
            component={<Link to="/dashboard/userlist" />}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<TiUserAddOutline />}
            active={active === 'userData'}
            onClick={() => setActive('userData')}
            component={
              <Link to="/dashboard/userData" state={{ action: 'add User', userData: null }} />
            }
          >
            AddUser
          </MenuItem>

          <MenuItem
            icon={<AiOutlineProfile />}
            active={active === 'profile'}
            onClick={() => setActive('profile')}
            component={
              <Link to="/dashboard/profile" state={{ action: 'profile', userData: null }} />
            }
          >
            Profile
          </MenuItem>

          <MenuItem
            icon={<AiOutlineProfile />}
            active={active === 'Logout'}
            onClick={() => {
              localStorage.removeItem('userToken');
              setActive('Logout');
            }}
            component={<Link to="/login" />}
          >
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
