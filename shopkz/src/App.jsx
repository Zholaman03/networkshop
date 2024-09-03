
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OneProduct from './components/OneProduct';
import { getFavourites, getGood, getGoods } from './api/api';
import AllProducts from './components/AllProducts';
import CreateGood from './components/forms/CreateGood';
import EditGood from './components/forms/EditGood';
import Home from './components/Home';
import Page404 from './components/Page404';
import Registr from './components/auth/Registr';
import Profile from './components/users/Profile';
import Loginform from './components/auth/Loginform';
import Favourites from './components/users/Favourites';
import Mygoods from './components/users/Mygoods';
import Info from './components/Info';
const App = ()=>{
        const routes = createBrowserRouter([
            {
                path: '/',
                element: <Home/>,
                errorElement: <Page404/>,
                children: [
                    {
                        path: '/',
                        element: <Info/>
                    },
                    {
                        path: '/profile',
                        element: <Profile/>
                        
                    },
                    {
                        path: '/mygoods',
                        element: <Mygoods/>
                    },
                    {
                        path: '/favourites',
                        element: <Favourites/>,
                        loader: getFavourites
                    },
                    {
                        path: '/goods',
                        element: <AllProducts/>,
                        loader: getGoods,
                        children: [
                            {
                                path: '/goods/category/:catId?',
                                element: <AllProducts/>
                            }
                        ]
                
                    },
                    {
                        path: '/goods/:goodId',
                        element: <OneProduct/>,
                        loader: async ({params})=>{ return getGood(params.goodId) }
                    },
                    {
                        path: '/goods/:goodId/edit',
                        element: <EditGood/>
                    },
                    {
                        path: '/goods/create',
                        element: <CreateGood/>
                    },
                    {
                        path: '/registr',
                        element: <Registr/>,
                        loader: getGoods
                    },
                    {
                        path: '/login',
                        element: <Loginform/>
                    }
                    
                ]
               
            },     
        ])
    return(
        <RouterProvider router={routes}/>
    )
}

export default App