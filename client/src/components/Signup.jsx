import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const inputHandler = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
    }

    const registerHandler = async (e) => {
        e.preventDefault();

        const res = await fetch("/register", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                cpassword: userData.cpassword
            })
        });

        const data = await res.json();

        if(res.status === 400 || !data) {
            toast.error(data.error, {position: "top-right", autoClose:5000});
        }
        else {
            toast.success(data.message, {position: "top-right", autoClose:5000});
            navigate('/login');
        }



    }


  return (
    <>
    <div className='container mt-5 text-center'>
        <ToastContainer />
        <h2 className='mb-5'>Sign Up</h2>
        <form method='POST'>
            <div className='form-group mb-3'>
                <label htmlFor='name'> <i className='zmdi zmdi-account me-2'></i></label>
                <input
                    className='ms-2'
                    type='text'
                    name='name'
                    value={userData.name}
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Enter your name'
                />
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='email'> <i className='zmdi zmdi-email me-2'></i></label>
                <input
                    className='ms-2'
                    type='email'
                    name='email'
                    value={userData.email}
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Enter your email'
                />
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='password'> <i className='zmdi zmdi-lock me-2'></i></label>
                <input
                    className='ms-2'
                    type='password'
                    name='password'
                    value={userData.password}
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Enter your passowrd'
                />
            </div>

            <div className='form-group mb-3'>
                <label htmlFor='name'> <i className='zmdi zmdi-lock me-2'></i></label>
                <input
                    className='ms-2'
                    type='password'
                    name='cpassword'
                    value={userData.cpassword}
                    onChange={inputHandler}
                    autoComplete='off'
                    placeholder='Confirm password'
                />
            </div>

            <div className='form-group'>
                <input type='submit' name='register' className='form-submit mt-3' value='Register' onClick={registerHandler}/>
            </div>
        </form>
        <div className='mt-3'>
            <Link className='text-decoration-underline text-primary' to='/login'>Already have an account</Link>
        </div>
    </div>
    </>
  )
}

export default Signup;