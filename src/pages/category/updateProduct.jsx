import React, {useState, useEffect} from 'react';
import './addCategory.scss'
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../api/firebase/config';
import { serverlog } from '../../serverlog';

const EditProducts = ({createProduct, closeModal, category, dataProduct, puid, cat, closeMod}) => {

    const [ data, setData ] = useState(dataProduct);

    const [ fileMngt, setFileMngt ] = useState([])
    const [ sizes, setSizes ] = useState({})
    const [urls, setUrls] = useState({});
    const [loader, setLoader] = useState(false);


    const [monitor, setMonitor] = useState("");

    useEffect(() => {

        setSizes(data.sizes);
        setUrls(data.photo);

    }, []);
    

    const base_url = serverlog.baseUrl;

    const handleFileChange = (e) => {

        const File = e.target.files[0];

        const keyNum = Math.floor(Math.random() * 999) + 1;

        if (urls[keyNum] === undefined) {

            setUrls( () => {

                return {
     
                 ...urls, 
                 [`photo${keyNum}`] : URL.createObjectURL(File)
     
                }
     
             } )
     
             fileMngt.push(File);
        }


    }

    const addPhoto = e => {

        e.preventDefault();
        const element = document.getElementById('productPhotos');
        element.click();

    }


    const handleEditProduct = (e) => {

        // e.preventDefault();

        // const buttonSubmit = document.getElementById('buttonSubmit');
        // const buttonSubmit2 = document.getElementById('buttonSubmitCat');
        // buttonSubmit2.style.display = 'none';
        // buttonSubmit.style.display = 'flex';
    
        // axios.post(`${base_url}/api/v1/${cat}/product/${puid}/update`, data)
        // .then( e => {

        //     if ( e.data.status ) {

        //         closeMod();

        //     }

        // } )

        // .catch((e) => console.log(e));

        
    
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

    }

    const handleModalBodyClose = (e) => {

        closeMod();

        setData({

            productName : "",
            photo : "",
            sizes : [],
            date_created : "",
            description : "",
            price : 9999,
            images : []
    
        })

        setFileMngt([]);

    }


    const uploading = async () => {

        const photoUpload = {};

        if (fileMngt.length) {
            
            for( let x = 0; x < fileMngt.length; x++ ) {

                const keyNum = Math.floor(Math.random() * 999999999999 * (x+1)) + 1;
    
                const storageRef = ref( storage, `photos / products / merc_creator_product_${keyNum}` );
        
                //uploading to firebase begins
                await uploadBytes(storageRef, fileMngt[x])
                .then( async () => {
                    
                    await getDownloadURL(storageRef)
                    .then( url => {
    
                            if( data.photo[keyNum] === undefined ){

                                photoUpload[keyNum] = url;

                            } else {

                                const keyNum2 = Math.floor(Math.random() * 999999999999 * (x+1)) + 1;
                                photoUpload[keyNum2] = url;

                            }
    
                        } )
                    
                });   
    
            }
        }

       return photoUpload;

    }
    

    const handleSubmit = (e) => {

        e.preventDefault();

        //setLoader(true);
        
        data.sizes = sizes;

        uploading().then( e => {
                
                
                axios.post(`${base_url}/api/v1/${cat}/product/${puid}/update`, { ...data, photo : { ...e, ...data.photo } })
                .then( e => {

                    if ( e.data.status ) {

                        setTimeout(() => {

                            setLoader(false);
                            handleModalBodyClose();
                            
                        }, 1000);

                    }

                } )

                .catch((e) => console.log(e));

            })

            const buttonSubmit = document.getElementById('buttonSubmit');
            const buttonSubmit2 = document.getElementById('buttonSubmitCat');
            buttonSubmit2.style.display = 'none';
            buttonSubmit.style.display = 'flex';

    }


    useEffect(() => {

    }, []);


    return (

        <div className="auth_login center-x center-y">

            <div className="closeModal" onClick = {() => closeMod() }></div>
            
            <div className="form_container addProductForm">

                <div className="p"> <strong>Update Product</strong> </div>

                <form id='login_form' className='allForm addProductForm'>

                    {/* //distribute System 1 */}

                    <div className="distributeForm">

                        <div className="formControl">

                            <label> <i className="fi fi-rr-shopping-bag"></i> Product Name</label>
                            <input type="text" required placeholder='Enter Product Name' name = "ProductName" value={data.ProductName} onChange = {handleChange} />

                        </div>

                        {/* <div className="formControl">

                            <label> <i className="fi fi-rr-text"></i> Product Description</label>
                            <textarea  cols="30" rows="4" required placeholder='Enter product desription' name = "description" value={data.description} onChange = {handleChange} ></textarea>

                        </div> */}

                        <div className="formControl">

                            <label> <i className="fi fi-rr-dollar"></i> Product Price</label>

                            <input type="text" required placeholder='Enter Product Price' name = "price" value= {data.price} onChange = {handleChange} />

                        </div>

                        <div className="formControl">

                            <label> Available Sizes </label>
                            
                            <div className="sizesPanel">

                                <div className="sizeFillArea">

                                    {
                                        Object.keys(sizes).length ? Object.entries(sizes).map( (res, index) => {

                                            return <div className="sizeInput" key = {index} >

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
                                    Object.keys(urls).length ? Object.entries(urls).reverse().map( (url, index) => {

                                        return (
                                        
                                        <div className="photoItem">

                                            <div className="photoSrc" name = {url[0]} > 

                                                <img src={url[1]} alt="product photos" /> 
                                                <div className="rm_photo" onClick={ () => handleDeletePhoto(url[0]) } > x </div>

                                            </div>
                                                
                                        </div>
                                        
                                        )

                                    } ) : null
                                }

                                <div className="addPhoto" onClick={addPhoto}>+</div>

                                <input type="file" name = "productimages" id = "productPhotos" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                            </div>

                            {/* <div className="previewImageXY">

                                <img src={url} alt={url} />

                            </div>

                            <input type="file" id = "categoryPhoto" required value= "" onChange = {(e) => handleFileChange(e)} accept = 'image/*' hidden/>

                            <div className="upload">

                               lus Adding

                            </div> */}

                        </div>

                        <button className='BUTTON_submit' onClick={handleSubmit} id='buttonSubmitCat' > + Update Product</button>

                        <button className='BUTTON_submit btn_load' id='buttonSubmit' > 
                        
                            <div className="justSubmit">

                               

                            </div>
                            
                            Updating Product...
                        
                        </button>

                    </div>

                     {/* //End distribute System 2 */}

                </form> 

            </div>

        </div>

    );
}

export default EditProducts;

