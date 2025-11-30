import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';
import { useSelector } from 'react-redux';

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userStore = useSelector((state) => state.user);

    const getUserFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });

            if (res && res.data) {
                dispatch(addUser(res.data))
            }
        }
        catch (err) {
            console.error(err);
            if (err.status === 401)
                navigate('/login');
        }
    }

    useEffect(() => {
        if (!userStore)
            getUserFeed();
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Body;