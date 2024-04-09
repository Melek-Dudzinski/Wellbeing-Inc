import './ProfileModal2.css'
import SupabaseClient from '@/components/Supabase';

type CreateFoodItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userID: string;
}

const CreateFoodItemModal = (props : CreateFoodItemModalProps) => {
    if (!props.isOpen) return null;

    const foodItemSubmit = async (formData: FormData) =>{
        const name = formData.get("name") as string;
        const calories = formData.get("calories") as string;
        const nutritionalInfo = formData.get("nutritionalInfo") as string;
        const recipieInfo = formData.get("recipieInfo") as string;
        const allergy1 = formData.get("allergies1") as string;
        const allergy2 = formData.get("allergies2") as string;
        const allergy3 = formData.get("allergies3") as string;
        const allergies = [allergy1,allergy2,allergy3]
    
    
        const { data, error } = await SupabaseClient()
            .from('testFoodItem')
            .insert([
            {
            name: name,
            calories: calories,
            nutritionalInfo: nutritionalInfo,
            recipieInfo: recipieInfo,
            allergen: allergies,
            },
            ]);
    
        if (error) {
            console.error("Error sending data")
        }

        props.onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div id="modal-header">
                <button id="close-button" onClick={props.onClose}>X</button>
                </div>
                <div className="modal-content">

                    <form action={foodItemSubmit}>
                        <label htmlFor="name">Food Name:</label>
                        <input type="text" id="name" name="name"/>

                        <label htmlFor="calories">Calories:</label>
                        <input type="number" id="calories" name="calories"/>

                        <label htmlFor="nutritionalInfo">Nutritional Information:</label>
                        <input type="text" id="nutritionalInfo" name="nutritionalInfo"/>

                        <label htmlFor="recipieInfo">Recipe Link:</label>
                        <input type="text" id="recipieInfo" name="recipieInfo"/>

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

export default CreateFoodItemModal;