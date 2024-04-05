import './ProfileModal.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'

type SetProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = (props : SetProfileModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={props.onClose}>X</button>
        </div>
            <form action="" method="">
              <div className='profilePicture'>
                  <label htmlFor="profile-picture"><Image src={profilePicture} alt="myProfilePicture"/></label>
                </div>
                <input className="hidden" type="file" id="profile-picture" name="profile-picture"/>
            </form>
        <div className="modal-content">
            <form action="" method="">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value="myName"/>

                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" name="surname" value="mySurname"/>

                <label>Allergies:</label>
                <div>
                    <label><input type="checkbox" name="allergies" value="peanut"/> Peanut</label><br/>
                    <label><input type="checkbox" name="allergies" value="dairy"/> Dairy</label><br/>
                    <label><input type="checkbox" name="allergies" value="gluten"/> Gluten</label><br/>
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;