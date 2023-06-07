import axios from "axios";
import { AppDispatch } from "../store";
import { workMenu, workOrder, workingError, workingLoader } from "./BeginSlice";
import { API, ORDERAPI } from "../../API/API";

export const getMenu = () => async (dispatch: AppDispatch) => {
    try{
        dispatch(workingLoader)
        const urlMenu = await axios.get(API)
        dispatch(workMenu(urlMenu.data))
    }catch(err: any){
        dispatch(workingError(err.message))
    }
}

export const getOrder = () => async (dispatch: AppDispatch) =>{
    const urlOrder = await axios.get(ORDERAPI)
    dispatch(workOrder(urlOrder.data))
} 