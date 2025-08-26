import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  let {saveUserData} = useContext(UserContext)

  interface LoginFormInputs{
      username:string;
      password:string;
  }
  let {register,handleSubmit,formState:{errors}}=useForm<LoginFormInputs>();
  let navigate = useNavigate()
  
  const notify = () => toast('Wow so easy !');

  let onSubmit=async(data:LoginFormInputs)=>{

    try{

      let response = await axios.post('https://dummyjson.com/auth/login',data)
      localStorage.setItem("userToken",response?.data?.accessToken)
      toast.success("login Success")
      localStorage.setItem("userToken",response.data.accessToken)
      saveUserData()
      navigate("/dashboard")
    }
    catch(error){
      toast.error("sorry! login faild")
      console.log(error)
    }
  }
  

  return (
    <>

      <div className="container-fluid   login_container">
        <div className="row  vh-100 justify-content-center align-items-center">
          <div className="col-md-5 bg-white py-4">
            <div className="title text-center">
              <h3 className='mb-3 left_line_style fit-content m-auto ps-3'>User Management System</h3>
              <h4>Sign In</h4>
              <h5 className='text-muted'>
                Enter your credentials to access your account
              </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group my-3">
                  <label htmlFor="userName" >user Name</label>
                  <input id="userName" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username"

                  {...register("username",{required:"user name is requird!"})}
                  />
                  {errors.username && <span className='text-danger'>{errors.username.message}</span>}
                  
                
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="text" className="form-control" id="exampleInputPassword1" placeholder="Password"

                  {...register("password",{required:"password is required!"})}
                  />
                  {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                </div>
               
                <button type="submit" className="btn btn-warning w-100 text-white my-3">SIGN IN</button>
              </form>
          </div>
        </div>
      </div>
    </>
  )
}
