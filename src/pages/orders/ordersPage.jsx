import React, {useState, useEffect} from 'react';
import Orders from '../../components/orders/orders';
import './ordersPage.scss'
import '../dashboard/dashboard.scss'
import axios from 'axios';
import loader from  '../../assets/gif/loadingMerc.gif'
import { serverlog } from '../../serverlog';

const OrdersPage = () => {

    const base_url = serverlog.baseUrl

    const [ordersAmount, setOrdersAmount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [load, setLoad] = useState(true)


    useEffect(() => {

        const getOrders = async () => {

            const ordersData = await axios.get(`${base_url}/api/v1/orders`);
            if(ordersData.data.length) {
                const pi = ordersData.data.reduce( (a,b) => a+b );
                setOrdersAmount(pi);
            }

            const ordersRes = await axios.get(`${base_url}/api/v1/orders/get`);
            setOrders(ordersRes.data);

        }

        getOrders().then( () => setLoad(false) )

    }, []);

    
    return (

        <div className="dashboard">

            {
                load ? <div className="loader"> <div className="imgArea"> <img src={loader} alt="loader" /> </div> </div> : null
            }

            <div className="page_title">My Orders ({orders.length}) </div>
            
            <div className="ordersData">

                <Orders orders = { orders } />

            </div>

        </div>
    );
}

export default OrdersPage;
