import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [info, setInfo] = useState({name:"",email:"",password:"",geolocation:""})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({name:info.name, email:info.email, password:info.password, location:info.geolocation})
        });
        const data = await response.json()
        console.log(data);

        if(!data.success){
          alert("Enter Valid Credentials !")
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
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" name="name" value={info.name} onChange={handleData}/>
          </div>
          <div className="mb-3 form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
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
          <div className="mb-3 form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="geolocation" value={info.geolocation}
              onChange={handleData}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
