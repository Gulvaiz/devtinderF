import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import bg2 from "../assets/bgImg2";


const Login = () => {

  const [emailId, setEmailId] = useState("")
  const [password, setPassword] = useState("")
  const [firstName ,setFirstName] =  useState("")
  const [lastName ,setLastName] =  useState("")
  const [error, setError] = useState("")
  const [isLoginForm, setisLoginForm] = useState(true)
 const dispatch = useDispatch()
 const navigate = useNavigate() 

  const handleLogin = async () => {
   
    try {
      const res = await axios.post( BASE_URL + "/login", {
          emailId,
          password,
      },
    { withCredentials: true });
  dispatch(addUser(res.data))
 return navigate("/feed")
    }
    catch(err){
      setError(err?.response?.data || "something went wrong")
       console.error(err)
    }
  }

  const handleSignUp = async () => {
    try{ 
    const res = await axios.post(BASE_URL + "/signup", 
      { firstName, lastName, emailId, password } , 
      { withCredentials: true })
      dispatch(addUser(res.data.data))
      return navigate("/profile")
    }
    catch(err){
      setError(err?.response?.data || "Something went wrong")
    }
  }

  return (
    <div 
    className="h-screen w-screen bg-cover bg-center absolute"
   style={{ backgroundImage: `url(${bg2})` }}
  >
 <div className="relative my-20">
      <div className="card bg-base-200 w-70 md:w-96 shadow-sm m-auto">
  <div className="card-body">
    <h2 className="card-title">{isLoginForm? "Login" : "Sign Up"}</h2>

{ !isLoginForm &&
<>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Firstname</legend>
  <input type="text" className="input" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Lastname</legend>
  <input type="text" className="input" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
</fieldset>
</>
}
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" className="input" placeholder="" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}/>
</fieldset>
<p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn bg-red-600" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm? "Login" : "Sign Up"}</button>
    </div>

    <p className="text-red-00 text-center text-sm" onClick={() => setisLoginForm(!isLoginForm)}>{isLoginForm ? (<>New User? <span className="text-red-400">Sign Up here</span></>) :(<>Existing User? <span className="text-red-400">Login here</span></>)}</p>
  </div>
</div>
</div>

    </div>
  )
}

export default Login
