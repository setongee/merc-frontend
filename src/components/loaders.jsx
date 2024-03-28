import React from 'react';
import './loaders.scss'

import loader from '../assets/gif/loadingMerc.gif'

const Loaders = () => {

    return (

        <div className="loaders">

            <div className="loader"> <div className="imgArea"> <img src={loader} alt="loader" /> </div> </div> : null

        </div>

    );
}

export default Loaders;
