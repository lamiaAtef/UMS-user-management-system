import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUpdateForm(props) {
    let navigate = useNavigate();
    let [isBtnDisabled,setIsBtnDisabled] = useState(true)
    let{title,user}=props;
    const [currentuser, setcurrentuser] = useState(user);
    const [isProfileMode, setIsProfileMode] = useState(true); // true = readOnly mode
    function formatDateForInput(dateString?: string) {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ""; // لو التاريخ invalid
        return date.toISOString().split("T")[0];
      }


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

    useEffect(()=>{
      // setIsBtnDisabled(true)
      console.log(isBtnDisabled,"setIsBtnDisabled")

    },[isBtnDisabled])

    useEffect(() => {
          setcurrentuser(user);  
        }, [user]);

        let{register,
            handleSubmit,
            formState:{errors},
            reset
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
  useEffect(() => {
  if (user) {
    reset({
      ...user,
      birthDate: formatDateForInput(user.birthDate), // نضمن التاريخ يبقى بصيغة صحيحة
    });
  }
}, [user, reset]);
   
  return (
  
    <>
      <div className='my-3 border-bottom border-muted mx-3' >
        <h3>{title}</h3>
      </div>
      
      <form action="" className='shadow-lg p-5 m-5' onSubmit={handleSubmit(onSubmit)}>
        <div className="row my-4">
            <div className="col-md-6">
                <label htmlFor="firstName">firstName</label>
                <input id="firstName" className='form-control'
                 type="text" 
                 placeholder='Enter your first Name'
                readOnly={isProfileMode}  
              


              
              {...register("firstName",{required:"First Name is required !",
                    pattern:{value:/^[A-Za-z]{2,}$/,message:"enter char only , at least 3 char"},
                     onChange:(e) => {
              setcurrentuser({ ...user, firstName: e.target.value });
              setIsBtnDisabled(false);
            }}
                )}/>
                {errors.firstName&&<span className='text-danger'>{errors.firstName.message}</span>}
            </div>
             <div className="col-md-6">
                <label htmlFor="lastName" >lastName</label>
                <input  id="lastName"className='form-control'
                readOnly={isProfileMode}  
                 type="text" 
                  placeholder='Enter your last Name' 
               

                {...register("lastName",{required:"Last name is required !",
                 pattern:{value:/^[A-Za-z]{2,}$/,message:"enter char only , at least 3 char"},
                onChange:(e) => {
              setcurrentuser({ ...user, lastName: e.target.value });
              console.log(currentuser,"setcurrentuser")
              setIsBtnDisabled(false);
            } 
                })}
                />
                {errors.lastName && <span className='text-danger'>{errors.lastName.message}</span>}
            </div>
        </div>
         <div className="row my-4">
            <div className="col-md-6">
                <label htmlFor="email" >email</label>
                <input  id="email" className='form-control' type="text" placeholder='Enter your email'
                  readOnly={isProfileMode}  
                 

                {...register("email",{
                    required:"email is required !",
                    pattern:{
                    value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:"email should be valid",

                 },
                  onChange:(e) => {
                                setcurrentuser({ ...user, email: e.target.value });
                                setIsBtnDisabled(false);
                              }
                })}
                />
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
            </div>
             <div className="col-md-6">
                <label htmlFor="Age" >Age</label>
                <input  id="Age" className='form-control' type="number"  placeholder='Enter your Age'
                  readOnly={isProfileMode}  
                

                {...register("age",{required:"Age is required !",
                    max:{value:50,message:"your age should be less than or equal 50"},
                    min:{value:20,message:"your age should be greater than or equal 20"},
                    onChange:(e) => {
                                setcurrentuser({ ...user, Age: e.target.value });
                                setIsBtnDisabled(false);
                              }})}
                />
                {errors.age&&<span className='text-danger'>{errors.age.message}</span>}
                 
            </div>
        </div>
         <div className="row my-4">
            <div className="col-md-6">
                <label htmlFor="phone" >phone Number</label>
                <input  id="phone" className='form-control' type="text"placeholder='Enter your phone Number'
                 readOnly={isProfileMode}  
                


                {...register("phone",{required:"phone is required" ,
                   onChange:(e) => {
              setcurrentuser({ ...user, phone: e.target.value });
              setIsBtnDisabled(false);
            }
                   })
                  }
                />
                {errors.phone&&<span className='text-danger'> {errors.phone.message}</span>}
            </div>
             <div className="col-md-6">
                <label  htmlFor="BD">Birthdate</label>
                <input id="BD" className='form-control' type="date"  placeholder='Enter your BirthDate'
                 readOnly={isProfileMode}  
               

                {...register("birthDate",{required:"birthDate is required !",
                   onChange:(e) => {
                              setcurrentuser({ ...user, birthDate: e.target.value });
                              setIsBtnDisabled(false);
                            }
                })}
                defaultValue={formatDateForInput(user?.birthDate)}                />
                {errors.birthDate&&<span className='text-danger'>{errors.birthDate.message}</span>}
            </div>
        </div>
        <div className='text-center'>
            <button className='w-50 btn btn-warning text-white mx-auto' disabled={isProfileMode || isBtnDisabled} > Save </button>
        </div>
      </form>

    </>
  )
}
