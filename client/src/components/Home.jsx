import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../actions/userAction';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.getAllUsersReducer);
  const { loading, loginUser, error } = userState;

  const callHomePage = async () => {
    dispatch(getAllUsers());
  }

  useEffect(() => {
    callHomePage();
  }, [dispatch]);



  return (
    <>
      <div className='text-center'>
        {loading ? (
          <Spinner />
        ) : (
        loginUser ? (
          <>
            <h1 className='mt-5'>Hello {loginUser.name}!</h1>
            <h4>Happy to see you back</h4>
            <p className='mt-5'>Check your goals list <Link className='text-decoration-underline text-primary h6' to='/goals'>here</Link> .</p>
          </>
        ) : (
          <>
            <h3 className='mt-5 mb-5'>This app allows you to set goals and enhance your physical motivation.</h3>
            <div className='mt-5 mb-5'>
              <h5 className='mb-3'>Are you having a habit of getting distracted?</h5>
              <h5 className='mb-3'>Do you want to transform yourself?</h5>
              <h5>Wanted to level up, get better and as fast as possible?</h5>
            </div>

            <div className='mt-5'>
              <p>If you belong to any of the above categories then, <Link className='text-decoration-underline text-primary' to='/register'>Register and start setting goals</Link></p>
            </div>
          </>
        )
        )}
      </div>
    </>
  )
}

export default Home;