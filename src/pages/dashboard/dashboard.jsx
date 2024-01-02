import React, {useState, useEffect} from 'react';
import './dashboard.scss'
import {ReactComponent as Chart} from '../../assets/svg/chart.svg';
import {ReactComponent as ChartW} from '../../assets/svg/chart_white.svg';
import Orders from '../../components/orders/orders';
import axios from 'axios';
import loader from '../../assets/gif/loadingMerc.gif'

const Dashboard = () => {

    const base_url = "https://walrus-app-fbyvn.ondigitalocean.app"

    const [ordersAmount, setOrdersAmount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState(0)
    const [load, setLoad] = useState(true)


    useEffect(() => {

        const getOrders = async () => {

            const ordersData = await axios.get(`${base_url}/api/v1/orders`);
            const pi = ordersData.data.reduce( (a,b) => a+b );
            setOrdersAmount(pi);

            const ordersRes = await axios.get(`${base_url}/api/v1/orders/get`);
            setOrders(ordersRes.data);

            const getProducts = await axios.get(`${base_url}/api/v1/products`);
            setProducts(getProducts.data.data.length)

        }

        getOrders().then( () => setLoad(false) )

    }, []);


    return (

        <div className="dashboard">

            {
                load ? <div className="loader"> <div className="imgArea"> <img src={loader} alt="loader" /> </div> </div> : null
            }

            <div className="page_title">Dashboard</div>

            <div className="overview_cards">

                <div className="card">

                    <div className="icons">

                        <div className="main_icon"><i className="fi fi-sr-bank"></i></div>

                        <div className="chart_icon">

                            <svg xmlns="http://www.w3.org/2000/svg" width="29.47" height="19.757" viewBox="0 0 29.47 19.757">
                            <path id="Path_6792" data-name="Path 6792" d="M-6949.564,4765.537l7.228-8.779,6,1.594,3.931-6.221,8.342-2.384" transform="translate(6951.675 -4747.892)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                            </svg>


                        </div>

                    </div>

                    <div className="card_title">Total Payments</div>
                    <div className="value">N{ordersAmount.toLocaleString()}</div>

                    <div className="lineThru"></div>

                    <div className="date">Start from <span>1 Jan 2023</span></div>

                </div>

                <div className="card">

                    <div className="icons">

                        <div className="main_icon"><i className="fi fi-sr-shopping-bag"></i></div>

                        <div className="chart_icon">

                            <svg xmlns="http://www.w3.org/2000/svg" width="29.47" height="19.757" viewBox="0 0 29.47 19.757">
                            <path id="Path_6792" data-name="Path 6792" d="M-6949.564,4765.537l7.228-8.779,6,1.594,3.931-6.221,8.342-2.384" transform="translate(6951.675 -4747.892)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                            </svg>


                        </div>

                    </div>

                    <div className="card_title">Total Orders</div>
                    <div className="value">{orders.length}</div>

                    <div className="lineThru"></div>

                    <div className="date">Pending Orders : <span>24</span></div>

                </div>

                <div className="card">

                    <div className="icons">

                        <div className="main_icon"><i className="fi fi-sr-label"></i></div>

                        <div className="chart_icon">

                            <svg xmlns="http://www.w3.org/2000/svg" width="29.47" height="19.757" viewBox="0 0 29.47 19.757">
                            <path id="Path_6792" data-name="Path 6792" d="M-6949.564,4765.537l7.228-8.779,6,1.594,3.931-6.221,8.342-2.384" transform="translate(6951.675 -4747.892)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                            </svg>


                        </div>

                    </div>

                    <div className="card_title">Total Products</div>
                    <div className="value">{products}</div>

                    <div className="lineThru"></div>

                    <div className="date"><span> + Add New Product</span></div>

                </div>

                {/* <div className="card">

                    <div className="icons">

                        <div className="main_icon"><i className="fi fi-sr-user"></i></div>

                        <div className="chart_icon">

                            <svg xmlns="http://www.w3.org/2000/svg" width="29.47" height="19.757" viewBox="0 0 29.47 19.757">
                            <path id="Path_6792" data-name="Path 6792" d="M-6949.564,4765.537l7.228-8.779,6,1.594,3.931-6.221,8.342-2.384" transform="translate(6951.675 -4747.892)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
                            </svg>


                        </div>

                    </div>

                    <div className="card_title">Total Users</div>
                    <div className="value">3,257</div>

                    <div className="lineThru"></div>

                    <div className="date">Active Users : <span>2,450</span></div>

                </div> */}

            </div>

            {
                orders.length ? <Orders orders = {orders} /> : null
            }
            
        </div>

    );
}

export default Dashboard;
