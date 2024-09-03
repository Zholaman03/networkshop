import { Link, Outlet, useLocation } from "react-router-dom"
import { NotificationContainer} from 'react-notifications';

import { useState, useEffect } from "react";



const Home = ()=>{
    const [auth, setAuth] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        
        const json =  JSON.parse(localStorage.getItem('user'));
       
        
        if (json && json.token) {
            // Токенді бөлшектеу
            const tokenParts = json.token.split('.');
            if (tokenParts.length === 3) {
                // Пейлоудты декодтау
                const payload = JSON.parse(atob(tokenParts[1]));
                const currentTime = Date.now() / 1000; // Ағымдағы уақытты секундпен алу
                // Токеннің мерзімін тексеру
                if (payload.exp < currentTime) {
                    // Токен мерзімі өтіп кеткен болса, авторизацияны өшіру
                    setAuth(false);
                    localStorage.removeItem('user');
                } else {
                    // Токен әлі жарамды болса, авторизацияны қосу
                    setAuth(true);
                }
            } else {
                setAuth(false); // Токен дұрыс емес болса
                localStorage.removeItem('user');
            }
        } else {
            setAuth(false); // Токен жоқ болса
        }
        
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setAuth(false); // Auth күйін жаңарту
    };
    
    return(
                <>
                <NotificationContainer/>
                <nav className="navbar navbar-expand-lg bg-dark ">
                    <div className="container-fluid nav-len">
                        <span className="navbar-brand text-white" >Интернет магазин</span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{borderColor: 'white'}}>
                            <span className="navbar-toggler-icon" style={{backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")"}}></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {/* Основное меню слева */}
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" aria-current="page" to={'/'}>Главная</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" aria-current="page" to={'/goods/'}>Все товары</Link>
                                </li>
                                {auth && (
                                <li className="nav-item">
                                    <Link className="nav-link active text-white" aria-current="page" to={'/goods/create'}>Создать объявление</Link>
                                </li>
                                )}
                               
                            </ul>
                            
                            
                            
                            <ul className="navbar-nav">
                                {auth ? (
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Профиль
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to={'/profile'}>Мой профиль</Link></li>
                                            <li><Link className="dropdown-item" to={'/mygoods'}>Мой товары</Link></li>
                                            <li><Link className="dropdown-item" to={'/favourites'}>Избранное</Link></li>
                                            <li><Link className="dropdown-item" onClick={handleLogout}>Выйти</Link></li>
                                        </ul>
                                    </li>
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={'/registr'}>Регистрация</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to={'/login'}>Вход</Link>
                                        </li>
                                    </>
                                )}
                            </ul>

                        </div>
                    </div>
                    </nav>
                <div>
                    <Outlet/>
                </div>
                
                </>
        
    )
}

export default Home;