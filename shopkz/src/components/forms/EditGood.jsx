import {Link, useNavigate, useParams } from "react-router-dom"
import { NotificationManager } from 'react-notifications';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useEffect, useState } from "react"
import { getGood, toUpdateGood, getcategories } from "../../api/api"
import ImageUpload from "./createComps/ImageUpload";
const EditGood = ()=>{
    const get_id = useParams()
    const [categories, setCategories] = useState([])
    const navigator = useNavigate()
    const [editGood, setEdit] = useState({
        name: '',
        price: null,
        description: '',
        tel: '',
        category_id: null
    });
    
    const [imageList, setImages] = useState([])
    const [imagesofGood, setImagesofGood] = useState([])
    useEffect( ()=>{
        document.title = 'Редактировать'
        const response = async ()=>{
            const response_id = await getGood(get_id.goodId)
            setEdit(response_id)
            setImages(JSON.parse(response_id.images))
        }
        response()
        const getCategories = async()=> {
            const {success, data} = await getcategories();
            if(success){
                setCategories(data.data)
            }
            
        }
        getCategories()
    }, [get_id.goodId])
   
    const updateHandle = async (e)=>{
        e.preventDefault()
        if (editGood.name.trim() === '' || editGood.price === null || editGood.price <= 0 || editGood.description.trim() === '') {
            NotificationManager.info('Good name is null'); // 3 секундтан кейін жауапты тазарту
            return false;
        }
        const formData = new FormData();
            formData.append('name', editGood.name)
            formData.append('price', editGood.price)
            formData.append('description', editGood.description)
            formData.append('tel', editGood.tel)
            formData.append('category_id', editGood.category_id)
            if(imagesofGood.length !== 0){
                for (let i = 0; i < imagesofGood.length; i++) {
                    formData.append('files', imagesofGood[i]);
                }
            }
        
        const updatedGood = await toUpdateGood({ id: get_id.goodId, formData });
        
        if(updatedGood.success){
            navigator('/goods/'+get_id.goodId, {state: {status: true, message: updatedGood.message}})
            return;
        }else{
            NotificationManager.error(updatedGood.error, 'Error')
            return;
        }
    }
    const uploadImage = (imageforFront, imageForBase)=>{
        setImages(imageforFront)
        setImagesofGood(imageForBase)
    }
    
    return(
        <div className="container my-5">
           <Link to={'/goods/'+get_id} className="btn btn-link mt-4">Назад</Link>
           <div className="card p-4 shadow-sm">
            <h3 className="mb-4">Редактировать обьявление</h3>
            <form onSubmit={updateHandle}>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Имя товара</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        onChange={(e) => setEdit({ ...editGood, name: e.target.value })} 
                        value={editGood.name} 
                        placeholder='Введите имя товара'
                    />
                </div>
                <div className="col-md-6">
                <label htmlFor="price" className="form-label">Цена</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="price" 
                    onChange={(e) => {
                      // Ensure only numeric values are allowed
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setEdit({ ...editGood, price: value });
                      }
                    }} 
                    value={editGood.price} 
                    placeholder='Введите цена товара'
                />
                </div>
            </div>
                <div className="mb-3">
                    <label htmlFor="tel" className="form-label">Телефон номер</label>
                    <PhoneInput
                        countries={['KZ']}
                        defaultCountry="KZ"
                        value={editGood.tel}
                        onChange={(value) => setEdit({ ...editGood, tel: value })}
                        className="form-control"
                        placeholder="Enter phone number"
                        />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Описание</label>
                    <textarea 
                    className="form-control" 
                    id="description" 
                    onChange={(e) => setEdit({ ...editGood, description: e.target.value })} 
                    value={editGood.description} 
                    placeholder='Введите описание товара'
                    rows="9"
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Категорий</label>
                    <select
                    className="form-select" 
                        id="category"
                        onChange={(e) => setEdit({ ...editGood, category_id: e.target.value })}
                        value={editGood.category_id || ''}
                    >   <option value="">Выбрать категорий</option>
                        {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                        ))}
                    </select>
                  
                </div>
                <ImageUpload cbFunc={uploadImage}/>
            
                
                <button type="submit" className="btn btn-primary">Редактировать</button>
            
            </form>
            </div>
            <div className="d-flex flex-wrap">
                    {imageList.map((image, index) => (
                        <img 
                            key={index} 
                            src={image.includes('localhost:3000') ? image : `http://localhost:3050/images/` + image}
                            alt={`Selected ${index}`} 
                            className=" m-2" 
                            width={100}
                        />
                    ))}
                </div>
        </div>
    )
}

export default EditGood