import { useNavigate } from "react-router-dom";
import { toDeleteGood } from "../../api/api";
import {NotificationManager } from 'react-notifications';
const Delete = ({idGood})=>{
    const navigate = useNavigate()
    const handleDelete = async (goodId)=>{
        const deleteMes = await toDeleteGood(goodId)
            if(deleteMes.success){
                navigate('/goods', {state: {message: deleteMes.name+' Deleted!'}})
                return;
            }
            
            NotificationManager.error(deleteMes.error, 'Вы не можете удалить!'); 
    }
    return(
        <div className="col">
            <button className="btn btn-outline-danger w-100 " onClick={()=>{handleDelete(idGood)}}>Удалить</button>
        </div>
    )
}

export default Delete;