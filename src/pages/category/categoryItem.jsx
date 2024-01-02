import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EditCategory from './editCategory';
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({data, deleteFunction, openEdit}) => {

    const {photo, id, date_created, displayName} = data
    
    const dater = new Date(date_created._seconds * 1000);

    const [products, setProducts] = useState(0);

    const base_url = "https://walrus-app-fbyvn.ondigitalocean.app"

    let navigate = useNavigate();

    useEffect( () => {

        const getProductsNumber = async () => {

            
            try {
                
                const data = await axios.get(`${base_url}/api/v1/${id}/products`);

                if ( data.status === 200 ) {

                    setProducts(data.data.data.length);

                } 
                
            } catch (error) {

                console.log(error.message);
                
            }
            

        }

        getProductsNumber();
        
    }, []);

    return (
        
        <div className="category">

            <div className="deleteCategory" onClick={ ()=> deleteFunction(id) } ><i className="fi fi-rr-trash"></i></div>

            <div className="image_category">
                <img src={photo} alt="Merc Creator Category" />
                <div className="editFunction" onClick={() => openEdit(id) } ><i className="fi fi-sr-pencil"></i> Edit Category Details</div>
            </div>

            <div className="category_info">
                <div className="category_title">{displayName}</div>
                <div className="numProducts"><strong> {products} </strong> Products Added</div>
                <div className="lineThru"></div>
                <div className="create">Created <span><strong> {dater.toDateString()} </strong></span></div>
            </div>

            <div className="button_xy" onClick={ () => navigate(`/category/${id}/products`) } > View Products <i className="fi fi-rr-arrow-right"></i></div>

        </div>

    );
}

export default CategoryItem;
