import React from 'react';
import Sample from '../../assets/images/merc.jpeg';

const Orders = () => {
    return (
        <div className="recentOrders">

                <div className="order_title">Recent Orders</div>

                <div className="order_headers">
                    <div className="headers no">No.</div>
                    <div className="headers sam">Sample</div>
                    <div className="headers prod">Product Name</div>
                    <div className="headers cat">Category</div>
                    <div className="headers">Status</div>
                    <div className="headers">Location</div>
                    <div className="headers">Quantity</div>
                    <div className="headers">Price</div>
                </div>

                <div className="order_headers_item">

                    <div className="headers no">1.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>


                <div className="order_headers_item">

                    <div className="headers no">2.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>


                <div className="order_headers_item">

                    <div className="headers no">3.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>

                <div className="order_headers_item">

                    <div className="headers no">4.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>

                <div className="order_headers_item">

                    <div className="headers no">5.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>

                <div className="order_headers_item">

                    <div className="headers no">6.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>

                <div className="order_headers_item">

                    <div className="headers no">7.</div>

                    <div className="headers sam">
                        <img src={Sample} alt="order sample" />
                    </div>

                    <div className="headers prod">Inspired by nature & mountains velvet.</div>

                    <div className="headers cat">T-Shirts</div>

                    <div className="headers">Enroute</div>

                    <div className="headers">Abuja</div>

                    <div className="headers">20</div>

                    <div className="headers">N45,500</div>
                </div>
                
            </div>
    );
}

export default Orders;
