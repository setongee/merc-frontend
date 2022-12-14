import React, {useState, useEffect} from 'react';
import './addCategory.scss'
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../api/firebase/config';

const AddProduct = ({createProduct, closeModal, category}) => {

    const [ data, setData ] = useState({

        productName : "",
        sizes : [],
        date_created : "",
        description : "",
        price : 9999,
        photo : ''

    });

    const [ fileMngt, setFileMngt ] = useState(null)
    const [ sizes, setSizes ] = useState([])
    const [url, setUrl] = useState('https://firebasestorage.googleapis.com/v0/b/merchcreations-15ff6.appspot.com/o/general%2F57893-min.jpg?alt=media&token=28284e4d-d070-4ac2-8e31-e19a38d0b010');
    

    const handleFileChange = (e) => {

        const File = e.target.files[0];
        setFileMngt(File);

        const element = document.getElementById('filename');
        element.textContent = File.name;

        setUrl(URL.createObjectURL(File))

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

    const handleSizeAdd = (e) => {

        const targetPin = e.target;

        if(!targetPin.checked){

            console.log(e.target.value);

           const filter = sizes.filter( data => {
         
            return data !== e.target.value

           } );

           setSizes(filter);

        } else {

            sizes.push(e.target.value);
            
        }

    }

    const addPhoto = e => {

        e.preventDefault();
        const element = document.getElementById('categoryPhoto');
        element.click();

    }

    const uploading = async () => {

        const storageRef = ref( storage, `categories / ${category.toLowerCase()} / merccreator_product_${fileMngt.name.toLowerCase()}` );
    
            //uploading to firebase begins
            await uploadBytes(storageRef, fileMngt)
            .then( async () => {
                
                await getDownloadURL(storageRef)
                .then( url => {

                        createProduct( {...data, photo : url } );

                    } )
                
            });       

    }

    const handleSubmit = (e) => {

        data.sizes = sizes;

        if ( data.ProductName !== "" && data.displayName !== "" && fileMngt !== null, data.sizes.length !== 0 ) {
            
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

            productName : "",
            photo : "",
            sizes : [],
            date_created : "",
            description : "",
            price : 9999,
            images : []
    
        })

        setFileMngt(null)

    }

    useEffect(() => {

    }, [url]);


    return (

        <div className="auth_login center-x center-y">

            <div className="closeModal" onClick = {() => handleModalBodyClose() }></div>
            
            <div className="form_container addProductForm">

                <div className="p"> <strong>Add Product</strong> </div>

                <form id='login_form' className='addProductForm'>

                    {/* //distribute System 1 */}

                    <div className="distributeForm">

                        <div className="formControl">

                            <label> <i className="fi fi-rr-shopping-bag"></i> Product Name</label>
                            <input type="text" required placeholder='Enter Product Name' name = "ProductName" value={data.ProductName} onChange = {handleChange} />

                        </div>

                        <div className="formControl">

                            <label> <i className="fi fi-rr-text"></i> Product Description</label>
                            <textarea  cols="30" rows="4" required placeholder='Enter product desription' name = "description" value={data.description} onChange = {handleChange} ></textarea>

                        </div>

                        <div className="formControl">

                            <label> <i className="fi fi-rr-dollar"></i> Product Price</label>

                            <input type="text" required placeholder='Enter Product Price' name = "price" value={data.price.toLocaleString()} onChange = {handleChange} />

                        </div>

                        <div className="formControl">

                            <label> <i className="fi fi-rr-scale"></i> Available Sizes </label>
                            
                            <div className="sizes-mx">

                                <div className="size-des">
                                    
                                    <p>S</p>

                                    <input type= 'checkbox' name = "sizes" value= "s" onChange = {(e) => handleSizeAdd(e)} />

                                </div>

                                <div className="size-des">
                                    
                                    <p>M</p>

                                    <input type= 'checkbox' required name = "sizes" value= "m" onChange = {(e) => handleSizeAdd(e)} />

                                </div>

                                <div className="size-des">
                                    
                                    <p>L</p>

                                    <input type= 'checkbox' name = "sizes" value= "l" onChange = {(e) => handleSizeAdd(e)} />

                                </div>

                                <div className="size-des">
                                    
                                    <p>XL</p>

                                    <input type= 'checkbox' name = "sizes" value= "xl" onChange = {(e) => handleSizeAdd(e)} />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* //End distribute System 1 */}

                    {/* //distribute System 2 */}

                    <div className="distributeForm">
                        
                        <div className="formControl">

                            <div className="previewImageXY">
                                <img src={url} alt={url} />
                            </div>

                            <label> <i className="fi fi-rr-picture"></i> Product Image </label>
                            <input type="file" id = "categoryPhoto" required value= "" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                            <div className="upload">

                                <button onClick={addPhoto}> Choose Photo </button>
                                <p id = 'filename'> No Photo Chosen </p>

                            </div>

                        </div>

                        <button className='BUTTON_submit' onClick={handleSubmit} id='buttonSubmitCat' > + Add Product</button>

                        <button className='BUTTON_submit btn_load' id='buttonSubmit' > 
                        
                            <div className="justSubmit">

                                <lottie-player src="https://lottie.host/4bc258ff-6c53-4747-8bea-9f6afb6f8398/il76DAuXwT.json" background="transparent" speed="1" style={{ width : '200px', height : '200px'}} loop autoplay></lottie-player>

                            </div>
                            
                            Adding Product...
                        
                        </button>

                    </div>

                     {/* //End distribute System 2 */}

                </form> 

            </div>

        </div>

    );
}

export default AddProduct;

