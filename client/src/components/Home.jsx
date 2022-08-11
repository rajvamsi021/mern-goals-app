import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from '../actions/userAction';
import Spinner from './Spinner';

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
        <p className='pt-5'>WELCOME</p>
        {loading ? (
          <Spinner />
        ) : (
        loginUser ? (
          <>
            <h1>{loginUser.name}</h1>
            <h2>Happy to see you back</h2>
          </>
        ) : (
          <>
            <h2>Home</h2>
          </>
        )
        )}
      </div>
    </>
  )
}

export default Home;