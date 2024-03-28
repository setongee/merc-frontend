import React, {useState, useEffect} from 'react';
import './addCategory.scss'
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../api/firebase/config';

const AddProduct = ({createProduct, closeModal, category}) => {

    const [ data, setData ] = useState({

        productName : "",
        sizes : {},
        date_created : "",
        description : "",
        price : 0,
        photo : []

    });

    const [ fileMngt, setFileMngt ] = useState({})
    const [ sizes, setSizes ] = useState({size1 : ""});
    const [urls, setUrls] = useState({});
    const [loader, setLoader] = useState(false);


    //console.log(urls)


    const handleFileChange = (e) => {

        const File = e.target.files[0];
        //setFileMngt(File);

        //const element = document.getElementById('filename');
        //element.textContent = File.name;

        const keyNum = Math.floor(Math.random() * 999) + 1;

        if (urls[keyNum] === undefined) {

            setUrls( () => {

                return {
     
                 ...urls, 
                 [`photo${keyNum}`] : {
                    view : URL.createObjectURL(File),
                    raw : File
                 }
     
                }
     
             } )
        }

    }

    const addPhoto = e => {

        e.preventDefault();
        const element = document.getElementById('productPhotos');
        element.click();

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


    const handleTheSizeAdding = () => {
        
        const mix = Math.floor(Math.random() * 999) + 1;

        if (sizes[mix] === undefined) {

            setSizes(() => {

                return {
    
                    ...sizes, [`sizes${mix}`] : ""
                    
    
                }
                
            });

        }

    }


    const handleSizeChange = e => {

        const {name, value} = e.target

        setSizes( size => {

            return {

                ...size,
                [name] : value

            }

        } )


    }

    const handleDeleteSize = (key) => {

        delete sizes[key];

        setSizes(() => {

            return {

                ...sizes
    
            }
        });

    }

    const handleDeletePhoto = (key) => {

        delete urls[key];

        setUrls(() => {

            return {

                ...urls
    
            }
        });

    };    

    const uploading = async () => {

        const photoUpload = {};

        const fileUrl = Object.entries(urls);

        if (fileUrl.length) {
            
            for( let x = 0; x < fileUrl.length; x++ ) {

                const keyNum = Math.floor(Math.random() * 999999999999 * (x+1)) + 1;
    
                const storageRef = ref( storage, `photos / products / merc_creator_product_${keyNum}` );
        
                //uploading to firebase begins
                await uploadBytes(storageRef, fileUrl[x][1].raw)
                .then( async () => {
                    
                    await getDownloadURL(storageRef)
                    .then( url => {
    
                            photoUpload[keyNum] = url;
    
                        } )
                    
                });   
    
            }
        }

       return photoUpload;

    }

    const handleSubmit = (e) => {

        setLoader(true);
        
        data.sizes = sizes;

        if ( data.productName !== "" && urls !== null, data.sizes.length !== 0 ) {
            
            uploading().then( e => {
                
                createProduct( { ...data, photo : e } );
                setLoader(false);
                handleModalBodyClose();

            })

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

        setSizes({});


    }

    //UseEffect of the lifecycle

    useEffect(() => {

    }, []);


    return (

        <div className="auth_login center-x center-y">

            <div className="closeModal" onClick = {() => handleModalBodyClose() }></div>
            
            <div className="form_container addProductForm">

                <div className="p"> <strong>Add Product</strong> </div>

                {/* <div className="headerAdding">

                    <p>Add A Product</p>

                    <button className='BUTTON_submit' onClick={handleSubmit} id='buttonSubmitCat' > + Add Product</button>

                </div> */}

                <div id='login_form' className='allForm addProductForm'>

                    {/* //distribute System 1 */}

                    <div className="distributeForm">

                        <div className="formControl">

                            <label> Product Name</label>
                            <input type="text" required placeholder='Enter Product Name' name = "ProductName" value={data.ProductName} onChange = {handleChange} />

                        </div>

                        <div className="formControl">

                            <label> Product Description</label>
                            <textarea  cols="30" rows="4" required placeholder='Enter product desription' name = "description" value={data.description} onChange = {handleChange} ></textarea>

                        </div>

                        <div className="formControl">

                            <label> Product Price</label>

                            <input type="text" required placeholder='Enter Product Price' name = "price" value={data.price.toLocaleString()} onChange = {handleChange} />

                        </div>

                        <div className="formControl">

                            <label> Available Sizes </label>
                            
                            <div className="sizesPanel">

                                <div className="sizeFillArea">

                                    {
                                        Object.keys(sizes).length ? Object.entries(sizes).map( (res, index) => {

                                            return <div key = {index} className="sizeInput">

                                                <input type="text" placeholder={`Enter Size`} name = {res[0]} value = {res[1]} onChange={handleSizeChange} />

                                                {
                                                    index !== 0 ? <div className="rm_input" onClick={ () => handleDeleteSize(res[0]) } > x </div> : <div className="rm_input" > </div> 
                                                }

                                            </div>

                                        } ) : null
                                    }

                                </div>

                                <div className="sizesButton" onClick = { () => handleTheSizeAdding() }  > Add Size </div>

                            </div>

                        </div>

                    </div>

                    {/* //End distribute System 1 */}

                    {/* //distribute System 2 */}

                    <div className="distributeForm">
                        
                        <div className="formControl">

                            <label className='restP'> Product Photos</label>

                            <div className="productPhotoBooth">

                                {
                                    Object.keys(urls).length ? Object.entries(urls).map( (url, index) => {

                                        return (
                                        
                                        <div className="photoItem" key = {index}>

                                            <div className="photoSrc" name = {url[0]} > 

                                                <img src={url[1].view} alt="product photos" /> 
                                                <div className="rm_photo" onClick={ () => handleDeletePhoto(url[0]) } > x </div>

                                            </div>
                                                
                                        </div>
                                        
                                        )

                                    } ) : null
                                }

                                <div className="addPhoto" onClick={addPhoto}>+</div>

                                <input type="file" id = "productPhotos" required value= "" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                            </div>

                            {/* <div className="previewImageXY">

                                <img src={url} alt={url} />

                            </div>

                            <input type="file" id = "categoryPhoto" required value= "" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                            <div className="upload">

                               lus Adding

                            </div> */}

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

                </div> 

            </div>

        </div>

    );
}

export default AddProduct;

