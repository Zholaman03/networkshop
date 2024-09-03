import { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "../../css/styleRegistr.css";
import { registr } from "../../api/apiAuth";
import { useNavigate } from "react-router-dom";
import { validatePassword } from "./validatePassword";
const Registr = ()=>{
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigator = useNavigate()

    const [showPasw, setshowPasw] = useState(false)
    const pasw2 = document.getElementById('confirmPasw')
    
    useEffect(()=>{document.title='Регистрация'}, [])
    
    const showPasword = ()=>{
        setshowPasw(!showPasw)
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if(users.name.trim() === '' || users.email.trim() === '' || users.password.trim() === ''){
            NotificationManager.error('Заполните!')
            return false;
        }
        const passwordError = validatePassword(users.password)
        if (passwordError) {
            NotificationManager.error(passwordError);
            return;
        }
        if(users.password !== pasw2.value){
            NotificationManager.error('Пароль не совпадает')
            return false;
        }
        const response = await registr(users)
        if(response.success){
            navigator('/login', {state: {message: response.data, status: true}})
            return
        }
        else{
            NotificationManager.error(response.data)
        }
    }

    return(
        <div className="container m-3 d-flex justify-content-center" >
            
            <form action="" onSubmit={handleSubmit} >
                <div className="w-100">
                    <input type="name" required value={users.name} className="form-control mb-3"  placeholder="Имя" autoComplete="off"
                    
                    onChange={(e)=>setUsers({...users, name: e.target.value})}/>
                </div>
                <div className="w-100">
                    <input type="email" required value={users.email} className="form-control mb-3"  placeholder="Почта" autoComplete="off"
                    onChange={(e)=>setUsers({...users, email: e.target.value})}
                    />
                </div>
                <div className="w-100 position-relative">
                    <input type={showPasw ? 'text' : 'password'} required value={users.password} className="form-control mb-3"  placeholder="Пароль" 
                    
                    onChange={(e)=>setUsers({...users, password: e.target.value})}
                    />
                    <FontAwesomeIcon icon={showPasw ? faEye : faEyeSlash} style={{cursor: 'pointer'}} onClick={showPasword}  className="position-absolute  showPassword"/>
                </div>
                <div className="w-100">
                    <input type={showPasw ? 'text' : 'password'} id="confirmPasw" className="form-control mb-3"  placeholder="Повторить Пароль" 
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary w-100">Регистрация</button>
                </div>           
            </form>
        </div>
    )
}

export default Registr;