import axios from 'axios'
import {
    FOOD_NUTRITION_REQUEST,
    FOOD_NUTRITION_SUCCESS,
    FOOD_NUTRITION_FAIL,
} from '../constants/foodConstant';

export const foodNutritionList = (keyword) => async(dispatch) => {
 
    try {
        dispatch({type : FOOD_NUTRITION_REQUEST})

        const config = {
            headers: {
                "X-Api-Key": "9AWK9Jt/hdW4RBKFSPPApQ==zDIOA8e7Ci1fw8hJ"
            }
        }

        const {data} = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(keyword)}`,config)
        dispatch({
            type : FOOD_NUTRITION_SUCCESS,
            payload : data.items
        })
    } catch (error) {
        dispatch({
            type : FOOD_NUTRITION_FAIL,
            payload : "error in getting food nutrition"
        })
    }
}