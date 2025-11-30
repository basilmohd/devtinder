import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from '../components/UserCard';

const Feed = () => {
  const feedStore = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getUserFeed = async () => {
    // Fetch user feed logic here    
    try {
      if (feedStore) return;
      const res = await axios.get(BASE_URL + '/user/feed', { withCredentials: true });
      if (res && res.data) {
        dispatch(addFeed(res.data?.data));
      }

    }
    catch (err) {
      console.error(err);
      if (err.status === 401)
        navigate('/login');
    }
  }

  useEffect(() => {
    getUserFeed();
  }, []);

   if(!feedStore)   return;
    if(feedStore.length === 0)   return <div className='flex justify-center mx-auto pt-10'>No Users found</div>

  return (
    feedStore && (
      <div className='flex justify-center my-10'>      
        <UserCard user={feedStore[0]}></UserCard>
      </div>
    )
  )
}

export default Feed