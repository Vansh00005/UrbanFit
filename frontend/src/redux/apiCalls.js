import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import { publicRequest, userRequest } from "../requestMethods";
import {
   addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";


export const login=async (dispatch,user)=>{
    dispatch(loginStart());
    try{
const res=await publicRequest.post("/auth/login",user)
dispatch(loginSuccess(res.data));
    }
    catch(err){
        dispatch(loginFailure());
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
       const res = await userRequest.post(`/products`, product);
      dispatch(addProductSuccess(res.data));
      console.log("success");
    } catch (err) {
      dispatch(addProductFailure());
    }
  };