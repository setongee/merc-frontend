import React, {useEffect, useState} from 'react';
import './category.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './products.scss'
import ProductItem from './productItem';
import Loaders from '../../components/loaders';
import CategoryEmpty from './categoryEmpty';
import AddProduct from './addProducts';
import EditProduct from './editProducts';
import EditProducts from './updateProduct';
import { serverlog } from '../../serverlog';
import { useNavigate } from 'react-router-dom';


const Products = () => {

    const base_url = serverlog.baseUrl

    const [ProductData, setProductData] = useState([]);
    const [dispalyName, setDisplayName] = useState("Category");
    const [loading, setloading] = useState(true);
    const [monitorActions, setMonitorActions] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [id_edit, setIdEdit] = useState(null);
    
    let params = useParams();
    let navigate = useNavigate();

    
    const deleteProduct = (id) => {

        console.log(id)

        axios.post(`${base_url}/api/v1/category/product/delete`, 
        {
            category : params.id,
            productId : id
        })
        .then( e => {
            
            setMonitorActions(!monitorActions);

        } )
    
    }

    const openEditProductModal = (index) => {

        setEditProduct(true);
        

    }
    
    const handleAddProduct = (categoryData) => {
    
        axios.post(`${base_url}/api/v1/${params.id}/product/add`, categoryData)
        .then( e => {
            setMonitorActions(e.data.message);
            setTimeout(() => {
    
                setAddProduct(false)
                
            }, 1000);
        } )
        .catch((e) => setMonitorActions(e.data.message));
    
    }
    
    const handleEditProduct = (productData, puid) => {

        
    
        axios.post(`${base_url}/api/v1/${params.id}/product/${puid}/update`, productData)
        .then( e => {
            setMonitorActions(e.data.message);
            setTimeout(() => {
    
                setEditProduct(false)
                
            }, 1000);
        } )
        .catch((e) => setMonitorActions(e.data.message));
    
    }
    
    const closeModalProduct = () => {
    
        setAddProduct(false);
        setEditProduct(false);
    
    }
    
    const openModalCategory = (id) => {
    
        setEditProduct(true);
        setIdEdit(id)
    
    
    }

    const monitorMe = (msg) => {
    
        setMonitorActions(msg)
    
    
    }

    useEffect( () => {


        const disp = params.id.split("_");
        
        const mapIn = disp.map(e=>{
            let y = e.split("")[0].toUpperCase() + e.substring(1).toLowerCase();
            return y;
        })

        let dispArr = mapIn.join(" ");


        setDisplayName(dispArr);


        const getProducts = async () => {

            
            try {
                
                const data = await axios.get(`${base_url}/api/v1/${params.id}/products`);

                if ( data.status === 200 ) {
                    setProductData(data.data.data)
                    setloading(false)
                } 
                
            } catch (error) {

                setloading(false)
                
            }
            

        }

        getProducts();
        
    }, [monitorActions]);


    return (

        <div className="dashboard">

            {
                loading ? <Loaders /> : null
            }

            <div className="page_title cato"> <div><span onClick={() => navigate('/category')}>{dispalyName}</span> / Products</div>  <div className="addCategory" onClick = {() => setAddProduct(true) } >Add Product</div>  </div>

            <div className="products">
                
                {
                    ProductData.length ? ProductData.map((res, index) => {

                        return <ProductItem key = {index} index = {index} res = {res.data} uid = {res.uid} deleteProduct = {deleteProduct} cat = {params.id} monitorMe = {monitorMe} monitor = {monitorActions} />   

                    }) : <CategoryEmpty type = 'products' />
                }             

            </div>

            {
                addProduct ? <AddProduct closeModal = {closeModalProduct} createProduct = {handleAddProduct} category = {dispalyName} /> : null
            }
            
        </div>

    );
}

export default Products;
