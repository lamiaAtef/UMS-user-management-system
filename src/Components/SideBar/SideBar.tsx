import React, { useContext, useState } from 'react'
import { AiOutlineProfile } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';
import { LuUsers } from 'react-icons/lu';
import { TiUserAddOutline } from 'react-icons/ti';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import hero from "../../assets/man.jpg"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { UserContext } from '../../Context/UserContext';

export default function SideBar() {
  let[collapsed,setCollapsed]=useState(false)
  let {userData} = useContext(UserContext);
  
  let toggleCollapse=()=>{
    console.log(collapsed)
    setCollapsed(!collapsed)
  }
  return (
    <div className='vh-100 sideBarContainer'>
      
      <Sidebar className='vh-100' collapsed={collapsed} >
        {
          collapsed ? <FaArrowRight  className='mx-3' onClick={toggleCollapse}/>
          :
          <FaArrowLeft className='mx-3' onClick={toggleCollapse}/>
        }
        
        <div className='text-center'> 
          <img src={userData.image} alt="" className='rounded-circle my-3  w-50'/>
          <h5>{userData.firstName}{userData.lastName}</h5>
          <h6 className='text-warning'>Admin</h6>
        </div>
          <Menu>
            <MenuItem icon={<IoHome />} component={<Link to="/dashboard" />}> Home</MenuItem>
            <MenuItem icon={<LuUsers />} component={<Link to="/dashboard/userlist" />}> Users</MenuItem>
            <MenuItem icon={<TiUserAddOutline />} component={<Link to="/dashboard/userData"  state={{action:"add User",userData:null}}/>}> AddUser</MenuItem>
            <MenuItem icon={<AiOutlineProfile />} component={<Link to="/dashboard/profile" state={{action:"profile",userData:null}}/>} > Profile</MenuItem>
            <MenuItem icon={<AiOutlineProfile />} component={<Link to="/login" />} onClick={() => localStorage.removeItem("userToken")} > Log Out</MenuItem>
            {/* localStorage.removeItem("userToken"); */}
          </Menu>
      </Sidebar>
    </div>
  )
}
