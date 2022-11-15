import React from 'react';
import './dashboard.scss'
import {ReactComponent as Chart} from '../../assets/svg/chart.svg';
import {ReactComponent as ChartW} from '../../assets/svg/chart_white.svg';
import Orders from '../../components/orders/orders';

const Dashboard = () => {

    return (

        <div className="dashboard">

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
                    <div className="value">N3,450,500</div>

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
                    <div className="value">109</div>

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
                    <div className="value">228</div>

                    <div className="lineThru"></div>

                    <div className="date"><span> + Add New Product</span></div>

                </div>

                <div className="card">

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

                </div>

            </div>

            <Orders />
            
        </div>

    );
}

export default Dashboard;
