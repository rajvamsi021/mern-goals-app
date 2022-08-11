import React, { useEffect} from 'react'
//import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const Logout = () => {

    //const navigate = useNavigate();

    const callLogoutPage = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if(res.status !== 200) {
                throw new Error(res.error);
            }
        } catch(err) {
            localStorage.removeItem("currentUser");
            //navigate('/');
            window.location.href = '/';
            console.log(err);
        }

    }

    useEffect(() => {
        callLogoutPage();
    }, []);
  return (
    <Spinner />
  )
}

export default Logout;