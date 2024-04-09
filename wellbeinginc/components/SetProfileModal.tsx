import './SetProfileModal.css'
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
    const allergy1 = formData.get("allergies1") as string;
    const allergy2 = formData.get("allergies2") as string;
    const allergy3 = formData.get("allergies3") as string;
    const allergies = [allergy1,allergy2,allergy3]

    const { data, error } = await SupabaseClient().from('TestUserProfile').insert([
      {
        EmployeeNo: props.userID,
        Email: props.userEmail,
        FirstName: name,
        LastName: surname,
        initialWeight: weight,
        height: height,
        allergies: allergies,
      },
    ]);

    if (error) {
      console.error("Error sending data");
    }

    return redirect("/protected");
  }

  return (
    <div className="create-profile-modal-overlay">
      <div className="create-profile-modal">
        
        <form action="" method="">
              <div className='create-profile-profilePicture'>
                  <label htmlFor="profile-picture"><Image src={profilePicture} alt="myProfilePicture"/></label>
              </div>
             {/* <input className="hidden" type="file" id="profile-picture" name="profile-picture"/> */}
             {/* <input type="text" id="profile-picture" name="profile-picture"/> */}
        </form>
        <div className="create-profile-modal-content">
          <form action={saveChanges} method="">

            <label htmlFor="name">First Name:</label>
            <input type="text" id="name" name="name" placeholder='Your Name' required/>

            <label htmlFor="surname">Surname:</label>
            <input type="text" id="surname" name="surname" placeholder='Your Surname' required/>

            <label htmlFor="height">Height:</label>
            <input type="text" id="height" name="height" placeholder='Your Height' required/>

            <label htmlFor="weight">Weight:</label>
            <input type="text" id="weight" name="weight" placeholder='Your Weight' required/>

            <label>Allergies:</label>
            <div id='allergies'>
              <label><input type="checkbox" name="allergies1" value="peanut"/> Peanut</label><br/>
              <label><input type="checkbox" name="allergies2" value="dairy"/> Dairy</label><br/>
              <label><input type="checkbox" name="allergies3" value="gluten"/> Gluten</label><br/>
            </div>
            <div id='create-profile-modal-save-button'>
              <button type="submit">Save</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;