import React, { useEffect, useState } from 'react'
import "../styles/Register.scss"
import {useNavigate} from "react-router-dom"
function RegisterPage() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null
  })
  console.log(formData)
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // console.log(event.target);
    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value
    })
  }

  // console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try{
         const register_form = new FormData()
         for(var key in formData){
          register_form.append(key, formData[key]);
         }
         const response = await fetch("http://localhost:3001/auth/register", {
          method: "POST",
          body: register_form
         })
         if(response.ok){
          navigate("/login")
         }
    }
    catch(error){
      console.log("Registration Filed", error.message)
    }
  }

  return (
    <div className='register'>
      <div className="register_content">
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input placeholder='First Name' name="firstName" value={formData.firstName} required onChange={handleChange} />
          <input placeholder='Last Name' name="lastName" value={formData.lastName} required onChange={handleChange} />
          <input placeholder='Email' name="email" type="email" value={formData.email} required onChange={handleChange} />
          <input placeholder='Password' name="password" type="password" value={formData.password} required onChange={handleChange} />
          <input placeholder='Confirm Password' name="confirmPassword" type="password" value={formData.confirmPassword} required onChange={handleChange} />
          {!passwordMatch && (
            <p style={{color: "red"}}>passwords are not matched !</p>
          )}
          <input type="file" name="profileImage" accept='image/*' style={{ display: "none" }} id='image' onChange={handleChange} />
          <label htmlFor="image">
            <img src="/assets/uploadPhoto.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>
          {formData.profileImage && (
            <img src={URL.createObjectURL(formData.profileImage)} alt="profile photo" style={{ maxWidth: "80px" }} />
          )}
          <button type="submit" disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>

      </div>
    </div>
  )
}

export default RegisterPage