import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = () => {
    const loggedIn = localStorage.getItem('currentUser');

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Goals App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/goals'>Goals</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to='/logout'>Logout</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/register'>Sign Up</Link>
                        </li> */}

                        {localStorage.getItem('currentUser') ?
                        <li className="nav-item">
                            <Link className="nav-link" to='/logout'>Logout</Link>
                        </li> :
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/register'>Sign Up</Link>
                        </li>
                        </>}
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar