import React, {useState, useEffect} from 'react';
import './addCategory.scss'
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../api/firebase/config';

const AddCategory = ({createCategoryFunc, closeModal}) => {

    const [ data, setData ] = useState({

        categoryName : "",
        displayName : "",
        photo : "",
        date_created : ""

    });

    const [ fileMngt, setFileMngt ] = useState(null)
    

    const handleFileChange = (e) => {

        const File = e.target.files[0];
        setFileMngt(File);

        const element = document.getElementById('filename');
        element.textContent = File.name;

    }

   const handleChange = ((e) => {

        const {name, value} = e.target

        setData( data => {

            return {

                ...data,
                [name] : value

            }

        } )

    })

    const addPhoto = e => {

        e.preventDefault();
        const element = document.getElementById('categoryPhoto');
        element.click();

    }

    const uploading = async () => {

        const storageRef = ref( storage, `categories / ${data.categoryName.toLowerCase()} / merccreator_category_${fileMngt.name.toLowerCase()}` );
    
            //uploading to firebase begins
            await uploadBytes(storageRef, fileMngt)
            .then( async () => {
                
                await getDownloadURL(storageRef)
                .then( url => {

                        createCategoryFunc( {...data, photo : url, categoryName : data.categoryName.replaceAll(' ', '_').toLowerCase() } )

                    } )
                
            });       

    }

    const handleSubmit = (e) => {

        if ( data.categoryName !== "" && data.displayName !== "" && fileMngt !== null ) {
            
            uploading();

            const buttonSubmit = document.getElementById('buttonSubmit');
            const buttonSubmit2 = document.getElementById('buttonSubmitCat');
            buttonSubmit2.style.display = 'none';
            buttonSubmit.style.display = 'flex';

        }    

    }

    const handleModalBodyClose = (e) => {

        closeModal();

        setData({

            categoryName : "",
            displayName : "",
            photo : "",
            date_created : ""
    
        })

        setFileMngt(null)

    }


    return (

        <div className="auth_login center-x center-y">

            <div className="closeModal" onClick = {() => handleModalBodyClose() }></div>
            
            <div className="form_container">

                <div className="p"> <strong>Add Category</strong> </div>

                <form id='login_form'>

                    <div className="formControl">

                        <label> <i className="fi fi-rr-shopping-bag"></i> Category Name</label>
                        <input type="text" required placeholder='Enter Category Name' name = "categoryName" value={data.categoryName} onChange = {handleChange} />

                    </div>

                    <div className="formControl">

                        <label> <i className="fi fi-rr-shopping-cart"></i> Display Name</label>
                        <input type="text" required placeholder='Enter what you want your customers to see' name = "displayName" value={data.displayName} onChange = {handleChange} />

                    </div>
                    
                    <div className="formControl">

                        <label> <i className="fi fi-rr-picture"></i> Cover Photo</label>
                        <input type="file" id = "categoryPhoto" required value= "" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                       <div className="upload">
                            <button onClick={addPhoto} >Choose Photo</button>
                            <p id = 'filename' >No Photo Chosen</p>
                       </div>


                    </div>

                    <button className='BUTTON_submit' onClick={handleSubmit} id='buttonSubmitCat' > Create Category</button>

                    <button className='BUTTON_submit btn_load' id='buttonSubmit' > 
                    
                        <div className="justSubmit">

                            <lottie-player src="https://lottie.host/4bc258ff-6c53-4747-8bea-9f6afb6f8398/il76DAuXwT.json" background="transparent" speed="1" style={{ width : '200px', height : '200px'}} loop autoplay></lottie-player>

                        </div>
                        
                        Creating Category...
                    
                    </button>

                </form> 

            </div>

        </div>

    );
}

export default AddCategory;

