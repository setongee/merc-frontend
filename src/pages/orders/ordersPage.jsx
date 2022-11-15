import React from 'react';
import Orders from '../../components/orders/orders';
import './ordersPage.scss'

const OrdersPage = () => {
    return (
        <div className="dashboard">

            <div className="page_title">My Orders</div>
            
            <div className="ordersData">
                <Orders/>
            </div>

        </div>
    );
}

export default OrdersPage;
