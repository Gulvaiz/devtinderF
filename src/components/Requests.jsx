import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from "axios"
import { addRequests, removeRequest } from '../utils/requestSlice'
import { useDispatch, useSelector } from 'react-redux'


const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector(store => store.requests) 
 
  console.log(requests)

const reviewRequest = async (status, _id) => {
  try{
        await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {} , {withCredentials: true})
        dispatch(removeRequest(_id))
  }
  catch(err){
     console.error(err)
  }
}

const fetchRequests = async () => {

    try{ 
    const res = await axios.get(BASE_URL + "/user/requests/received" , { withCredentials: true })
         dispatch(addRequests(res.data.data))

    }
    catch(err){
        console.error(err)
    }
}

useEffect(()=> {
    fetchRequests()
}, [])

if(!requests) return 

if(requests.length == 0) return <h1 className="font-bold text-center my-10">No pending request</h1>

return (
  <div className="text-center my-4">
   <h1 className="text-xl my-6">Connection Requests</h1>
 
   {
    requests.map((request) => {

      const { _id,firstName, lastName, photoURL, age, gender, about } = request.fromUserId

        return (
          <div key={_id} className="flex rounded-lg items-center bg-base-300 w-2/3 p-2 mx-auto md:w-[550px] justify-around md:justify-between ">
         <div className='flex'>
            <div className="">
                <img className="w-20 h-20 rounded-full" alt="photo" src={photoURL} />
           </div>
                <div className="mx-5 text-left">
                   <h3 className="font-bold">{firstName+" "+lastName}</h3>
                   <span>{age+", "+gender}</span>
                   <p>{about}</p>
                </div>
                </div>
              <div className='flex  items-center'>
                <button className="btn btn-info mr-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                  <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              </div>
            </div>
        )
    })
   }

</div>
)
}

export default Requests
