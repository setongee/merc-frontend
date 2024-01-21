import React,{useEffect, useState} from 'react';
import Sample from '../../assets/images/merc.jpeg';

const Orders = ({orders}) => {

    useEffect(() => {

        
        
    }, []);

    const convertTimeStamp = (timestamp) => {

        const formatDate = new Date(
           timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
        );

        return formatDate.toDateString();

    }

    return (

        <div className="recentOrders">

            <div className="order_title">Recent Orders</div>

            {/* <div className="order_headers">
                <div className="headers no">No.</div>
                <div className="headers sam">Sample</div>
                <div className="headers prod">Product Name</div>
                <div className="headers cat">Category</div>
                <div className="headers">Preferred Size</div>
                <div className="headers">Quantity</div>
                <div className="headers">Price</div>
                <div className="headers">Shipping State</div>
            </div> */}

            <div className="order_headers">

                <div className="headers no">No.</div>
                <div className="headers prod"> Date </div>
                <div className="headers ord"> Order ID</div>
                <div className="headers prod">Fullname</div>
                <div className="headers prod">Amount Paid</div>
                <div className="headers prod">Shipping Address</div>
                <div className="headers prod viewIn">Action</div>

            </div>


            {
                orders.length 
                ? 
                orders.map( (order, index) => (
                    

                    <div className="order_headers_item" key = {index} >

                        <div className="headers no">{index+1}.</div>

                        <div className="headers prod"> { convertTimeStamp(order.data.date) } </div>
                        
                        <div className="headers ord">MERCTRX_{order.data.ref.trxref}</div>
                        
                        <div className="headers prod">{order.data.shipping.firstname} {order.data.shipping.lastname}</div>

                        <div className="headers prod prod2"> N{(order.data.totalAmount).toLocaleString()} </div>

                        <div className="headers prod">{order.data.shipping.street}, {order.data.shipping.lgaResidence}, {order.data.shipping.stateResidence}</div>

                        <div className="headers prod"> <div className="viewIn"> View Order </div> </div>

                        {/* {
                            order.data.products.map( (res, index) => (

                                <>

                                    <div className="headers sam"> <img src={res.photo} alt="order sample" /> </div>

                                    <div className="headers prod"> {res.ProductName} </div>

                                    <div className="headers cat">{res.category}</div>

                                    <div className="headers">{res.preferredSize.toUpperCase()}</div>

                                    <div className="headers">{res.quantity}</div>

                                    <div className="headers"> N{ (res.quantity * Number(res.price)).toLocaleString() } </div>
                                
                                </>

                            ))
                        } */}

                    </div>

                 ) )

                : null
            }
                
        </div>
            
    );
}

export default Orders;
