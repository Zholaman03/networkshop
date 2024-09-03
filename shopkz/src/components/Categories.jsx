import { Link } from "react-router-dom"
import { Dropdown } from 'react-bootstrap';
import { useState } from "react";
const Categories = ({categories})=>{
    const [selectedCategory, setSelectedCategory] = useState("Выберите категорию");
    
    const handleSelect = (category)=>{
        setSelectedCategory(category)
    }
    
    return(
        <div className="col-md">
            <Dropdown >
                <Dropdown.Toggle   className="bg-dark text-white w-75" variant="success" id="dropdown-basic">
                    {selectedCategory}
                </Dropdown.Toggle>

                <Dropdown.Menu  className="custom-dropdown-menu">
                    <Dropdown.Item as={Link} onClick={()=>setSelectedCategory('Все')} to="/goods/">
                        Все
                    </Dropdown.Item>
                    {categories.map((cat) => (
                        <Dropdown.Item 
                        key={cat.id} as={Link} to={`/goods/category/${cat.id}`}
                        onClick={() => handleSelect(cat.name)}
                        >
                            {cat.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            
            
            <hr />
        </div>
    )
}

export default Categories;