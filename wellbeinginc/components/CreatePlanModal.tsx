import './ProfileModal.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'

type CreatePlanModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const Modal = (props : CreatePlanModalProps) => {
  if (!props.isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <button className="close-button" onClick={props.onClose}>X</button>
        </div>
        <div className="modal-content">
            <form action="" method="">

                <button type="submit">Save Changes</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;