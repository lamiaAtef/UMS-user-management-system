import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUpdateForm(props) {
    let navigate = useNavigate();
    let{title,user}=props;
    const [currentuser, setcurrentuser] = useState(user);
    const [isProfileMode, setIsProfileMode] = useState(true); // true = readOnly mode


    useEffect(() => {
    console.log(title, "title");

    if (title == "profile") {
      setIsProfileMode(true);
        console.log("profile",isProfileMode)

    } else {
      setIsProfileMode(false);
        console.log("profile",setIsProfileMode)

    }
  }, [title]);

    useEffect(() => {
          setcurrentuser(user);  
        }, [user]);

        let{register,
            handleSubmit,
            formState:{errors}
            }=useForm({defaultValues: user});
        

    let onSubmit = async(data)=>{
        let response = "";
        console.log(title)
        if(title =="add User")
        {
            console.log("add user")
             try{
              let response = await axios.post(`https://dummyjson.com/users/add`,data);
              toast.success("user added successfuly")
              navigate("/dashboard/userlist")
              


            }
            catch(error)
            {

                toast.error("sorry! Failed to add user ")
            }
        }
        else if(title == "update User"){
            console.log("update user")

            try{
                 console.log(user,user.id)
                try{
                   
                    let response = await axios.put(`https://dummyjson.com/users/${user.id}`,user);
                    toast.success("user updated successfuly")
                    navigate("/dashboard/userlist")
                }
                catch(error){
                    console.log(error)
                    toast.error("sorry ! faild to update")
                }
               
              


            }
            catch(error)
            {
                toast.error("sorry! Failed to update user ")
            }
        }
       


    }
   
  return (
  
    <>
      <div className='my-3 border-bottom border-muted mx-3' >
        <h3>{title}</h3>
      </div>
      
      <form action="" className='shadow-lg p-5 m-5' onSubmit={handleSubmit(onSubmit)}>
        <div className="row my-4">
            <div className="col-md-6">
                <label >first Name</label>
                <input className='form-control'
                 type="text" 
                 placeholder='Enter your first Name'
                readOnly={isProfileMode}  
                onChange={(e) => setcurrentuser({...user, firstName: e.target.value})}

                {...register("firstName",{required:"First Name is required !",
                    pattern:{value:/^[A-Za-z]{2,}$/,message:"enter char only , at least 3 char"}
                })}/>
                {errors.firstName&&<span className='text-danger'>{errors.firstName.message}</span>}
            </div>
             <div className="col-md-6">
                <label >last Name</label>
                <input  className='form-control'
                readOnly={isProfileMode}  
                 type="text" 
                  placeholder='Enter your last Name' 
                onChange={(e) => setcurrentuser({...user, lastName: e.target.value})}
                {...register("lastName",{required:"Last name is required !",
                 pattern:{value:/^[A-Za-z]{2,}$/,message:"enter char only , at least 3 char"}
                    
                })}
                />
                {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
            </div>
        </div>
         <div className="row my-4">
            <div className="col-md-6">
                <label >email</label>
                <input className='form-control' type="text" placeholder='Enter your email'
                  readOnly={isProfileMode}  
                 onChange={(e) => setcurrentuser({...user, email: e.target.value})}

                {...register("email",{
                    required:"email is required !",
                    pattern:{
                    value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:"email should be valid"

                 },
                })}
                />
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
            </div>
             <div className="col-md-6">
                <label >Age</label>
                <input  className='form-control' type="number"  placeholder='Enter your Age'
                  readOnly={isProfileMode}  
                 onChange={(e) => setcurrentuser({...user, age: e.target.value})}

                {...register("age",{required:"Age is required !",
                    max:{value:50,message:"your age should be less than or equal 50"},
                    min:{value:20,message:"your age should be greater than or equal 20"}})}
                />
                {errors.age&&<span className='text-danger'>{errors.age.message}</span>}
                 
            </div>
        </div>
         <div className="row my-4">
            <div className="col-md-6">
                <label >phone Number</label>
                <input className='form-control' type="text"placeholder='Enter your phone Number'
                 readOnly={isProfileMode}  
                onChange={(e) => setcurrentuser({...user, phone: e.target.value})}

                {...register("phone",{required:"phone is required" 
                   })}
                />
                {errors.phone&&<span className='text-danger'> {errors.phone.message}</span>}
            </div>
             <div className="col-md-6">
                <label >Birthdate</label>
                <input  className='form-control' type="text"  placeholder='Enter your BirthDate'
                 readOnly={isProfileMode}  
                onChange={(e) => setcurrentuser({...user, Birthdate: e.target.value})}

                {...register("birthDate",{required:"birthDate is required !"})}
                />
                {errors.birthDate&&<span className='text-danger'>{errors.birthDate.message}</span>}
            </div>
        </div>
        <div className='text-center'>
            <button className='w-50 btn btn-warning text-white mx-auto' disabled={isProfileMode} > Save </button>
        </div>
      </form>

    </>
  )
}
