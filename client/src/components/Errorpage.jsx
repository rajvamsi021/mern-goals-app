import React from 'react';
import { Link } from 'react-router-dom';

const Errorpage = () => {
  return (
    <>
        <div className='text-center mt-5'>
            <h1>404</h1>
            <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
            <p>
                The page you are looking for might have been removed had its name changed or is temporarily unavailable.
            </p>

            <Link className='nav-link text-primary text-decoration-underline' to='/'>Back to Homepage</Link>
        </div>
    </>
  )
}

export default Errorpage;