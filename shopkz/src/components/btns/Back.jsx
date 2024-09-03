import { Link } from "react-router-dom"

const Back = ()=>{
    const previousPath = localStorage.getItem('previousPath') || '/';
    return(
        <div>
        <Link className="icon-link icon-link-hover" to={previousPath}>Назад</Link>
        </div>
    )
}

export default Back;