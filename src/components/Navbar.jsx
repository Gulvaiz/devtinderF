import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"
import axios from "axios"

const Navbar = () => {

  const user = useSelector((store) => store.user)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = async () => {
      try{
            await axios.post(BASE_URL+ "/logout", {}, {
              withCredentials: true 
           })
          
           dispatch(removeUser())
           navigate("/")
      }
      catch(err){
          console.log(err.message)
      }
  }

  return (
    <div>
      
      <div className="navbar bg-base-300 shadow-sm h-14 min-h-0 py-2">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost text-xl">dev Tinder</Link>
  </div>
  <div className="flex-none gap-2 mr-3">
    <div className="form-control"></div>
    
{user && (<div className="dropdown dropdown-end flex items-center">
  <p className="px-3">Welcome, {user.firstName}</p>
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
<div className="w-10 rounded-full">
  <img
    alt="User Photo"
    src={user.photoURL} />
</div>
</div>
<ul
tabIndex={0}
className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-23 w-52 p-2 shadow ">
<li>
  <Link to="/profile" className="justify-between">
    Profile
    <span className="badge">New</span>
  </Link>
</li>

<li>
  <Link to="/requests" className="justify-between">
    Requests
  </Link>
</li>

<li>
  <Link to="/connections" className="justify-between">
    Connections
   
  </Link>
</li>

<li><a onClick={handleLogout} >Logout</a></li>
</ul>
</div>)}
  </div>
</div>

    </div>
  )
}

export default Navbar
