import React from 'react';
import {Routes, Route, useNavigate, useRe} from 'react-router-dom'
import Category from '../pages/category/category';
import Products from '../pages/category/products';
import Dashboard from '../pages/dashboard/dashboard';
import Login from '../pages/login/login';
import OrdersPage from '../pages/orders/ordersPage';

const RouterClass = () => {

    return (

        <Routes>

            <Route path = "/">

                <Route path='dashboard' element = {<Dashboard/>} />
                <Route path='orders' element = {<OrdersPage/>} />
                <Route path='category' element = {<Category/>} />
                <Route path='category/:id/products' element = {<Products/>} />
                <Route index element = {<Dashboard/>} />

                <Route path='login' element = {<Login />} />


                {/* 404 Page Not Found */}
                <Route path="*" element = {<h1>Page not found</h1>} />

            </Route>

            
        </Routes>

    );
}

export default RouterClass;
