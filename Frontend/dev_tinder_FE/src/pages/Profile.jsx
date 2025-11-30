import React, { use } from 'react'
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import UserCard from '../components/UserCard';

const Profile = () => {

    const user = useSelector((state) => state.user);

    return (
        user && (
            <div >
                <EditProfile user={user}></EditProfile>              
            </div>
        )
    )
}

export default Profile