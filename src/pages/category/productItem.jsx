import React, {useState, useEffect} from 'react';
import EditProducts from './updateProduct';

const ProductItem = ({res, uid, deleteProduct, editProduct, openEdit, cat, monitorMe, monitor }) => {

    const [ edit, setEdit ] = useState(false);

    const handleModalOpen = () => {

        setEdit(true);

    }

    const handleModalClose = () => {

        setEdit(false);

    }

    useEffect(() => {

        monitorMe(!monitor)

    }, [edit]);



    return (
        
        <div className="product">

            {
                edit ? <EditProducts dataProduct =  { res } puid = {uid} closeMod = {handleModalClose} cat = {cat} /> : null
            }

            <div className="deleteIcon" onClick={() => deleteProduct(uid) }>
                <i className="fi fi-rr-trash"></i>
            </div>

            <div className="hov edita" onClick={ () =>  handleModalOpen() } >Edit</div>

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
