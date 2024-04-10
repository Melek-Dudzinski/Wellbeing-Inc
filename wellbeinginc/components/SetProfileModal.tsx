import './ProfileModal2.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';


type SetProfileProps = {
  userID: string;
  userEmail: string;
}

const Modal = (props: SetProfileProps) => {

  const saveChanges = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const height = formData.get("height") as string;
    const weight = formData.get("weight") as string;

    const { data, error } = await SupabaseClient().from('TestUserProfile').insert([
      {
        EmployeeNo: props.userID,
        Email: props.userEmail,
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
        <div className="modal-content">
          <form action={saveChanges} method="">
            <div className='profilePicture'>
              <Image src={profilePicture} alt="myProfilePicture"/>
            </div>

            <label htmlFor="name">First Name:</label>
            <input type="text" id="name" name="name" placeholder='Your Name' required/>

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" placeholder='Your Surname' required/>

            <label htmlFor="height">Height - in cm:</label>
            <input type="number" id="height" name="height" placeholder='Your Height' min="50" max="250" required/>

            <label htmlFor="weight">Weight - in kg:</label>
            <input type="number" id="weight" name="weight" placeholder='Your Weight' min="20" max="800" required/>

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