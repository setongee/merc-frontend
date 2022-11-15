import React,{useEffect} from 'react';
import './header.scss'
import { useLocation } from 'react-router-dom';
import MercLogo from '../../assets/svg/merccreator_logo.svg'
//import User from '../../assets/svg/user.svg'

const User = 'https://firebasestorage.googleapis.com/v0/b/merchcreations-15ff6.appspot.com/o/general%2Fmemoji.svg?alt=media&token=dda8174a-0cb1-4218-baec-3fa4f668f0d9'


const Header = () => {

    let location = useLocation();
    const {pathname} = location

    useEffect(() => {

        if(pathname === '/login'){

            document.querySelector('.header').style.display = "none"

        }

        

    }, [pathname]);

    return (

        <div className="header">

            <div className="merc_logo">
               <img src={MercLogo} alt="Merccreator Logo" />
            </div>

            <div className="searchBar">
                <input type="text" placeholder='Search for transactions, items etc'/>
                <div className="action_button">Search</div>
            </div>

            <div className="accountArea">

                <div className="icons_header">

                    <i className="fi fi-rr-comment header_icon"></i>
                    <i className="fi fi-rr-bell header_icon"></i>

                </div>

                <div className="profile_holder">
                    
                    <div className="image_container">
                        <img src={User} alt="Account Image" />
                    </div>

                    <i className="fi fi-rr-angle-down"></i>

                </div>

            </div>

        </div>

    );
}

export default Header;
