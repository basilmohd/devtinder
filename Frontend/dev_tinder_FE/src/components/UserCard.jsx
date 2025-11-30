import React from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const {_id,firstName,lastName,gender,photoUrl,age,about} = user;
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const handleSendRequest = async (status, requestid) => {   
        try{
            const resp = await axios.post(BASE_URL + '/request/send/'+status+'/'+requestid, {}, { withCredentials: true });
            console.log(resp);
            dispatch(removeFeed(_id));
        }
        catch(err)  {
            console.error(err);
        }   
    }   

    return (
        <div className="card bg-neutral w-96 shadow-sm">
            <figure className='containImage'>
                <img
                    src={photoUrl}
                    alt="Photo" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                <span>{age} {gender}</span>
                <span>{about}</span>
                <div className="card-actions justify-center mt-4">
                    <button className="btn btn-primary" onClick={() => handleSendRequest('ignored',_id)}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handleSendRequest('interested',_id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard