import { Link, useLoaderData, useLocation} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import Contact from "./links/Contact";
import { isAuthenticated } from "./utils/authToken";
import {NotificationManager } from 'react-notifications';
import ImagesGoods from "./ImagesGoods";
import Delete from "./forms/DeleteGood";
import AddProduct from "./AddToFavourite";
import Back from "./btns/Back";
import LongText from "./btns/LongText";
import ProductRating from "./rate/ProductRating";


const OneProduct = ()=>{
    
    const good = useLoaderData()
    const location = useLocation();
   
    const auth = isAuthenticated();
    const user_id = localStorage.getItem('user')
    const userData = user_id ? JSON.parse(user_id) : null;
    
    useEffect(()=>{
        document.title = good.name
        if(location.state){
            if(!location.state.status){
                NotificationManager.error(location.state.message, 'Error')
            }else{
                NotificationManager.success(location.state.message, 'Successfuly!')
            }
          
        }
      
      
    }, [location])
    return(
        <div className="container mt-5 row">
            <ImagesGoods images={good.images}  />  
            <div className="col-md border border-2  d-flex justify-content-center product-description p-3">
                <div className="d-flex flex-column justify-content-between w-100 p-3">
                    <Back/>
                    <div className=" d-flex justify-content-between">
                        <div className="">Опубликован: {new Date(good.created_at).toLocaleDateString()}</div>
                        {auth && (
                        <AddProduct 
                        goodId={good.id}/>
                        )}
                    </div>
                    <div className="mt-3">
                        <h2 className=" text-dark">{good.name}</h2>
                        
                    </div>
                    <div className="mt-3">
                        <span className="fw-medium">Описание</span>
                        <LongText desc={good.description}/>
                    </div>
                    <div className="mt-3"><strong className="fs-4">{good.price} KZT</strong></div>
                    <Contact tel={good.tel}/>
                    {/* <ProductRating/> */}
                    <div className="mt-3">
                        <div>
                            Пользователь: 
                            <div>
                                {good.user_name}
                            </div>
                        </div>
                        <div>
                            Местоположение
                            <div>
                                <i>Пока не работает....</i>
                            </div>
                        </div>
                    </div>
                    {auth && userData.id === good.user_id && (
                    <div className="w-100 mt-3 row">
                        <div className="col">
                            <Link to={'/goods/'+good.id+'/edit'} className="btn btn-outline-primary w-100">Редактировать</Link>
                        </div>
                        <Delete idGood={good.id}/>
                    </div>
                    )}
                </div>
                
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default OneProduct;