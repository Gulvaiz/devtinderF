



  import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constants"
import UserCard from "./UserCard"


const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [about, setAbout] = useState(user.about || " ")
  const [age, setAge] = useState(user.age || " ")
  const [gender, setGender] = useState(user.gender )
  const [photoURL, setPhotoURL] = useState(user.photoURL)
  const [error, setError] = useState(" ")
  const [toast, setToast] = useState(false)
 const dispatch = useDispatch()
 

 const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, about, photoURL, gender, age },
        { withCredentials: true }
      );
            
      dispatch(addUser(res.data.data));
      setToast(true)
      setTimeout(()=>{
        setToast(false)
      },3000)
    } catch (err) {
      console.error("API error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  
  return (
    <>
    <div className="flex justify-center mt-2.5">
       <div>
      
      <div className="card bg-base-100 w-96 shadow-sm m-auto mr-1">
  <div className="card-body">
    <h2 className="card-title">Edit Profile</h2>
    
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Firstname</legend>
  <input type="text" className="input" placeholder="" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Lastname</legend>
  <input type="text" className="input" placeholder="" value={lastName} onChange={(e) => setLastName(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Age</legend>
  <input type="text" className="input" placeholder="" value={age} onChange={(e) => setAge(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text" className="input" placeholder="" value={gender} onChange={(e) => setGender(e.target.value.toLowerCase())} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <input type="text" className="input" maxLength={200} placeholder="" value={about} onChange={(e) => setAbout(e.target.value)} />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">PhotoURL</legend>
  <input type="text" className="input" placeholder="" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} />
</fieldset>

<p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>

    </div>
     <UserCard user={{firstName, lastName, age, gender, about, photoURL}}/>
     </div>

    {toast && <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile updated successfully</span>
  </div>
 
</div>
}
    </>
  )
}

export default EditProfile
