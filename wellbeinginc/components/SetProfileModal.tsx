import './ProfileModal.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'
import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation";


type SetProfileProps = {
  userID: string;
}

const Modal = (props: SetProfileProps) => {

  const saveChanges = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;

    const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko');

    const { data, error } = await supabase.from('TestUserProfile').insert([
      {
        EmployeeNo: props.userID,
        FirstName: name,
        LastName: surname,
        initialWeight: weight,
        height: height,
      },
    ]);

    if (error) {
      console.error("Error sending data");
    }

    return redirect("/protected");
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* <form action="" method="">
          <div className='profilePicture'>
            <label htmlFor="profile-picture"><Image src={profilePicture} alt="myProfilePicture"/></label>
          </div>
          <input className="hidden" type="file" id="profile-picture" name="profile-picture"/>
          <input type="text" id="profile-picture" name="profile-picture"/>
        </form> */}
        <div className="modal-content">
          <form action={saveChanges} method="">
            <div className='profilePicture'>
              <label htmlFor="profile-picture"><Image src={profilePicture} alt="myProfilePicture"/></label>
            </div>
            {/* <input className="hidden" type="file" id="profile-picture" name="profile-picture"/> */}
            <input type="text" id="profile-picture" name="profile-picture"/>

            <label htmlFor="name">First Name:</label>
            <input type="text" id="name" name="name" placeholder='Your Name' required/>

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" placeholder='Your Surname' required/>

            <label htmlFor="height">Height:</label>
            <input type="text" id="height" name="height" placeholder='Your Height' required/>

            <label htmlFor="weight">Weight:</label>
            <input type="text" id="weight" name="weight" placeholder='Your Weight' required/>

            <label>Allergies:</label>
            <div>
              <label><input type="checkbox" name="allergies" value="peanut"/> Peanut</label><br/>
              <label><input type="checkbox" name="allergies" value="dairy"/> Dairy</label><br/>
              <label><input type="checkbox" name="allergies" value="gluten"/> Gluten</label><br/>
            </div>

            <button>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;