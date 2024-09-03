import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import "../css/style.css";
import LikeButton from "./LikeButton";
import { getCatsWithGood } from "../api/api";
import Categories from "./Categories";
import Search from "./Search";
import AddProduct from "./AddToFavourite";
import Pagination from "./pagination/Pagination";
import Filter from "./Filter";


const AllProducts = () => {
  const [cats, setCats] = useState([]);
  const [goods, setGoods] = useState([]);  
  const location = useLocation();
  const idCat = useParams();
  const datas = useLoaderData();
  

  const truncateDescription = useCallback((description, maxLength) => {
    return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
  }, []);

  useEffect(() => {
    document.title = 'Все товары'
    localStorage.setItem('previousPath', location.pathname); // save url in localStroge for Back link in OneProduct
    const url = idCat.catId 
      ? `http://localhost:3050/products/category/${idCat.catId}`
      : 'http://localhost:3050/products';

    const CatsAndGoods = async () => {
      const { data } = await getCatsWithGood(url);
      setCats(data[1]);
      setGoods(data[0]);
    };

    CatsAndGoods();
 
    
    if (location.state) {
      NotificationManager.success(location.state.message, 'Successfuly!');
    }
  }, [idCat.catId, location]);

//for searching goods
  const searching = useCallback((res) => {
    if (!res.success) {
      setGoods([]);
   
    } else {

      setGoods(res.data);
    }
  }, [idCat.catId, location.pathname, location.state]);

// for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // quantity of goods per page

  // Receipt of goods on the current page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = goods.slice(indexOfFirstProduct, indexOfLastProduct);

  //sort by ...
  const handleSortChange = (sortOrder) => {
    let sortedProducts = [...goods];
    switch (sortOrder) {
      case 'priceAsc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'dateNewest':
        sortedProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'dateOldest':
        sortedProducts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      default:
        break;
    }
    setGoods(sortedProducts);
  };

  // quantity of pages
  const totalPages = Math.ceil(goods.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //using useMemo
  const productCards = useMemo(() => currentProducts.map((good, index) => (
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
  )), [currentProducts, truncateDescription]);

  return (
    <div className="container mt-4">
      {!datas.success && <h1>{datas.data}</h1>}
      {datas.success && (
        <>
          <div className="row">
            <Search cbFunc={searching} />
            <Categories categories={cats} />
            <Filter onSortChange={handleSortChange}/>
          </div>
          <div className="row">
            {goods.length === 0 && <h1>Не найдено</h1>}
            {productCards}

          </div>
          <div className="d-flex justify-content-center mb-3">
          <Pagination 
          totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}/>
        </div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
