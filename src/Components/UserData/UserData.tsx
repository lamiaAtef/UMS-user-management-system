import AddUpdateForm from '../AddUpdateForm/AddUpdateForm'
import { useLocation } from 'react-router-dom';

export default function UserData() {
   const location = useLocation();
  return (
      
    <>
      <AddUpdateForm title={location?.state?.action} user={location?.state?.userData}></AddUpdateForm>
    </>
  )
}
