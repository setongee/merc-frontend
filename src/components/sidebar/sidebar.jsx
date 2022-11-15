import React,{useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './sidebar.scss'

const Sidebar = () => {

    let navigate = useNavigate();
    let location = useLocation();
    const {pathname} = location

    useEffect(() => {

        if(pathname === '/login'){
            document.querySelector('.sidebar').style.display = "none"
        } else{
            const active = document.querySelector('.active');
            active.classList.remove('active');
            const splitPathname = pathname.split('/')[1];
            const element = document.querySelector(`.${splitPathname}-li`);
            element.classList.add('active');
        }

        window.scroll(0,0)

    }, [pathname]);

    return (

        <div className="sidebar">

            <div className="links">

                <div className="link active dashboard-li -li" onClick={() => navigate('/dashboard')} >
                    <i className="fi fi-sr-apps"></i>
                </div>

                <div className="link orders-li" onClick={() => navigate('/orders')}>
                    <i className="fi fi-sr-shopping-bag"></i>
                </div>

                <div className="link category-li" onClick={() => navigate('/category')}>
                    <i className="fi fi-sr-label"></i>
                </div>

                <div className="link payments-li" onClick={() => navigate('/payments')} >
                    <i className="fi fi-sr-bank"></i>
                </div>

                <div className="link settings-li" onClick={() => navigate('/settings')}>
                    <i className="fi fi-sr-settings"></i>
                </div>

            </div>

        </div>
    );
}

export default Sidebar;
