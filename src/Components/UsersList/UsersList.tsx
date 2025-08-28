import axios from 'axios'
import  { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { CiEdit } from 'react-icons/ci';
import { FaTrash } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from "../pagination/Pagination"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function UsersList() {

  interface user{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    birthDate:string;
    image:string;


  }
  let [userId, setUserId] = useState<null| number>(null)
  let [userData, setUserData] = useState<null| user>(null)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  let navigate = useNavigate()
  let moveToAddUser = ()=>{
    navigate("/dashboard/userData",{replace:false,state:{action:"add User",userData:null}}
      
    )
  }

  const handleShow = (user:user) => {
    setShow(true);
    setUserId(user.id)
    setUserData(user)
  }
  let [users,setUsers]=useState<user[]>([])
  let getUser=async()=>{
    try{
       let response = await axios.get("https://dummyjson.com/users")
       setUsers(response.data.users);
       console.log(users)


    }
    catch(error){
      console.log(error);
      
    } 
   }
    useEffect(()=>{
      getUser()
    },[])

    let deleteUser = async () =>{
      try{
         await axios.delete(`https://dummyjson.com/users/${userId}`)
        handleClose();
        toast.success(`${userId } is deleted`);


      }
      catch(error){
        toast.error(userId+"sorry can't delete this user")

      }

    }
   
    //pagination start
      const usersPerPage = 7;
      const [currentPage, setCurrentPage] = useState(1);
      const indexOfLastUser = currentPage * usersPerPage;
      const indexOfFirstUser = indexOfLastUser- usersPerPage;
      const currentUser = users.slice(indexOfFirstUser, indexOfLastUser);
      const handlePagination = (pageNumber:number)=>{setCurrentPage(pageNumber)}

    // pagination end
  
  return (
    <>
     

      <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>Are you sure you want to delete {userData?.firstName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='d-flex justify-content-between'>
        <h3>UsersList</h3>
        <button className='btn btn-warning text-white mx-3' onClick={moveToAddUser}>Add new user</button>
       
      </div>
       <hr/>


    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Profile</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>phone</th>
          <th>birthdate</th>
          <th>actios</th>

        </tr>
      </thead>
      <tbody>
      {
        currentUser.map((user)=>(
        <tr key={user?.id}>
          <td>{user.id}</td>
          <td><img src={user.image} className='w-25' alt="" /></td>
          <td>{user?.firstName}</td>
           <td>{user?.lastName}</td>
           <td>{user?.email}</td>
           <td>{user?.phone}</td>
           <td>{user?.birthDate}</td>
           <td>
            <CiEdit size={20}  className='text-warning ' onClick={()=> navigate("/dashboard/userData",{replace:false,state:{action:"update User",userData:user}})} />
            <FaTrash onClick={()=> handleShow(user)} size={20} className="text-danger mx-2" />
           </td>

        </tr>
        ))
      }
       
      </tbody>
    </Table>


     <Pagination usersPerPage={usersPerPage}  length={users.length} handlePagination={handlePagination} currentPage={currentPage}/>

    </>
  )
}
