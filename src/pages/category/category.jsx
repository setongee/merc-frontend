import React, {useEffect, useState} from 'react';
import './category.scss'
import Tees from '../../assets/images/merc.jpeg'
import Tees2 from '../../assets/images/merc2.jpeg'
import Tees3 from '../../assets/images/merc3.jpeg'
import axios from 'axios';
import CategoryItem from './categoryItem';
import Loaders from '../../components/loaders';
import CategoryEmpty from './categoryEmpty';
import AddCategory from './addCategory';
import EditCategory from './editCategory';

const Category = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [monitorActions, setMonitorActions] = useState("");
    const [loading, setloading] = useState(true);
    const [addCart, setAddCart] = useState(false);
    const [editCart, setEditCart] = useState(false);
    const [id_edit, setIdEdit] = useState(null);

    const base_url = "https://stingray-app-69wlp.ondigitalocean.app"

    const deleteCategory = (id) => {

        const notify = window.confirm("Are you sure you want to delete this category?");

        if (notify) {

            setloading(true);

            axios.post(`${base_url}/api/v1/category/delete`, 
            {
                categoryName : id
            })
            .then( e => {
                setMonitorActions(e.data.message);
            } )
            .catch(() => setloading(false));

        }

    }

    const handleAddCategory = (categoryData) => {

        axios.post(`${base_url}/api/v1/category/add`, categoryData)
        .then( e => {
            setMonitorActions(e.data.message);
            setTimeout(() => {

                setAddCart(false)
                
            }, 1000);
        } )
        .catch((e) => setMonitorActions(e.data.message));

    }

    const handleEditCategory = (categoryData) => {

        axios.post(`${base_url}/api/v1/category/${id_edit}/update`, categoryData)
        .then( e => {
            setMonitorActions(e.data.message);
            setTimeout(() => {

                setEditCart(false)
                
            }, 1000);
        } )
        .catch((e) => setMonitorActions(e.data.message));

    }

    const closeModalCategory = () => {

        setAddCart(false);
        setEditCart(false)

    }

    const openModalCategory = (id) => {

        setEditCart(true);
        setIdEdit(id)
        console.log(id);


    }

    useEffect( () => {

        const getCategory = async () => {

            
            try {
                
                const data = await axios.get(`${base_url}/api/v1/category`);

                if ( data.status === 201 ) {
                    setCategoryData(data.data)
                    setloading(false)
                } 
                
            } catch (error) {

                setloading(false)
                
            }
            

        }

        getCategory();
        //console.log(data);

        // return () => {
        //     cleanup
        // };
        
    }, [monitorActions]);
    
    return (

        <div className='dashboard'>

            {
                loading ? <Loaders/> : null
            }

            <div className="page_title cato"> Category  <div className="addCategory" onClick = {() => setAddCart(true) } >Add Category</div> </div>

            <div className="categories">

                {
                    categoryData.length ? categoryData.map( (data, index) => {

                        return <CategoryItem data = {data.data} deleteFunction = {deleteCategory} key = {index} openEdit = {openModalCategory} />

                    } ) : <CategoryEmpty type = 'category' />
                }

            </div>

            {
                addCart ? <AddCategory closeModal = {closeModalCategory} createCategoryFunc = {handleAddCategory} /> : null
            }

            {
                editCart ? <EditCategory closeModal = {closeModalCategory} editCategoryDetails = {handleEditCategory} /> : null
            }

        </div>
    );
}

export default Category;
