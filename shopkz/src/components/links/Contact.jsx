import { NotificationManager } from "react-notifications";

const Contact = ({tel})=>{
    return(
        <div className="w-100 mt-3 row">
            <div className="col">
                <button type="button" onClick={()=>{NotificationManager.info('Пока не работает!')}} className="btn btn-outline-success w-100">Сообщение</button>
            </div>
            <div className="col">
                <a href={"tel:"+tel} className="btn btn-outline-primary w-100 link-tel">{tel}</a>
            </div>
        </div>
    )
}

export default Contact;