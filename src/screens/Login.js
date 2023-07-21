import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [info, setInfo] = useState({email:"",password:""})
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:info.email, password:info.password}))
        const response = await fetch("http://localhost:5000/api/loginuser",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({email:info.email, password:info.password})
        });
        const data = await response.json()
        console.log(data);

        if(!data.success){
          alert("Enter Valid Credentials !")
        }
        if(data.success){
          localStorage.setItem("userEmail", info.email)  //To store Token (which is fetched from database) to local storage
          localStorage.setItem("authToken", data.authToken)  //To store Token (which is fetched from database) to local storage
          console.log(localStorage.getItem("authToken"))
          navigate("/")
        }
    }

    const handleData = (event)=>{
      setInfo({...info,[event.target.name]: event.target.value})
    }

    return (
        <>
        <div className="container">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="mb-3 form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email" value={info.email}
                onChange={handleData}
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password" value={info.password}
                onChange={handleData}
              />
            </div>
            
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">New user</Link>
          </form>
        </div>
      </>
    )
}

export default Login