import React, { useContext, useState } from 'react';
import { AiOutlineProfile } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { TiUserAddOutline } from 'react-icons/ti';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Home'); // 👈 خليه ثابت بالأسماء نفسها
  const { userData } = useContext(UserContext);

  const toggleCollapse = () => setCollapsed(prev => !prev);

  return (
    <div className="vh-100 sideBarContainer">
      <Sidebar className="vh-100" collapsed={collapsed}>
        {collapsed
          ? <FaArrowRight className="mx-3" onClick={toggleCollapse} />
          : <FaArrowLeft className="mx-3" onClick={toggleCollapse} />
        }

        <div className="text-center">
          <img src={userData.image} alt="" className="rounded-circle my-3 w-50" />
          <h5>{userData.firstName}{userData.lastName}</h5>
          <h6 className="text-warning">Admin</h6>
        </div>

        {/* 🎯 هنا السحر: نلوّن الـ item الـ active */}
        <Menu
          menuItemStyles={{
            button: ({ active: isActive }) => ({
              // backgroundColor: isActive ? '#1976d2' : 'transparent',
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
            active={active === 'Home'}
            onClick={() => setActive('Home')}
            component={<Link to="/dashboard" />}
          >
            Home
          </MenuItem>

          <MenuItem
            icon={<LuUsers />}
            active={active === 'Users'}
            onClick={() => setActive('Users')}
            component={<Link to="/dashboard/userlist" />}
          >
            Users
          </MenuItem>

          <MenuItem
            icon={<TiUserAddOutline />}
            active={active === 'AddUser'}
            onClick={() => setActive('AddUser')}
            component={
              <Link to="/dashboard/userData" state={{ action: 'add User', userData: null }} />
            }
          >
            AddUser
          </MenuItem>

          <MenuItem
            icon={<AiOutlineProfile />}
            active={active === 'Profile'}
            onClick={() => setActive('Profile')}
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
