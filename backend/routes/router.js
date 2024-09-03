const express = require('express')

//controllers
const getData = require('../controller/ProductController');
const category = require('../controller/CategoryController')
const UsersData = require('../controller/UserController');

//Midllewares
const checktoken = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadFile')

//libraries
const route = require('express').Router()

//without middlaWare, to get public products
route.get('/products', getData.getProducts)
route.get('/products/:goodId', getData.getOneProduct)
route.get('/categories', category.getAllCategories)
route.get('/products/category/:catId?', category.getProductsByCategoryId)
route.get('/search', getData.getProductsbySearch)

//for users
route.post('/login', UsersData.loginAuth)
route.post('/registr', UsersData.registr)
route.get('/profile', checktoken, UsersData.profile)
route.get('/mygoods', checktoken, getData.UserGoods)

//crud (create, update, delete)
route.post('/products', upload.array('files', 5), checktoken, getData.store)
route.put('/products/:goodId', upload.array('files', 5), checktoken, getData.update)
route.delete('/products/:goodId', checktoken, getData.destroy)
route.post('/favourites', checktoken, getData.getFavourites)
// route.post('/favourite', checktoken, getData.addtofavourite)
route.delete('/favourite/:goodId', checktoken, getData.deletefromfavourite)



module.exports = route