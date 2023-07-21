import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useStateCart, useDispatchCart } from '../components/ContextReducer';
export default function Cart() {
  let state = useStateCart();
  let dispatch = useDispatchCart();
  if (state.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  // const handleRemove = (index)=>{
  //   console.log(index)
  //   dispatch({type:"REMOVE",index:index})
  // }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("User email is missing.");
      return;
    }
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    const response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({order_data:state, email: userEmail,order_date: new Date().toDateString()})
    });
    console.log("JSON RESPONSE:::::", response.response)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    } 
  }

  let totalPrice = state.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      {console.log(state)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' style={{ height: '400px', overflow: 'scroll' }} >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {state.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
