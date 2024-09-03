import axios from "axios"

export const authHeader = ()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user && user.token){
        
        return {Authorization: 'Bearer '+user.token}
    }else{
        
        return {}
    }
}
export async function login(email, password){
    try{
        const getgoods = await axios.post('http://localhost:3050/login', 
            {
                email: email,
                password: password
            })
        localStorage.setItem('user', JSON.stringify(getgoods.data))
        return {success: true, data: getgoods.data}
    }catch(error){
       
        return {success: false, data: error.response.data}
    }

}

export async function profile() {
    try {
        const profile = await axios.get('http://localhost:3050/profile', 
            {headers: authHeader()}
        )
        
        return {success: true, data: profile.data}
        
    } catch (error) {
        return {success: false, data: error.response.data}
        
    }
}

export async function registr(params) {
    try {
        const response = await axios.post('http://localhost:3050/registr', params)
        return {success: true, data: response.data.message}
        console.log(response)
    } catch (error) {

        console.log(error)
        return {success: false, data: error.response.data.message}
    }
}
