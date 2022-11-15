import React from 'react';

const ProductItem = ({res, uid, deleteProduct }) => {

    return (
        
        <div className="product">

            <div className="deleteIcon" onClick={() => deleteProduct(uid) }>
                <i className="fi fi-rr-trash"></i>
            </div>

            <div className="photo_container">
                <img src={res.photo} alt="product image" />
            </div>

            <div className="content_net">

                <div className="title">{res.ProductName}</div>

                <div className="sizes">

                    <p> Available Sizes</p>

                    {
                        res.sizes.map( ( item, key ) => {
                            return <div className="size">{item.toUpperCase()}</div>
                        } )
                    }
                </div>

            </div>

            <div className="price"> N{ Number(res.price).toLocaleString() } </div>

        </div>
    );
}

export default ProductItem;
