import './CreatePlanModal.css'
import profilePicture from './images/Blank Profile Picture.jpg'
import Image from 'next/image'

type CreatePlanModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const mealPlans = {
  Balanced: { 
    breakfast: "Toast with avocado and egg",
    lunch: "Chicken salad sandwich",
    snack: "Apple slices with peanut butter",
    dinner: "Baked salmon with brown rice and roasted vegetables",
    exercise: "Brisk walk(45 minutes)"
  },
  PowerDiet: { 
    breakfast: "Protein smoothie with oats, banana, peanut butter",
    lunch: "Turkey burger on a  bun with a side salad",
    snack: "Trail mix",
    dinner: "Steak with sweet potatoes",
    exercise: " Weightlifting(60 minutes)"
   },
  LightFitness: { 
    breakfast: "Greek yogurt with berries",
    lunch: "Lentil soup with a side salad ",
    snack: "Vegetable sticks with hummus",
    dinner: "Grilled chicken breast with quinoa and steamed vegetables ",
    exercise: "Yoga(30 minutes)"
  },
  WeightGain: { 
    breakfast: "Large bowl of oatmeal with milk and dried fruit",
    lunch: " Pasta with chicken and marinara sauce",
    snack: "Protein shake",
    dinner: " Beef stir-fry with rice and vegetables",
    exercise: "Strength training(45 minutes)"
   },
  WeightLoss: { 
    breakfast: "Egg white omelet with spinach and tomatoes",
    lunch: "Turkey wrap with vegetables",
    snack: "Almonds",
    dinner: "Grilled fish with mixed green salad",
    exercise: "Cardio workout(40 minutes)"
   },
  Vegan: { 
    breakfast: " Tofu scramble with spinach ",
    lunch: " Lentil soup with whole-grain crackers",
    snack: " Fruit salad with nuts",
    dinner: "Black bean burger on a whole-wheat bun, with a side salad",
    exercise: "Yoga(45 minutes)"
   }
  // ... Other plans (WeightGain, WeightLoss, Vegan)
};

const Modal = (props : CreatePlanModalProps) => {
  if (!props.isOpen) return null;

  return (
          <div className="plan-modal-overlay">
                <div className="plan-modal">
                  <div id="plan-modal-header">
                    <button id="plan-close-button" onClick={props.onClose}>X</button>
                  </div>
                  <form>
                    <fieldset className="day-options">
                    <legend>Choose your plan</legend>
                      {Array(7).fill(0).map((_, dayIndex) => ( 
                        <div key={dayIndex}> {/* Important for React to track */}
                          <label htmlFor={`day${dayIndex + 1}`}>Day {dayIndex + 1}:</label>
                          <select name="Menu" id={`day${dayIndex + 1}`}>
                            <option value="" disabled="">Choose plan for the day</option>
                            {Object.keys(mealPlans).map((planName) => (
                              <option key={planName} value={planName}>
                                {planName} 
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </fieldset>
                    <button id="plan-submit-button"type="submit">Save Plan</button>
                  </form>
                  </div>
                </div>
  );
};

export default Modal;