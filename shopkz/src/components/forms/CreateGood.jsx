import React, { useEffect, useState } from 'react';
import { getcategories, toSaveGood } from '../../api/api';
import { Link,    useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ImageUpload from './createComps/ImageUpload';
import 'react-notifications/lib/notifications.css';
const CreateGood = () => {

    const navigator = useNavigate()
    const [categories, setCategories] = useState([])
    const [saveGood, setSave] = useState({
        name: '',
        price: null,
        description: '',
        tel: '',
        category_id: null
    });

    const [imageList, setImages] = useState([])
    const [imagesofGood, setImagesofGood] = useState([])
    useEffect(()=>{
        document.title = 'Создать'
        const getCategories = async()=> {
            const {success, data} = await getcategories();
            if(success){
                setCategories(data.data)
            }
            
        }
        getCategories()
    }, [])
    const handleSubmit = async (e) => {
            e.preventDefault();
            if (saveGood.name.trim() === '' || saveGood.price === null || saveGood.price <= 0 || saveGood.description.trim() === '') {
                NotificationManager.info('Good name is null'); // 3 секундтан кейін жауапты тазарту
                return false;
            }
            
            const formData = new FormData();
            formData.append('name', saveGood.name)
            formData.append('price', saveGood.price)
            formData.append('description', saveGood.description)
            formData.append('tel', saveGood.tel)
            formData.append('category_id', saveGood.category_id)
            for (let i = 0; i < imagesofGood.length; i++) {
                formData.append('files', imagesofGood[i]);
              }

            const isSaved = await toSaveGood(formData);
            if(isSaved.success){
                navigator('/goods', {state: {message: isSaved.message}})
                return;
            }else{
              navigator('/login', {state: {message: isSaved.data.error}})
            }
            
             // 3 секундтан кейін жауапты тазарту
        
    };
    const uploadImage = (imageforFront, imageForBase)=>{
        setImages(imageforFront)
        setImagesofGood(imageForBase)
    }

    return (
        <div className="container my-5">
        <Link to={'/goods/'} className="btn btn-link mt-4">Назад</Link>
        <div className="card p-4 shadow-sm">
          <h3 className="mb-4">Создать обьявление</h3>
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <div className="col-md-6">
                <label htmlFor="name" className="form-label">Имя товара</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    onChange={(e) => setSave({ ...saveGood, name: e.target.value })} 
                    value={saveGood.name} 
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
                        setSave({ ...saveGood, price: value });
                      }
                    }} 
                    value={saveGood.price} 
                    placeholder='Введите цена товара'
                />
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="tel" className="form-label">Телефон номер</label>
                <PhoneInput
                  countries={['KZ']}
                    defaultCountry="KZ"
                    value={saveGood.tel}
                    onChange={(value) => setSave({ ...saveGood, tel: value })}
                    className="form-control"
                    placeholder="Введите телефон номер"
                    />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Описание</label>
                <textarea 
                className="form-control" 
                id="description" 
                onChange={(e) => setSave({ ...saveGood, description: e.target.value })} 
                value={saveGood.description} 
                placeholder='Введите описание'
                rows="9"
                />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Категорий</label>
              <select 
                className="form-select" 
                id="category" 
                onChange={(e)=>setSave({...saveGood, category_id: e.target.value})}
              >
                <option value="">Выбрать Категорий</option>
                {categories.map((e) => (
                  <option value={e.id} key={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <ImageUpload cbFunc={uploadImage} />
            <button type="submit" className="btn btn-primary">Создать</button>
          </form>
        </div>
  
        <div className="d-flex flex-wrap">
          {imageList.map((image, index) => (
      
              
                <img 
                 key={index}
                  src={image} 
                  alt={`Selected ${index}`} 
                  className=" m-2" 
                  width={100}
                />
              
       
          ))}
        </div>
  
        
      </div>
    );
};

export default CreateGood;
