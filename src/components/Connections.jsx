import { useEffect } from "react"
import axios from "axios"
import { addConnection } from "../utils/connectionsSlice"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"

const Connections = () => {
   const connections = useSelector((store) => store.connections)
   const dispatch = useDispatch()

    const fetchConnections = async () => {
       try{
        const res = await axios.get(BASE_URL+"/user/connections", {
            withCredentials: true
         })   
      
           dispatch(addConnection(res.data.data))
        }
        catch(err){
            console.error(err)
        }
    }

    useEffect(()=> {
        fetchConnections()
    }, [])

    if(!connections) return

    if(connections.length == 0) return <h1 className="text-center my-10 font-bold ">No connection found</h1>

    return (
      <div className="text-center my-4">
       <h1 className="text-xl my-6">Connections</h1>
     
       {
        connections.map((connection) => {

          const { _id,firstName, lastName, photoURL, age, gender, about } = connection

            return (
              <div className="flex rounded-lg my-2 bg-base-300 w-1/2 p-2 mx-auto">
                <div className="">
                    <img className="w-20 h-20 rounded-full" alt="photo" src={photoURL} />
               </div>
                    <div className="mx-3 text-left">
                       <h3 className="font-bold">{firstName+" "+lastName}</h3>
                       <span>{age+", "+gender}</span>
                       <p>{about}</p>
                    </div>
                </div>
            )
        })
       }

    </div>
  )
}

export default Connections
