import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import useFetch from './Hooks/use-fetch'
import { login } from '@/DB/ApiAuth'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'



const Signup = () => {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState(
    {email: '', password: ''});
   

    const navigate = useNavigate();
     let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e)=>{
      const {name, value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
 
   const {data, error, loading, fn:fnLogin} = useFetch(login,formData);

    const {fetchUser} = UrlState();

   useEffect(() => {
    console.log(data);
    if (error === null && data) {
       fetchUser();
       navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
   }, [data,error])
   

    const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, {abortEarly: false});
       await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <Card>
  <CardHeader>
    <CardTitle>Signup</CardTitle>
    <CardDescription>
    Create a new account if you haven&rsquo;t already
    </CardDescription>
     {errors && <Error message={errors.message} />}
  </CardHeader>
  <CardContent className='space-y-2'>
     <div className='space-y-1'>
      <Input 
        name='name' 
        type='text'  
        placeholder="Enter Name"
        onChange={handleInputChange}
        />
     </div>
     {errors.name && <Error message={errors.name} />}
     <div className='space-y-1'>
      <Input 
        name='email' 
        type='email'  
        placeholder="Enter Email"
        onChange={handleInputChange}
        />
     </div>
     {errors.email && <Error message={errors.email} />}
      <div className='space-y-1'>
      <Input 
        name='password' 
        type='password'  
        placeholder="Enter Password"
        onChange={handleInputChange}
        />
     </div>
      {errors.password && <Error message={errors.password} />}
  </CardContent>
  <CardFooter>
    <Button onClick={handleSignup}>
    {loading 
        ? 
      <BeatLoader size={10} color="#36d7b7"/> 
        : 
      'Signup'}
    
    </Button>
  </CardFooter>
</Card>
  )
}

export default Signup
