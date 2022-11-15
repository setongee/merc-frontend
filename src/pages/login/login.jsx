import React, {useState, useEffect} from 'react';
import './login.scss'

const Login = () => {

    const [ data, setData ] = useState({

        email : "",
        password : ""

    });

   const handleChange = ((e) => {

        const {name, value} = e.target

        setData( data => {

            return {

                ...data,
                [name] : value

            }

        } )

    })

    return (

        <div className="auth_login center-x center-y">

            <div className="form_container">

                <div className="p">Merc Creator Admin Login</div>

                <form id='login_form'>

                    <div className="formControl">

                        <label> <i className="fi fi-rr-envelope"></i> Email Address</label>
                        <input type="email" required placeholder='Enter Email Address' name = "email" value={data.email} onChange = {handleChange} />

                    </div>

                    <div className="formControl">

                        <label> <i className="fi fi-rr-lock"></i> Password</label>
                        <input type="password" required placeholder='Enter Password' value={data.password} onChange = {handleChange} name = "password"/>

                    </div>

                    <button className='BUTTON_submit'>Login to your account</button>

                </form> 

            </div>

            <p className="foot">Forgot Password?</p>

        </div>

    );
}

export default Login;
