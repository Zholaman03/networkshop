import { useState } from "react"
import { search } from "../api/api"

const Search = ({cbFunc}) =>{
    const [nameGood, setnameGood] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(nameGood.trim() === ''){
            alert('Введите ')
            return false;
        }
        const getResponse = await search(nameGood.trim())
        

        cbFunc(getResponse)
    }
    
    return(
        <div className="col-md mb-2">
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control w-100" value={nameGood} onChange={e=>setnameGood(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-dark" disabled={nameGood.trim() ? false : true} type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search