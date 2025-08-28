import  { useContext } from 'react'
import AddUpdateForm from '../AddUpdateForm/AddUpdateForm';
import { UserContext } from '../../Context/UserContext';

export default function Profile() {
  
  let {userData} = useContext(UserContext)
console.log(userData,"profileeee")


  return (
    // get user from local storage and pass it in user
    <>
    
       <AddUpdateForm title="profile" user={userData}></AddUpdateForm>
    </>
  )
}
