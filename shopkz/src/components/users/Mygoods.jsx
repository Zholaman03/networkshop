import { useCallback, useEffect, useState } from "react"
import { myGoods } from "../../api/api"
import { Link, useLocation, useNavigate } from "react-router-dom"


const Mygoods = ()=>{
    const [mygoods, setMygoods] = useState([])
    const navigator = useNavigate()
    const location = useLocation()

    const truncateDescription = useCallback((description, maxLength) => {
        return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
      }, []);

    useEffect(()=>{
        document.title = 'Мой товары'
        localStorage.setItem('previousPath', location.pathname);
        const response = async ()=>{
            const goods = await myGoods();
            if(goods.success){
                setMygoods(goods.data)
            }else{
                navigator('/login');
                return
            }
        }
        response()
    }, [location.pathname, navigator])
   
    return(
        <div className="container mt-4">
            {mygoods.length === 0 && <h1>Пустой</h1>}
            <div className="row">
            {mygoods.map((good, index)=>(
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
                    <p className="card-text"><strong>Цена: {good.price} KZT</strong></p>
                   
                    </div>
                </div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default Mygoods