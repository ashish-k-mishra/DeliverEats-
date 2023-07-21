import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

const Home = () => {
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      let data = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      data = await data.json();
      // console.log(data[0], data[1]);
      setFoodItem(data[0]);
      setFoodCat(data[1]);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Call the loadData function when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div><Carousal setSearch={setSearch} search={search}/></div>   {/* Pass setSearch as a prop */}
      <div className="cotainer">
        {
          foodCat !== []
          ? foodCat.map((data)=>{
              return ( <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem !== [] 
                ? foodItem.filter((items)=> (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())) )
                .map(filterItems =>{
                  return (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 "> 
                      <Card foodItem = {filterItems} options = {filterItems.options[0]}/> 
                    </div>
                  )
                })
              
                : <div>No such data found</div>
                }
                </div>
              )
          })
          : ""
        }
        </div>
      <div><Footer /></div>
    </div>
  );
};

export default Home;
