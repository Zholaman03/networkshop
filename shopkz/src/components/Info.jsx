import { useEffect } from "react";
import { Link } from "react-router-dom";

const Info = ()=>{
    useEffect(()=>{
        document.title = 'Главная страница'
    }, [])
    return(
        <div className="container mt-2">
            <h1> Интернет магазин </h1>
            <p className="fs-5">
            Это небольшой проект, созданный для моего портфолио. А также для того, 
            чтобы попробовать себя на практике. Я попытался сделать это, используя 
            библиотеку Reactjs и библиотеку Express js.  
           
            Не обращайте особого внимания, если возникает какой-либо дискомфорт! 
            Просто напишите мне <Link target="_blank" to={'https://wa.me/+77083328979'}>Whatsapp</Link>. Я думаю, что для начальных работ это норма.
            </p>
            <p className="fs-4">Функции:</p>
            <ul>
                <li>создание, удаление, редактирование товара</li>
                <li>Добавить в избранное.</li>
                <li>Авторизация.</li>
            </ul>
        </div>
    )
}

export default Info;