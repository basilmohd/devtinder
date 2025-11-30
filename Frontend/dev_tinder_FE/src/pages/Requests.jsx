import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';
import Toast from '../components/Toast';


const Requests = () => {

    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");

    const getRequests = async () => {
        try{
            const resp = await axios.get(BASE_URL + '/user/requests/received', {withCredentials:true} );
            console.log(resp?.data);
            dispatch(addRequests(resp?.data?.data));
        }
        catch(err){
            console.error(err);
        }
    }

    const reviewRequests = async (requestId, status) => {
        try{
            const resp = await axios.post(BASE_URL + '/request/received/'+status+'/'+requestId,
            {}, {withCredentials:true} );
            console.log(resp?.data);
            // show message and remove from list
            dispatch(removeRequest(requestId));
            if(status === 'accepted'){
                setToastMessage("Request Accepted Successfully");
            }
            else{
                setToastMessage("Request Rejected Successfully");
            }
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            
        }
        catch(err){
            console.error(err);
        }   
    }
    
    useEffect(() => {
        getRequests();
    }, []);
    
    if(!requests) return;
    if(requests.length === 0) return <><div className='flex justify-center mx-auto pt-10'><span>No Requests found</span></div></>

  return (
      <div className="text-center my-10">
            {showToast && (
                    <Toast message={toastMessage}></Toast>
                )
            }
            <h1 className="text-bold text-white text-3xl">Requests Received</h1>
            {requests && requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    request?.fromUserId;
                return (
                    <div key={_id}
                        className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
                    >
                        <div>
                            <img
                                alt="photo"
                                className="w-20 h-20 rounded-full object-cover"
                                src={photoUrl}
                            />
                        </div>
                        <div className="text-left mx-4 ">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about}</p>
                        </div>      
                        <div className="m-auto">
                            <button className="btn btn-primary mx-2" onClick={()=> reviewRequests(request._id,'accepted')}>Accept</button>
                            <button className="btn btn-secondary mx-2" onClick={()=> reviewRequests(request._id,'rejected')}>Reject</button>
                        </div>                 
                    </div>
                )
            })}
        </div>
  )
}

export default Requests