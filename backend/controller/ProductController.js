const Product = require('../models/Product');

class ProductController {
    static async getProducts(req, res) {
        try {
            const products = await Product.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

    static async getOneProduct(req, res) {
        const { goodId } = req.params;
        try {
            const oneProduct = await Product.getOneProduct(goodId);
            if (!oneProduct) {
                return res.status(404).send('Табылмады');
            }
            res.json(oneProduct);
        } catch (err) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

    static async getProductsbySearch(req, res){
        const searchTerm = req.query.q
        try{
            const products = await Product.search(searchTerm)
            if(products.length == 0){
                return res.status(404).send('Не найдено')
            }
            res.json(products)
        }catch (err) {
            res.status(500).send('Ішкі серверлік қате');
        }
        
    }

    static async UserGoods(req, res){
        const userId = req.userId;
        try{
            const products = await Product.getUserGoods(userId);
            if(!products){
                return res.status(404).send('Не найдено');
            }
            res.json(products)
        } catch(error){
            res.status(500).send('Ошибка сервера')
        }
    }

    static async store(req, res) {

            const { name, price, description, tel, category_id } = req.body;
            const userId = req.userId;

            const imagePaths = req.files ? req.files.map(file => file.filename) : [];
          
            if (!name || !name.trim() || price == null || price <= 0 || tel == null || !description.trim() || !category_id || imagePaths.length == 0) {
                return res.status(400).json({ success: false, message: 'Қате мәліметтер' });
            }
            try {
                const isSavedProduct = await Product.saveProduct({ name, price, description, tel, imagePaths, userId, category_id });
                if (isSavedProduct) {
                    res.json({ success: true, message: "Сәтті жарияланды" });
                } else {
                    res.status(500).send('Өнімді сақтау сәтсіз аяқталды');
                }
            } catch (err) {
                res.status(500).send('Ішкі серверлік қате');
            }
     
    }

    static async update(req, res){
        const params = req.params.goodId
        const userId = req.userId
        const { name, price, description, tel, category_id} = req.body;
        const imagePaths = req.files ? req.files.map(file => file.filename) : [];
      
        if (!name || !name.trim() || price == null || price <= 0 || tel == null || !description.trim() || !category_id) {
            return res.status(400).json({ success: false, message: 'Некорректные данные' });
        }
        
        try {
            const isUpdated = await Product.updateProduct({name, price, description, tel, imagePaths, category_id, params, userId });
            if (isUpdated.affectedRows === 0) {
                return res.status(403).json({ success: false, message: 'Продукт не найден или у вас нет прав на удаление' });
            }
            if (isUpdated) {
                res.json({ success: true, message: "Успешно обновилось" });
            } else {
                res.status(500).send('Өнімді өзгерту сәтсіз аяқталды');
            }
        } catch (err) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

    static async destroy(req, res){
        const params = req.params.goodId
        const userId = req.userId
        try {
            const isDeleted = await Product.deleteProduct([params, userId]);
            if (isDeleted.affectedRows === 0) {
                return res.status(403).json({ success: false, message: 'Продукт не найден или у вас нет прав на удаление' });
            }
            if (isDeleted) {
                res.json({ success: true, message: "Успешно удален" });
            } else {
                res.status(500).send('Өнімді жою сәтсіз аяқталды');
            }
        } catch (error) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

    static async addtofavourite(req, res){
        const goodId = req.body.id;
        const userId = req.userId
    
        try{
            const isFavourited = await Product.addFavourite({ userId, goodId})
            if(isFavourited){
               
                res.json({success: true, isadded: true,  message: 'Добавлен в избранное'})
                
                
            }  else {
                res.status(500).send('Ошибкаа');
            }
        }catch (err) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

    static async getFavourites(req, res){
        
        const {ids} = req.body
     
        try{
            const response = await Product.favourites(ids)
            if(response){
               
                res.json(response);
            }
        }catch(error){
            res.status(500).send('Ошибка сервера')
        }
    }
    static async deletefromfavourite(req, res){
        const userId = req.userId
        const params = req.params.goodId
        try {
            const isDeleted = await Product.deleteFavourite({params, userId});
            if (isDeleted.affectedRows === 0) {
                return res.status(403).json({ success: false, message: 'Продукт не найден или у вас нет прав на удаление' });
            }
            if (isDeleted) {
                res.json({ success: true, message: "Убранно из избранное" });
            } else {
                res.status(500).send('Өнімді жою сәтсіз аяқталды');
            }
        } catch (error) {
            res.status(500).send('Ішкі серверлік қате');
        }
    }

}

module.exports = ProductController;
