import './ProfileModal2.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'
import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation";
import SupabaseClient from '@/components/Supabase';

type ProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userID: string;
}

const Modal = (props : ProfileModalProps) => {
  if (!props.isOpen) return null;

  /*Validating submitted form info"*/
  const profileSubmit = async (formData: FormData) =>{
    //"use server";

    {/*Extracting form data to update user profile information*/}
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const allergy1 = formData.get("allergies1") as string;
    const allergy2 = formData.get("allergies2") as string;
    const allergy3 = formData.get("allergies3") as string;
    const allergies = [allergy1,allergy2,allergy3]
    if (!name || !surname){
        return redirect("/protected?message=Please ensure at least both name sections are filled.");
    }
    {/*Sending form data to update user profile information if valid*/}
    // const supabase = createClient('https://nwysqtnfikxauolsknzt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53eXNxdG5maWt4YXVvbHNrbnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0NDUwNjAsImV4cCI6MjAyNjAyMTA2MH0.P7FqiOhrxAGqukCFe98sMDp0kq8deBHv_PLSsYr0Cko')
    const {error} = await SupabaseClient() 
        .from('TestUserProfile') 
        .update ({FirstName: name, LastName: surname, allergies: allergies})
        .eq('EmployeeNo', props.userID)
    if (error){
        console.log(error);
        return redirect("/protected?message=Unable to update profile. Please try again.");
    }
    else{
        return redirect("/protected");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div id="modal-header">
          <button id="close-button" onClick={props.onClose}>X</button>
        </div>
            <form action="" method="">
              <div className='profilePicture'>
                  <label htmlFor="profile-picture"><Image src={profilePicture} alt="myProfilePicture"/></label>
              </div>
                <input className="hidden" type="file" id="profile-picture" name="profile-picture"/>
            </form>
        <div className="modal-content">

            {/* Profile Form */}
            <form action={profileSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name"/>

                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" name="surname"/>

                <label>Allergies:</label>
                <div>
                    <label><input type="checkbox" name="allergies1" value="peanut"/> Nuts</label><br/>
                    <label><input type="checkbox" name="allergies2" value="dairy"/> Dairy</label><br/>
                    <label><input type="checkbox" name="allergies3" value="gluten"/> Gluten</label><br/>
                </div>
                <div id='modal-save-button'>
                  <button type="submit">Save Changes</button>
                </div>
            </form>

        </div>
      </div>
    </div>
  );
};

export default Modal;