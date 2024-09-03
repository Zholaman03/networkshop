import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';
import { getFavourites } from "../../api/api";
import AddProduct from "../AddToFavourite";

const Favourites = ()=>{
    const navigator = useNavigate()
    const location = useLocation()
    const [goods, setGoods] = useState([])
    useEffect(()=>{
        document.title = 'Мой избранное'
        const savedProducts = Cookies.get('favouriteProducts');
        const productIds = savedProducts ? JSON.parse(savedProducts) : [];
        localStorage.setItem('previousPath', location.pathname);
        const favourites = async ()=>{
            
            const res = await getFavourites({ids: productIds})
            if(!res.success){
                navigator('/login')
                return;
            }
            setGoods(res.data)
        }
        if(productIds.length !==0){
            favourites()
        }
        
    }, [location, navigator])

    const truncateDescription = (description, maxLength) => {
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
      };

    return(
      
        <div className="container mt-4">
            {goods.length === 0 && <h1>Пустой</h1>}
            <div className="row">
            {goods.map((good, index)=>(
            <div key={good.id} className="mb-3 col-md-4">
                <div className="card">
                    <img 
                    src={`http://localhost:3050/images/${JSON.parse(good.images)[0]}`} 
                    className="product-images" 
                    alt="Тауар Суреті" 
                    width={100} 
                    />
                    <hr />
                    <div className="card-body">
                    <h5 className="card-title">
                        <Link to={`/goods/${good.id}`}>
                        {truncateDescription(good.name, 15)}
                        </Link>
                    </h5>
                    <hr />
                    <p className="card-text desc">{truncateDescription(good.description, 50)}</p>
                    <hr />
                    <p className="card-text"><strong>Бағасы: {good.price} KZT</strong></p>
                    <div className="d-flex justify-content-between align-items-center">
                        <AddProduct goodId={good.id}/>
                    </div>
                    </div>
                </div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Favourites