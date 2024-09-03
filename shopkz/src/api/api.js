import axios from "axios"
import { authHeader } from "./apiAuth"
export async function getGoods(){
    try{
        const getgoods = await axios.get('http://localhost:3050/products')
        return {success: true, data: getgoods.data}
    }catch(error){
        return {success: false, data: error.message}
    }

}

export async function search(data) {
        try {
            const getgoods = await axios.get('http://localhost:3050/search', {params: {q: data}})
            return {success: true, data: getgoods.data}
        } catch (error) {
            return {success: false, data: error.response.data}
        }
}

export async function getcategories() {
    try{
        const category = await axios.get('http://localhost:3050/categories');
        return {success: true, data:category}
    }catch(error){
        return {success: false, data:error}
    }
}

export async function getCatsWithGood(url){
    try{
        const [goods, categories] = await axios.all([axios.get(url),axios.get('http://localhost:3050/categories')])
        return {success: true, data: [goods.data, categories.data]}
    }catch(error){
        return {success: false, data: error.message}
    }
}

export async function getGood(item){
    
    const getgoods = await axios.get('http://localhost:3050/products/'+item)
    
    return getgoods.data[0]
}

export async function toSaveGood(good){
    try{
        const getgoods = await axios.post('http://localhost:3050/products/', good, {headers: authHeader()})
        return {success: true, data:getgoods.data}
    }catch(error){
        return {success: false, data:error.response.data}
    }
   
}


export async function toUpdateGood({id, formData}){
    try{
        const getgoods = await axios.put('http://localhost:3050/products/'+id, formData, {headers: authHeader()})
    
        return getgoods.data
    }catch(error){
    
        return error.response.data
        
    }
}

export async function toDeleteGood(goodId){
    try{
    const getgoods = await axios.delete('http://localhost:3050/products/'+goodId, {headers: authHeader()})
      
        return getgoods.data
    }catch(error){
        
        return error.response.data
    }
    
}

export async function getFavourites({ids}) {
    try {
        const response = await axios.post('http://localhost:3050/favourites', {ids}, {headers: authHeader()})
        return {success: true, data: response.data}
    } catch (error) {
        return {success: false, data: error.message}
    }
}

export async function myGoods(){
    try {
        const response = await axios.get('http://localhost:3050/mygoods', {headers: authHeader()})
        return {success: true, data: response.data}
    } catch (error) {
        return {success: false, data: error.message}
    }
}



