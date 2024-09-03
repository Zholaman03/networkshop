import { useState } from "react";

const Filter = ({onSortChange})=>{
    const [sortOrder, setSortOrder] = useState('');
    
    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOrder(value);
        if (onSortChange) {
          onSortChange(value); // Apply sorting when value changes
        }
      };
    return(
    <div className="col-md">
      <form>
        {/* Price Range Filter */}
        <div className="form-group mb-3">
          <select
            id="sortBy"
            className="form-select w-100"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="">Сортировка</option>
            <option value="priceAsc">По возрастанию</option>
            <option value="priceDesc">По убыванию</option>
            <option value="dateNewest">Сначала новые</option>
            <option value="dateOldest">Сначала старые</option>
          </select>
        </div>
      </form>
    </div>
    )
}

export default Filter;