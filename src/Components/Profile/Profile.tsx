import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import AddUpdateForm from '../AddUpdateForm/AddUpdateForm';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  let {userData} = useContext(UserContext)
  console.log(userData?.firstName,"profile")



  return (
    // get user from local storage and pass it in user
    <>
    
       <AddUpdateForm title="profile" user={userData}></AddUpdateForm>
    </>
  )
}
