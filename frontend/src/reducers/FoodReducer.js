import {
    FOOD_NUTRITION_REQUEST,
    FOOD_NUTRITION_SUCCESS,
    FOOD_NUTRITION_FAIL,
} from '../constants/foodConstant';

export const foodNutritionReducer = (state = {loading : true,success : false ,nutritions : []},action) => {

    switch(action.type){
        case FOOD_NUTRITION_REQUEST : 
        return {...state,loading : true , nutritions : []}

        case FOOD_NUTRITION_SUCCESS : 
        return {
            ...state,
            success : true,
            loading : false,
            nutritions : action.payload
        }

        case FOOD_NUTRITION_FAIL : 
        return {...state,loading : false , error : action.payload,success : false}

        default : 
            return state
    }
}