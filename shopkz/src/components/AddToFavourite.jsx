import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

const AddProduct = ({goodId}) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const savedProducts = Cookies.get('favouriteProducts');
        if (savedProducts) {
          const productsArray = JSON.parse(savedProducts);
          if (productsArray.includes(goodId)) {
            setIsSaved(true); // Тауар кукиде бар болса, күйді өзгерту
          }
        }
      }, [goodId]);
    function handleToggle() {
            const savedProducts = Cookies.get('favouriteProducts');
            let productsArray = savedProducts ? JSON.parse(savedProducts) : [];

            if (isSaved) {
            // Егер тауар кукиде болса, оны жоямыз
            productsArray = productsArray.filter(id => id !== goodId);
            Cookies.set('favouriteProducts', JSON.stringify(productsArray), { expires: 7 });
            setIsSaved(false); // Жойылғаннан кейін күйді өзгерту
            } else {
            // Егер тауар кукиде болмаса, оны қосамыз
            productsArray.push(goodId);
            Cookies.set('favouriteProducts', JSON.stringify(productsArray), { expires: 7 });
            setIsSaved(true); // Сақталғаннан кейін күйді өзгерту
            NotificationManager.success('Товар сохранен на 7 дней! Через 7 дней товар будет убрано')
        }
      }
    
  
    return(
        <Button onClick={handleToggle} variant={isSaved ? 'danger' : 'primary'}>
            {isSaved ? 'Убрать из избранного' : 'Добавить в избранное'}
        </Button>
    )
}

export default AddProduct