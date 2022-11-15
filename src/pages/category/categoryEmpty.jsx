import React from 'react';
import Empty from '../../assets/images/empty-cart.png'
import './empty.scss'

const CategoryEmpty = ({type}) => {

    return (

        <div className="empty">

            <div className="empty_icon">
                <img src={Empty} alt="Empty Icon" />
            </div>

            <p><strong>Sorry you do not have any created {type}.</strong></p>

        </div>

    );
}

export default CategoryEmpty;
