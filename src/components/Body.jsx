import Navbar from "./Navbar"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"



const Body = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
   
    try{
        const res = await axios.get(BASE_URL + "/profile" ,  
          { withCredentials: true })
       dispatch(addUser(res.data))
  }
  catch(err){
     if(err.status == 401){
         navigate("/login")
     }
    
  }

}

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

useEffect(() => {
     if(userData){
       navigate("/")
     }
}, [] )

  return (
    <>   
   <div className="h-screen bg-cover bg-center"  style={{ backgroundImage: `url('/bgImg.jpg')` }}>
       <Navbar />
       <Outlet />
    </div>
    <Footer />
    </>

  )
}

export default Body
