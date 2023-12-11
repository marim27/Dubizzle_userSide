import axios from "axios";
import { changLoader } from "../store/slices/loaders";
import store from './../store/store';

const axiosInstanceProducts= axios.create({
baseURL:'http://localhost:5555',
})

  // Create request interceptors
axiosInstanceProducts.interceptors.request.use((req)=>{
    store.dispatch(changLoader(true))
        return req
    },(err)=>{
        return Promise.reject(err)
    })

    // Create response interceptors
    axiosInstanceProducts.interceptors.response.use((res)=>{
        store.dispatch(changLoader(false))
    
        return res
    },(err)=>{
        return Promise.reject(err)
    })

export default axiosInstanceProducts;