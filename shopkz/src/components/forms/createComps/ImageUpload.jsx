
const ImageUpload = ({cbFunc})=>{

    const handleImagesChange = (event) => {
        const images = Array.from(event.target.files);
       
        if (images.length > 5) {
            const imgId = document.getElementById('img')
            imgId.value = ''
            alert("You can only upload a maximum of 5 images");
            
            return false;
        }
    
        const imagesArray = images.map((image) => URL.createObjectURL(image));
    
        images.forEach((image) => URL.revokeObjectURL(image));

        cbFunc(imagesArray, images)
        
    };
    return(
        <div className="mb-3">
            <label htmlFor="img" className="form-label">Загрузить фото</label>
            <input 
                className="form-control" 
                id="img"
                type="file" 
                accept="image/*"
                multiple 
                onChange={handleImagesChange} 
            />
        </div> 
    )
}

export default ImageUpload