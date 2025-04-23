import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import UserCard from "./UserCard"
import axios from "axios"

const Feed = () => {

  const feed = useSelector((store) => store.feed) 
  console.log(feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if(feed) return;
    
    try{
      const res = await axios.get(BASE_URL + "/user/feed", {
         withCredentials: true,
       })
       dispatch(addFeed(res?.data?.data))                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }
    catch(err){
      console.error(err.message)
    } 
  }

  useEffect( () => {
   
      if(!feed) {
        getFeed() 
      }
    }, [])

   if (!feed || feed.length === 0) return <h1 className="text-center my-10 font-bold ">no new user found </h1>;

  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  )
)
}

export default Feed
