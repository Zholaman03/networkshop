import React, { useEffect, useState } from "react"
import { login } from "../../api/apiAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const Loginform = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate()
    const location = useLocation()
    useEffect(()=>{
        document.title='Авторизация'
        if(location.state){
            if(location.state.status){
                NotificationManager.success(location.state.message, 'Click me!');
            }else{
            NotificationManager.error(location.state.message, 'Click me!');
            }
        }
    }, [location])
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {success, data} = await login(email, password);
        if(success){
            navigator('/profile', {state:{data}})
            window.location.reload();
        }else{
            NotificationManager.error(data)
        }
    }
    return(
        <div className="container m-3 d-flex justify-content-center">
            
            <form action="" onSubmit={handleSubmit}>
                <div className="w-100">
                    <input 
                    type="email" 
                    className="form-control mb-3"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Email"
                    />
                </div>
                <div className="w-100">
                    <input 
                    type="password" 
                    className="form-control mb-3"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="password"
                     />
                </div>
                <div className="w-100">
                    <button type="submit" className="btn btn-primary w-100">Вход</button>
                </div>
            </form>
        </div>
    )
}

export default Loginform