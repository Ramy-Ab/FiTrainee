import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { foodNutritionList } from "../../actions/foodAction";
import { Button } from "react-bootstrap";
import "./FoodTableR.css";

function FoodTableR({result}) {
  const dispatch = useDispatch();

  const foodNutrition = useSelector((state) => state.foodNutrition);
  const {success, error, loading, nutritions } = foodNutrition;

  
  console.log(result);

  useEffect(()=>{
    if(result)
    {console.log("useEffect trigred");
    console.log('state', loading, success)
    // console.log('function',  foodNutritionList(result))
    if(result){
      dispatch(foodNutritionList(result));}
    } else{
      dispatch(foodNutritionList("pizza"));
    }
   

    
  },[result])

   useEffect(() => {
      if (!loading && success){
    console.log("nutritions : ",nutritions[0]);
    console.log("sugar : ",nutritions[0].sugar_g);
    }else if(!(loading && success)){
      console.log("error",error);
    }
   }, [success])

  return (
    <div>
       {loading && <Loader />}
       <div className='item'>
        <div className='item-top'>
          <div className='item-head'>
            <h4>{nutritions[0]?.name}</h4>
          </div>
          
          <div className='item-content'>
            
            <div className='item-info'>
              <span className='item-info-a'>{nutritions[0]?.calories}</span>
              <span className='item-info-b'>Calories</span>
            </div>
            
            <div className='item-info'>
              <span className='item-info-a'>{nutritions[0]?.carbohydrates_total_g}</span>
              <span className='item-info-b'>Carbs</span>
            </div>
            
            <div className='item-info'>
              <span className='item-info-a'>{nutritions[0]?.protein_g}</span>
              <span className='item-info-b'>Protein</span>
            </div>
            
          </div>
        </div>
        
     
      </div> 
      
      {console.log("object")}
    </div>
  );
}

export default FoodTableR;
