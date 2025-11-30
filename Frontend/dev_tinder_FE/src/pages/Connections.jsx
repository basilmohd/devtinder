import axios from 'axios'
import React, { use, useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addConnections } from '../utils/connections';
import { useSelector } from 'react-redux';


const Connections = () => {

    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const getConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            console.log(res.data);

            dispatch(addConnections(res?.data?.data));

        }
        catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {

        getConnections();
    }, []);

    if(!connections) return;
    if(connections.length === 0) return <>No Connections found</>

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-white text-3xl">Connections</h1>
            {connections && connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } =
                    connection;
                return (
                    <div key={_id}
                        className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
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
                    </div>
                )
            })}
        </div>
    )
}

export default Connections